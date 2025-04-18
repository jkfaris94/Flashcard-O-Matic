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
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Deck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    //fetch data from mock API
    useEffect(() => {
        const abortController = new AbortController();

        fetch(`http://mockhost/decks/${deckId}`, { signal: abortController.signal })
            .then((response) => {
                if (!response.ok) throw new Error("network response was not ok");
                return response.json();
            })
            .then(setDeck)
            .catch((error) => {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            });

        return () => {
            abortController.abort();
        };
    }, [deckId]);

    if (error) return <p>Error loading deck.</p>;
    if (!deck) return <p>Loading...</p>;

    const handleDeleteDeck = () => {
        const confirm = window.confirm("Are you sure you want to delete this deck?");
        if (confirm) {
            fetch(`http://mockhost/decks/${deckId}`, { method: "DELETE" })
            .then(() => navigate("/"))
            .catch(console.error);
        }
    };

    return (
        <div>
             {/* Breadcrumb navigation */}
      <nav>
        <Link to="/">Home</Link> / {deck.name}
      </nav>

        <h2>{deck.name}</h2>
        <p>{deck.description}</p>

        {/* action buttons */}
        <div style={{ marginBottom: "1rem" }}>
        <Link to={`/decks/${deckId}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to={`/decks/${deckId}/study`}>
          <button>Study</button>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`}>
          <button>Add Cards</button>
        </Link>
        <button onClick={handleDeleteDeck}>Delete</button>
      </div>
      </div>
    );
}

export default Deck;