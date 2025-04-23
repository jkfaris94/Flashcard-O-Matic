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