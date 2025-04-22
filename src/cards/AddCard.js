// The Add Card screen allows the user to add a new card to an existing deck.
// The Add Card screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/cards/new).
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck to which the cards are being added, and finally the text Add Card (e.g., Home / React / Add Card).
// A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
// If the user clicks Save, a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
// If the user clicks Done, the user is taken to the Deck screen.
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

function AddCard() {
    const navigate = useNavigate();
    const { deckId } = useParams();
    const [ deck, setDeck ]  = useState(null);
    const [ formData, setFormData ] = useState({ front: "", back: "" });

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await fetch(`http://mockhost/decks/${deckId}`, {
                    signal: abortController.signal,
                });

                const data = await response.json();
                setDeck(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to lod deck:", error);
                    navigate("/");
                }
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId, navigate]);

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://mockhost/decks/${deckId}/cards`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData }),
            });
            setFormData({ front: "", back: "" });
        } catch (error) {
            console.error("Failed to create card:", error);
        }
    };

    if (!deck) return <p>Loading...</p>;

    return (
        <div className="container">
      <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
      </nav>

      <h2>{deck.name}: Add Card</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="front" className="form-label">Front</label>
          <textarea
            id="front"
            name="front"
            className="form-control"
            value={formData.front}
            onChange={handleChange}
            placeholder="Front side of card"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="back" className="form-label">Back</label>
          <textarea
            id="back"
            name="back"
            className="form-control"
            value={formData.back}
            onChange={handleChange}
            placeholder="Back side of card"
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
    );
}

export default AddCard;