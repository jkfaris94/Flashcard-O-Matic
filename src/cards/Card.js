import React from "react";
import { Link, useNavigate } from "react-router-dom"

function Card ({ card, deckId }) {
    // const navigate = useNavigate();


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
            <div className="col">
              <p>{card.front}</p>
            </div>
            <div className="col">
              <p>{card.back}</p>
            </div>
          </div>
          <div className="d-flex justify-content-end">
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button className="btn btn-secondary mr-2">Edit</button>
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteCard}>
              Delete
            </button>
          </div>
        </div>
      </div>
  
    );
}

export default Card;