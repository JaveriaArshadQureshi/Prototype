from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from app.services.training_data import TRAINING_TEXTS, TRAINING_LABELS

# Trained once, when the server starts
vectorizer = TfidfVectorizer(stop_words="english")
X_train = vectorizer.fit_transform(TRAINING_TEXTS)

model = MultinomialNB(alpha=0.1)
model.fit(X_train, TRAINING_LABELS)

URGENT_WORDS = ["urgent", "late fine", "asap", "immediately", "overdue"]

def classify_query(subject: str, body: str):
    text = f"{subject} {body}".lower()

    vec = vectorizer.transform([text])
    category = model.predict(vec)[0]
    confidence = round(float(model.predict_proba(vec).max()) * 100, 2)

    priority = "High" if any(w in text for w in URGENT_WORDS) else "Medium"

    return category, confidence, priority, "tfidf"