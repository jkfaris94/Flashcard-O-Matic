import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({front: "", back: ""});
    const navigate = useNavigate();
    

    useEffect(() => {
        const abortController = new AbortController(); 

        async function loadData() {
            try {
              const deckResponse = await fetch(`http://mockhost/decks/${deckId}`, {
                signal: abortController.signal,
              });
      
              const cardResponse = await fetch(
                `http://mockhost/decks/${deckId}/cards/${cardId}`,
                { signal: abortController.signal }
              );
      
              const data = await cardResponse.json();
              setCard({ front: data.front, back: data.back });
            } catch (error) {
              if (error.name !== "AbortError") {
                console.error("Redirecting due to error:", error.message);
                if (error.message === "Deck not found") {
                  navigate("/");
                } else {
                  navigate(`/decks/${deckId}`); 
                }
              }
            }
          }
      
          loadData();
          return () => abortController.abort();
        }, [deckId, cardId, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...card,
                    id: Number(cardId),
                    deckId: Number(deckId),
                }),
            });

            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("failed to update card:", error);
        }
    };
    
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> | <Link to={`/decks/${deckId}`}>Deck</Link> | Edit Card {cardId}
            </nav>

            <h2>Edit Card</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front"  className="form-label" >Front </label> 
                    <textarea 
                    id="front" 
                    name="front" 
                    className="form-control" 
                    placeholder="Front of card" 
                    value={card.front}
                    onChange={(e) => setCard({ ...card, front: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="back" className="form-label">back</label>
                    <textarea 
                    id="back" 
                    name="back" 
                    className="form-control" 
                    placeholder="back of card" 
                    value={card.back}
                    onChange={(e) => setCard({ ...card, back: e.target.value })}
                    />
                </div>

                <button type="button" className="btn btn-secondary me-2" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    );
}

export default EditCard;