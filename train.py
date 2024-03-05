import json
import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
from torch.utils.data import Dataset, DataLoader
from transformers import AdamW, get_linear_schedule_with_warmup

# Define a custom dataset class
class TextDataset(Dataset):
    def __init__(self, tokenizer, text, max_length):
        self.tokenizer = tokenizer
        self.max_length = max_length

        # Tokenize the text
        self.input_ids = tokenizer(text, truncation=True, max_length=self.max_length, padding="max_length")["input_ids"]

    def __len__(self):
        return len(self.input_ids)

    def __getitem__(self, idx):
        return torch.tensor(self.input_ids[idx], dtype=torch.long)


# Load your training data from chatgpt_training_data.txt
with open('chatgpt_training_data.txt', 'r') as f:
    data = f.readlines()

# Combine all text data into a single string
text = "\n".join(data)

# Initialize the tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2')

# Set the padding token to the EOS token
tokenizer.pad_token = tokenizer.eos_token

# Create a custom dataset instance
dataset = TextDataset(tokenizer, text, max_length=1024)

# Create a DataLoader for batching
train_loader = DataLoader(dataset, batch_size=4, shuffle=True)

# Define the device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define the optimizer and scheduler
optimizer = AdamW(model.parameters(), lr=5e-5)
total_steps = len(train_loader) * 3
scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=0, num_training_steps=total_steps)

# Training loop
for epoch in range(3):
    model.train()
    for batch in train_loader:
        batch = batch.to(device)
        outputs = model(batch, labels=batch)
        loss = outputs.loss
        loss.backward()
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

# Save the fine-tuned model
model.save_pretrained('fine_tuned_gpt3_model')

# Optionally, save the tokenizer and model configuration
tokenizer.save_pretrained('fine_tuned_gpt3_model')
model.config.save_pretrained('fine_tuned_gpt3_model')
