# Flashcard-o-matic 🧠

A React-based flashcard learning app designed to help students study efficiently and teachers manage decks of cards for specific subjects. Built as a capstone project to practice CRUD operations, routing, and state management in React.

## 📚 Overview

Flashcard-o-matic allows users to:

- View all flashcard decks
- Create, edit, and delete decks
- Study a deck card-by-card
- Flip cards and track progress
- Add and edit individual cards in a deck

Each deck contains multiple cards, and each card has a front (question/prompt) and a back (answer).

---

## 🚀 Features

### 🏠 Home (`/`)
- View all existing decks
- Create new decks
- Study, view, or delete each deck

### ➕ Create Deck (`/decks/new`)
- Fill out a form with deck name and description
- On submit, redirects to the new deck’s page

### 📖 Study Deck (`/decks/:deckId/study`)
- Flip through cards one-by-one
- Restart deck or return home when finished
- "Not enough cards" prompt shown when < 3 cards

### 🔁 Edit Deck (`/decks/:deckId/edit`)
- Modify the name and description of an existing deck

### ➕ Add Card (`/decks/:deckId/cards/new`)
- Add new cards with a front and back
- On save, form resets for adding another card

### ✏️ Edit Card (`/decks/:deckId/cards/:cardId/edit`)
- Edit the front and back of an existing card
- Redirects back to the deck on save/cancel
- Redirects to home/deck on invalid IDs

---

## ⚙️ Tech Stack

- React 18
- React Router v6
- Bootstrap 5 & Bootstrap Icons
- Custom mock API via `http://mockhost`
- JSON-based mock DB in `src/util/db.js`



