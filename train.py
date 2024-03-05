import json
from transformers import GPT2Tokenizer, GPT2LMHeadModel, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments

# Load your training data from combinedData.json
with open('combinedData.json', 'r') as f:
    data = json.load(f)

# Combine all text data into a single string
text = "\n".join(data)

# Initialize the tokenizer and model
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
model = GPT2LMHeadModel.from_pretrained('gpt2', pad_token_id=tokenizer.eos_token_id)

# Tokenize the text data
tokenized_text = tokenizer.encode(text)

# Create a TextDataset from the tokenized data
dataset = TextDataset(
    tokenizer=tokenizer,
    file_path=None,
    block_size=128,
    overwrite_cache=False,
    text_column_name=None,
    tokenized_text=[tokenized_text]
)

# Create a DataCollatorForLanguageModeling
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer,
    mlm=False,
)

# Define the TrainingArguments
training_args = TrainingArguments(
    output_dir='./results',
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=4,
    save_steps=10_000,
    save_total_limit=2,
)

# Initialize the Trainer
trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,
)

# Train the model
trainer.train()

# Save the fine-tuned model
model.save_pretrained('fine_tuned_gpt3_model')

# Optionally, save the tokenizer and model configuration
tokenizer.save_pretrained('fine_tuned_gpt3_model')
model.config.save_pretrained('fine_tuned_gpt3_model')
