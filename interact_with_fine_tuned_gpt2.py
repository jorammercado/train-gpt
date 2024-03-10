import json
from fuzzywuzzy import fuzz

# Load your data from the JSON file
with open('dataTeams.json', 'r') as file:
    data = json.load(file)

# Convert the list to a dictionary (assuming the list is in question-answer pairs)
qa_dict = {data[i].lower(): data[i + 1] for i in range(0, len(data), 2)}

def find_closest_question(user_question, questions):
    # Normalize user question
    user_question = user_question.lower()
    # Initialize max similarity and answer
    max_similarity = 0
    closest_question = None
    
    # Iterate through questions to find the closest one
    for question in questions:
        similarity = fuzz.ratio(user_question, question)
        if similarity > max_similarity:
            max_similarity = similarity
            closest_question = question
    
    # Consider a threshold to determine if a match is good enough
    if max_similarity > 60:  # You can adjust this threshold
        return closest_question
    else:
        return None

while True:
    user_input = input("You: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break
    
    # Try to find a closely matching question
    closest_question = find_closest_question(user_input, qa_dict.keys())
    
    if closest_question:
        print("Bot:", qa_dict[closest_question])
    else:
        # If no close match is found, consider using the chatbot or another fallback
        print("Bot: I'm not sure how to answer that. Can you ask in a different way?")
