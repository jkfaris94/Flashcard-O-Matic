import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function EditDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState({ name: "", description: ""});

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const response = await fetch(`http://mockhost/decks/${deckId}`, {
                    signal: abortController.signal,
                });

                const data = await response.json();
                setDeck({ name: data.name, description: data.description });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load deck", error);
                    navigate("/");
                }
            }
        }

        loadDeck();
        return () => abortController.abort();
    }, [deckId, navigate]);

    const handleChange = ({ target }) => {
        setDeck({ ...deck, [target.name]: target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://mockhost/decks/${deckId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...deck, id: Number(deckId) }),
            });
        } catch (error) {
            console.error("Failed to update deck:", error);
        }

        navigate(`/decks/${deckId}`);

    };

    return (
        <div className="container">
      <nav>
        <Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{deck.name || "..."}</Link> / Edit Deck
      </nav>

      <h2>Edit Deck</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-control"
            value={deck.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-control"
            rows="4"
            value={deck.description}
            onChange={handleChange}
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/decks/${deckId}`)}
        >
          Cancel
        </button>

        <button 
        type="submit" 
        className="btn btn-primary"
        //useNavigate???
        >
          Submit
        </button>
      </form>
    </div>
    );
}

export default EditDeck;