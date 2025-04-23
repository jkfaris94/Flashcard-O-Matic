import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Decks() {
    const [decks, setdecks] = useState([]);
    const { deckId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            try {
                const response = await fetch("http://mockhost/decks", {
                    signal: abortController.signal,
                });

                const data = await response.json();
                setdecks(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Failed to load decks:", error);
                }
            }
        }
        loadDecks();
        return () => abortController.abort();
    }, []);

    const handleDeleteDeck = () => {
        const confirm = window.confirm("Are you sure you want to delete this deck?");
        if (confirm) {
            fetch(`http://mockhost/decks/${deckId}`, { 
                method: "DELETE",
            })
                .then(() => setdecks((current) => current.filter((deck) => deck.id !== deckId)))
                .catch(console.error);
        }
    };

    return (
        <div className="container">
        <div className="mb-4">
          <Link to="/decks/new" className="btn btn-secondary">
            + Create Deck
          </Link>
        </div>
  
        {decks.map((deck) => (
          <div key={deck.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 className="card-title">{deck.name}</h5>
                  <p className="card-text">{deck.description}</p>
                </div>
                <div>{deck.cards.length} cards</div>
              </div>
  
              <div className="d-flex gap-2 mt-3">
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
                <i class="bi bi-eye"> View</i>
                </Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
                <i class="bi bi-book"> Study</i>
                </Link>
                <button className="btn btn-danger " onClick={() => handleDeleteDeck(deck.id)}>
                <i class="bi bi-trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
}

export default Decks;