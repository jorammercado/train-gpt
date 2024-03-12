import json
from fuzzywuzzy import fuzz
from transformers import GPT2Tokenizer, GPT2LMHeadModel
import torch

# Load data from JSON file
with open('allConvertedData.json', 'r') as file:
    data = json.load(file)

# Convert the list to a dictionary for Q&A
qa_dict = {data[i].lower(): data[i + 1] for i in range(0, len(data), 2)}

# Load the fine-tuned GPT-2 model and tokenizer
model_path = './fine_tuned_gpt2_sports_model2'
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

def find_closest_question(user_question, questions):
    user_question = user_question.lower()
    max_similarity = 0
    closest_question = None

    for question in questions:
        similarity = fuzz.ratio(user_question, question)
        if similarity > max_similarity:
            max_similarity = similarity
            closest_question = question

    return closest_question, max_similarity

def generate_model_response(user_question):
    # Adjust the prompt if necessary
    prompt = "Predict the outcome of: " + user_question  # Example adjustment
    encoded_input = tokenizer(prompt, return_tensors='pt', padding=True, truncation=True, max_length=512)
    input_ids = encoded_input['input_ids']
    attention_mask = encoded_input['attention_mask']
    
    output_sequences = model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        max_length=50,
        temperature=0.8,  # Slight adjustment for diversity
        top_k=40,  # Adjust based on trial and error
        top_p=0.85,  # Adjust based on trial and error
        do_sample=True,
        num_return_sequences=1
    )
    
    answer = tokenizer.decode(output_sequences[0], skip_special_tokens=True)
    return answer

def generate_response(user_question):
    if user_question.lower().startswith("game:"):
        # If the prompt starts with "Game:", use the fine-tuned model directly
        return generate_model_response(user_question)
    else:
        closest_question, max_similarity = find_closest_question(user_question, qa_dict.keys())
        
        if max_similarity > 60:
            # If a sufficiently close question is found in the Q&A dictionary, return its answer
            return qa_dict[closest_question]
        else:
            # If no close match is found, use the fine-tuned model to generate a response
            return generate_model_response(user_question)

if __name__ == '__main__':
    print("GPT-2 Q&A Bot (type 'exit' to quit)")
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            print("Goodbye!")
            break
        response = generate_response(user_input)
        print("Bot:", response)
