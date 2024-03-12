import json
import os
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, get_linear_schedule_with_warmup
from torch.utils.data import Dataset, DataLoader
from torch.nn.utils.rnn import pad_sequence
from tqdm import tqdm
import torch.optim as optim
from functools import partial

class SportsOutcomeDataset(Dataset):
    def __init__(self, tokenized_texts):
        self.tokenized_texts = [torch.tensor(tokens) for tokens in tokenized_texts]

    def __len__(self):
        return len(self.tokenized_texts)

    def __getitem__(self, idx):
        return self.tokenized_texts[idx]

def collate_batch(batch, tokenizer):
    return pad_sequence(batch, batch_first=True, padding_value=tokenizer.pad_token_id)

def main():
    # Load the pre-tokenized data
    with open('convertedGamesData_pre_tokenized.json', 'r') as file:
        tokenized_texts = json.load(file)

    # Initialize the tokenizer and model for GPT-2
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    model = GPT2LMHeadModel.from_pretrained("gpt2")

    # Ensure the tokenizer's pad token is set for compatibility
    tokenizer.pad_token = tokenizer.eos_token

    # Prepare dataset and dataloader
    dataset = SportsOutcomeDataset(tokenized_texts)
    
    # Use partial to pass the tokenizer to the collate_batch function
    collate_fn_with_tokenizer = partial(collate_batch, tokenizer=tokenizer)
    
    train_loader = DataLoader(dataset, batch_size=8, shuffle=True, collate_fn=collate_fn_with_tokenizer, num_workers=2)

    # Setup the device
    device = torch.device("mps" if torch.backends.mps.is_available() else "cpu")
    model = model.to(device)

    # Optimizer and scheduler
    optimizer = optim.AdamW(model.parameters(), lr=5e-5)
    scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=len(train_loader) * 3)

    # Training loop
    for epoch in range(3):
        model.train()
        total_loss = 0
        for batch in tqdm(train_loader, desc=f'Epoch {epoch + 1}', leave=False):
            batch = batch.to(device)
            
            optimizer.zero_grad()
            labels = batch[:, 1:].clone().detach()
            labels[batch[:, 1:] == tokenizer.pad_token_id] = -100  # Ignore padding in loss calculation
            outputs = model(input_ids=batch[:, :-1], labels=labels)
            
            loss = outputs.loss
            loss.backward()
            optimizer.step()
            scheduler.step()

            total_loss += loss.item()
        
        print(f"Epoch {epoch + 1}, Average Loss: {total_loss / len(train_loader)}")

    # Ensure the model directory exists and save the model and tokenizer
    model_dir = 'fine_tuned_gpt2_sports_model3'
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)
    try:
        model.save_pretrained(model_dir)
        tokenizer.save_pretrained(model_dir)
        print(f"Model and tokenizer saved to {model_dir}")
    except Exception as e:
        print(f"Error saving model or tokenizer: {e}")

if __name__ == '__main__':
    main()
