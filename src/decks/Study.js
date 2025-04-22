import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";

function Study() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState();
    const [cardIndex, setCardIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);

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
                    console.log("Failed to load deck:", error);
                    navigate("/");
                }
            }
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId, navigate]);

    const handleFlip = () => setShowBack((prev) => !prev);

    const handleNext = () => {
        if (cardIndex + 1 < deck.cards.length) {
            setCardIndex(cardIndex + 1);
            setShowBack(false);
        } else {
            const restart = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
            if (restart) {
                setCardIndex(0);
                setShowBack(false);
            } else {
                navigate("/");
            }
        }
    };

    if (!deck) return <p>Loading...</p>;

    const { cards, name } = deck;

    if (cards.length < 3) {
        return (
            <div>
                <nav><Link to="/">Home</Link> / {name} / Study</nav>
                <h2>Study: {name}</h2>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. This deck has {cards.length} card(s).</p>
                <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
                Add Cards
                </Link>
          </div>
        );
    }

    const card = cards[cardIndex];

    return (
        <div>
        <nav><Link to="/">Home</Link> / <Link to={`/decks/${deckId}`}>{name}</Link> / Study</nav>
        <h2>Study: {name}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Card {cardIndex + 1} of {cards.length}</h5>
            <p className="card-text">
              {showBack ? card.back : card.front}
            </p>
            <button className="btn btn-secondary me-2" onClick={handleFlip}>
              Flip
            </button>
            {showBack && (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
}

export default Study;