import React from "react";
import { Link } from "react-router-dom"

function Card({ card, deckId, onDelete }) {
  const handleDeleteCard = async () => {
    const confirmDelete = window.confirm("Delete this card?");
    if (confirmDelete) {
      try {
        await fetch(`http://mockhost/decks/${deckId}/cards/${card.id}`, {
          method: "DELETE",
        });
        onDelete(card.id); 
      } catch (error) {
        console.error("Failed to delete card:", error);
      }
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
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary me-2">
                <i className="bi bi-pencil-square"></i> Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteCard}>
            <i className="bi bi-trash" /> 
            </button>
          </div>
        </div>
      </div>
  
    );
}

export default Card;