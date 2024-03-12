# pre_tokenize.py
import json
from transformers import GPT2Tokenizer

def pre_tokenize_data(input_file, output_file):
    # Load the raw dataset
    with open(input_file, 'r') as file:
        raw_texts = json.load(file)

    # Initialize the tokenizer
    tokenizer = GPT2Tokenizer.from_pretrained("gpt2")
    tokenizer.pad_token = tokenizer.eos_token  # Ensure pad token is set

    # Tokenize the dataset
    max_length = 512  # Adjust as needed
    tokenized_texts = [tokenizer.encode(text, max_length=max_length, truncation=True, padding="max_length") for text in raw_texts]

    # Save the pre-tokenized data
    with open(output_file, 'w') as file:
        json.dump(tokenized_texts, file)

if __name__ == "__main__":
    pre_tokenize_data('convertedGamesData.json', 'convertedGamesData_pre_tokenized.json')
