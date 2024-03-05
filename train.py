import torch
from transformers import GPT2Tokenizer, GPT2LMHeadModel
from datasets import load_dataset

# Load your dataset using datasets library
dataset = load_dataset("json", data_files="combinedData.json")

# Tokenizer
tokenizer = GPT2Tokenizer.from_pretrained("gpt2")

# Model
model = GPT2LMHeadModel.from_pretrained("gpt2")

# Fine-tuning code here

# Save the fine-tuned model
model.save_pretrained("fine_tuned_gpt2_model")
tokenizer.save_pretrained("fine_tuned_gpt2_model")
