import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [formData, setFormData] = useState({ front: "", back: "" });

  useEffect(() => {
    const abortController = new AbortController();
  
    async function loadCard() {
      try {
        const cardResponse = await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
          signal: abortController.signal,
        });
  
        if (cardResponse.status === 404) {
          navigate(`/decks/${deckId}`);
          return;
        }
  
        const cardData = await cardResponse.json();
        setFormData({ front: cardData.front, back: cardData.back });
        setDeck({ id: deckId, name: `Deck ${deckId}` }); 
  
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load card:", error);
          navigate("/");
        }
      }
    }
  
    loadCard();
    return () => abortController.abort();
  }, [deckId, cardId, navigate]);
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await fetch(`http://mockhost/decks/${deckId}/cards/${cardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          id: Number(cardId),
          deckId: Number(deckId),
        }),
      });

      navigate(`/decks/${deckId}`);
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  };

  if (!deck || formData.front === "" && formData.back === "") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <nav>
        <Link to="/">Home</Link> /{" "}
        <Link to={`/decks/${deckId}`}>{deck.name}</Link> / Edit Card {cardId}
      </nav>

      <CardForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/decks/${deckId}`}
        formTitle={`Edit Card ${cardId}`}
      />
    </>
  );
}

export default EditCard;