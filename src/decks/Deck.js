import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, Outlet } from 'react-router-dom';
import Card from "../cards/Card";

function Deck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
              setError(error);
              navigate("/");
            }
          }
        }

        loadDeck();

        return () => {
          abortController.abort();
        };
        }, [deckId, navigate]);
      

    const handleDeleteDeck = () => {
        const confirm = window.confirm("Are you sure you want to delete this deck?");
        if (confirm) {
            fetch(`http://mockhost/decks/${deckId}`, { method: "DELETE" })
            .then(() => navigate("/"))
            .catch(console.error);
        }
    };

    if (error) return <p>Error loading deck: {error.message}</p>;
    if (!deck) return <p>Loading...</p>;

    return (
      
        <div>
      <nav>
        <Link to="/">Home</Link> / {deck.name}
      </nav>

        <h2>{deck.name}</h2>
        <p>{deck.description}</p>

        {/* action buttons */}
        <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">
        <i class="bi bi-pencil-square"> Edit </i>
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary">
        <i class="bi bi-book"> Study </i>
        </Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
        <i class="bi bi-plus-lg"> Add Cards </i>
        </Link>
        <button onClick={handleDeleteDeck} className="btn btn-danger">
          <i class="bi bi-trash" /> 
        </button>
      </div>
      {/* Cards List */}
      <h3>Cards</h3>
            {deck.cards && deck.cards.length > 0 ? (
              deck.cards.map((card) => (
                <Card key={card.id} card={card} deckId={deck.id} />
              ))
            ) : (
              <p>No cards in this deck.</p>
            )}
      </div>
    );
}

export default Deck;