import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CardForm from "./CardForm";

function AddCard() {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ front: "", back: "" });

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
          console.error("Failed to load deck:", error);
          navigate("/");
        }
      }
    }

    loadDeck();
    return () => abortController.abort();
  }, [deckId, navigate]);

  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://mockhost/decks/${deckId}/cards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData({ front: "", back: "" });
    } catch (error) {
      console.error("Failed to create card:", error);
    }
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <>
      <nav>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Add Card
      </nav>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/decks/${deckId}`}
        formTitle={`${deck.name}: Add Card`}
      />
    </>
  );
}

export default AddCard;