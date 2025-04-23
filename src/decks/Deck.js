import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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