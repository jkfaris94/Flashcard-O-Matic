import React from "react";
import { Link } from "react-router-dom"

function Card ({ card, deckId }) {
    const handleDeleteCard = () => {
        const confirm = window.confirm("Delete this card?");
        if (confirm) {
            fetch(`http://mockhost/decks/${deckId}/cards/${card.id}`, {
                method: "DELETE",
            })
            .then(() => {
                window.location.reload();
            })
            .catch(console.error);
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col">{card.front}</div>
                    <div className="col">{card.back}</div>
                </div>
                <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
                    <button className="btn btn-secondary mr-2">Edit</button>
                </Link>
                <button onClick={handleDeleteCard} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
}

export default Card;