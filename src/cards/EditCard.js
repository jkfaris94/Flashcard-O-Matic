import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import CardForm from "./CardForm";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [formData, setFormData] = useState({ front: "", back: "" });
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadData() {
      try {
        const deckResponse = await fetch(`http://mockhost/decks/${deckId}`, {
          signal: abortController.signal,
        });
        const deckData = await deckResponse.json();
        setDeck(deckData);

        const cardResponse = await fetch(
          `http://mockhost/decks/${deckId}/cards/${cardId}`,
          { signal: abortController.signal }
        );

        if (!cardResponse.ok) {
          navigate(`/decks/${deckId}`);
          return;
        }

        const cardData = await cardResponse.json();
        setFormData({ front: cardData.front, back: cardData.back });
        
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Failed to load data:", error);
          navigate("/");
        }
      }
    }

    loadData();
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

  if (!deck) return <p>Loading...</p>;

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