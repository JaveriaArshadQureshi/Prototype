import random

def generate_ticket_id():
    return f"ACT-{random.randint(1000, 9999)}"