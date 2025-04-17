// Deck
// The Deck screen displays all of the information about a deck.

// The Deck screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId).
// There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home / React).
// The screen includes the deck name (e.g., "React") and deck description (e.g., "Quiz cards about the React frontend framework.").
// The screen includes Edit, Study, Add Cards, and Delete buttons. Each button takes the user to a different destination, as follows:

// | Button Clicked | Destination |
// | -------------- | ---------------------------------------------------------------------------------------------- |
// | Edit | Edit Deck Screen |
// | Study | Study screen |
// | Add Cards | Add Card screen |
// | Delete | Shows a warning message before deleting the deck (See the "Delete Card Prompt" section below) |

// Each card in the deck:

// Is listed on the page under the "Cards" heading.
// Shows a question (i.e., front) and the answer (i.e., back) to the question.
// Has an Edit button that takes the user to the Edit Card screen when clicked.
// Has a Delete button that allows that card to be deleted.