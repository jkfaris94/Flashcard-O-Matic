import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({front: "", back: ""});
    const navigate = useNavigate();
    

    //xTODO: useEffect
    useEffect(() => {
        const abortController = new AbortController(); 

        async function loadData() {
            try {
              // Step 1: Validate deck
              const deckResponse = await fetch(`http://mockhost/decks/${deckId}`, {
                signal: abortController.signal,
              });
      
            //   if (!deckResponse.ok) throw new Error("Deck not found");
            //   await deckResponse.json(); // We don't need to save deck here
      
              // Step 2: Fetch card
              const cardResponse = await fetch(
                `http://mockhost/decks/${deckId}/cards/${cardId}`,
                { signal: abortController.signal }
              );
      
            //   if (!cardResponse.ok) throw new Error("Card not found");
      
              const data = await cardResponse.json();
              setCard({ front: data.front, back: data.back });
            } catch (error) {
              if (error.name !== "AbortError") {
                console.error("Redirecting due to error:", error.message);
                if (error.message === "Deck not found") {
                  navigate("/"); // Invalid deck → home
                } else {
                  navigate(`/decks/${deckId}`); // Invalid card → deck page
                }
              }
            }
          }
      
          loadData();
          return () => abortController.abort();
        }, [deckId, cardId, navigate]);

    //TODO: handleSubmit
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

    //hook up buttons 
    
    return (
        <div>
            {/* breadcrumb nav */}
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