# Smart Query Routing Prototype

This project is a lightweight student support ticketing system that classifies incoming queries and routes them to the most relevant university desk. It combines a FastAPI backend, a SQLite database, a simple machine learning classifier, and a Next.js frontend dashboard for viewing tickets assigned to a desk.

## Project overview

The system is designed to help a university or student support office handle common student requests such as fee issues, scholarships, and refunds without manual triage. When a student submits a ticket, the backend:

1. Reads the ticket subject and message.
2. Uses a trained text classifier to determine the category.
3. Assigns a priority based on urgency keywords.
4. Maps the category to the correct desk.
5. Saves the ticket in the database and returns the result to the client.

The result is a working prototype that demonstrates intelligent support routing by using a small training dataset and a simple Naive Bayes model.

## Core features

- Ticket creation via API with subject, body, and student ID
- ML-based classification of student queries into categories
- Automatic priority determination for urgent cases
- Desk assignment based on category
- Ticket retrieval and filtering by desk
- Simple UI for viewing tickets assigned to a desk
- SQLite persistence for local prototype use

## Main classification categories

The prototype currently classifies queries into:

- Fee Verification & Billing
- Scholarship
- Refunds

These categories are mapped to desk names as follows:

- Fee Verification & Billing → Fee & Billing Desk
- Scholarship → Scholarship Desk
- Refunds → Refunds Desk
- Unknown categories → General Desk

## Architecture

### Backend

The backend is built with FastAPI and is located in the backend folder. It contains:

- app/main.py: creates the FastAPI application and includes routers
- app/routes/tickets.py: defines ticket-related endpoints
- app/models.py: SQLAlchemy ticket model
- app/schemas.py: request and response schemas
- app/database.py: database connection and session handling
- app/services/classifier.py: ML classifier and urgency logic
- app/services/router_logic.py: desk mapping logic
- app/services/training_data.py: labeled training examples
- app/utils/ticket_id.py: generates identifiers for tickets

### Frontend

The frontend is a small Next.js app located in the frontend folder. It presents a single desk-based view of tickets and fetches data from the backend API.

- app/page.tsx: page showing tickets for the Fee & Billing Desk
- components/TicketCard.tsx: card UI for each ticket
- types/ticket.ts: TypeScript ticket definition

## Request flow

A typical flow for the app is:

1. The frontend loads the desk view and sends a request to the backend.
2. The backend fetches all tickets for a specific desk.
3. When a student creates a new ticket, the API receives a POST request.
4. The classifier examines the subject and body.
5. The model predicts the category and confidence score.
6. Priority is set to High if urgent keywords are found.
7. The ticket is inserted into SQLite.
8. The response returns the saved ticket with assigned desk and metadata.

## Machine learning model

The prototype uses a TF-IDF vectorizer and Multinomial Naive Bayes classifier from scikit-learn.

- Training data is stored in app/services/training_data.py
- Text is transformed using TF-IDF
- Labels are mapped to the known categories
- A score is calculated for prediction confidence
- Urgency keywords such as urgent, overdue, and asap increase the priority to High

This is intentionally simple and suitable for a prototype, not a production-grade enterprise NLP system.

## API endpoints

The backend exposes the following endpoints under the /tickets route:

### Create a ticket

- POST /tickets/
- Body includes:
  - student_id
  - subject
  - body

Example payload:

```json
{
  "student_id": "2024001",
  "subject": "Fee status query",
  "body": "I paid my semester fee but my portal still shows unpaid. Please verify."
}
```

### Get a single ticket

- GET /tickets/{ticket_id}

### List tickets

- GET /tickets/
- Optional query parameter: desk

Example:

```bash
GET /tickets/?desk=Fee%20%26%20Billing%20Desk
```

## Database model

The ticket record stores the following information:

- id
- student_id
- subject
- body
- status
- category
- confidence
- priority
- assigned_desk
- engine_used
- created_at

Status defaults to Pending on creation.

## Project folder structure

```text
smart-query-prototype/
├── backend/
│   ├── app/
│   │   ├── config.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── routes/
│   │   │   └── tickets.py
│   │   ├── services/
│   │   │   ├── classifier.py
│   │   │   ├── router_logic.py
│   │   │   └── training_data.py
│   │   └── utils/
│   │       └── ticket_id.py
│   ├── pyproject.toml
│   └── README.md
├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   ├── types/
│   ├── package.json
│   └── README.md
└── prototype.docx
```

## Setup and run

### Backend setup

From the backend directory:

```bash
pip install -r requirements.txt
```

If dependencies are managed with Poetry, use:

```bash
poetry install
```

Then run:

```bash
uvicorn app.main:app --reload
```

The backend runs on localhost:8000 by default.

### Frontend setup

From the frontend directory:

```bash
npm install
npm run dev
```

The frontend runs on localhost:3000 by default.

## Use case

This prototype is intended for a university help-desk scenario where students send support requests about:

- fees and billing
- scholarships and grants
- refunds and overpayments

Instead of manually sorting each message, the system can automatically suggest and assign the right desk based on the content of the query.

## Current limitations

This is a prototype and not a full production support system. Current limitations include:

- small static training dataset
- no authentication or user roles
- no admin dashboard for updates or case management
- no advanced NLP or LLM integration
- SQLite is used for local demonstration rather than enterprise database deployment

## Summary

The Smart Query Routing Prototype demonstrates how intelligent ticket routing can be implemented in a simple, practical way. It shows the full cycle of receiving student support requests, classifying them with a small ML model, assigning them to a department desk, and presenting them in a simple web interface.

This project is a strong foundation for extending into a full support platform with richer classifications, human-in-the-loop review, analytics, and more advanced query understanding.
