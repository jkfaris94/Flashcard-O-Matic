import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CreateDeck() {
    const [formData, setFormData] = useState({ name: "", description: ""});
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://mockhost/decks", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, cards: [] }),
            });
            const newDeck = await response.json();
            navigate(`/decks/${newDeck.id}`);
        } catch (error) {
            console.error("Failed to create deck:", error);
        }
    };

    return (
        <div className="container">
        <nav>
          <Link to="/">Home</Link> / Create Deck
        </nav>
  
        <h2>Create Deck</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input 
              id="name"
              name="name"
              type="text"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Deck Name"
            />
          </div>
  
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea 
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the deck"
            />
          </div>
  
          <button 
            type="button" 
            className="btn btn-secondary me-2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
  
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
}

export default CreateDeck;