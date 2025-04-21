// The Edit Card screen allows the user to modify information on an existing card.
// The Edit Card screen has the following features:

// The path to this screen should include the deckId and the cardId (i.e., /decks/:deckId/cards/:cardId/edit).
// There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member, and finally the text Edit Card :cardId (e.g., Home / React Router / Edit Card 3).
// It displays the same form as the Add Card screen, except it is prefilled with information for the existing card. It can be edited and updated.
// If the user clicks on either Save or Cancel, the user is taken to the Deck screen.
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [card, setCard] = useState({front: "", back: ""});
    const navigate = useNavigate();
    // xTODO: useState

    //xTODO: useEffect
    useEffect(() => {
        const abortController = new AbortController(); 

        async function loadCard() {
            try {
                const response = await fetch(
                    `http://mockhost/decks/${deckId}/cards/${cardId}`,
                    { signal: abortController.signal }
                );
            const data = await response.json();
            setCard({ front: data.front, back: data.back });
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("failed to load card:", error);
                }
            }
        }
        
        loadCard();

        return () => abortController.abort();
    }, [deckId, cardId]);

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