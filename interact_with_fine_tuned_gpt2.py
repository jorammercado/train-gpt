from transformers import pipeline

# Load your fine-tuned GPT-3 model with the text-generation pipeline
chat_bot = pipeline("text-generation", model="./fine_tuned_gpt2_model")

print("You can start chatting with the fine-tuned GPT-2are you repeat model! Enter 'exit' to end the conversation.")

while True:
    user_input = input("You: ")

    # Check if the user wants to exit
    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    # Get model response
    model_output = chat_bot(user_input, max_length=100, num_return_sequences=1, truncation=True)

    # Print model response
    print("Bot:", model_output[0]['generated_text'])
