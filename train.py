import json
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel, get_linear_schedule_with_warmup
from torch.utils.data import Dataset, DataLoader
from torch.nn.utils.rnn import pad_sequence
from tqdm import tqdm
import torch.optim as optim

class TextDataset(Dataset):
    def __init__(self, tokenizer, texts, max_length):
        self.tokenizer = tokenizer
        self.max_length = max_length

        self.tokenized_texts = [
            tokenizer.encode(text, truncation=True, max_length=max_length, padding='max_length', return_tensors='pt').squeeze(0)
            for text in texts
        ]

    def __len__(self):
        return len(self.tokenized_texts)

    def __getitem__(self, idx):
        return self.tokenized_texts[idx]

def collate_batch(batch):
    input_ids = pad_sequence(batch, batch_first=True, padding_value=tokenizer.pad_token_id)
    return input_ids

# Load your training data from data.json
with open('data.json', 'r') as f:
    texts = json.load(f)

# Initialize the tokenizer and model for GPT-2
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Set the padding token to the EOS token if not already set
if tokenizer.pad_token is None:
    tokenizer.add_special_tokens({'pad_token': tokenizer.eos_token})  # Using EOS token as PAD
    model.resize_token_embeddings(len(tokenizer))

# Create a custom dataset instance
dataset = TextDataset(tokenizer, texts, max_length=1024)

# Create a DataLoader for batching with custom collate_fn
train_loader = DataLoader(dataset, batch_size=4, shuffle=True, collate_fn=collate_batch)

# Define the device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define the optimizer and scheduler
optimizer = optim.AdamW(model.parameters(), lr=5e-5)
total_steps = len(train_loader) * 3
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

# Training loop
for epoch in range(3):
    model.train()
    total_loss = 0
    progress_bar = tqdm(train_loader, desc=f'Epoch {epoch + 1}', leave=False)
    for batch in progress_bar:
        batch = batch.to(device)
        
        # Ensure the target does not include the first token (BOS)
        labels = batch[:, 1:].contiguous()
        
        # Pass the input through the model to get the output logits
        outputs = model(input_ids=batch[:, :-1].contiguous(), labels=labels)
        
        # Compute the loss
        loss = outputs.loss
        
        # Backpropagation
        loss.backward()
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

        total_loss += loss.item()

        # Update progress bar
        progress_bar.set_postfix({'loss': total_loss / len(progress_bar)})
    
    # Print average loss for each epoch
    print(f"Epoch {epoch + 1}, Average Loss: {total_loss / len(train_loader)}")

# Save the fine-tuned model
model.save_pretrained('fine_tuned_gpt2_model')
