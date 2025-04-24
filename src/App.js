import { Routes, Route } from "react-router-dom";
import Decks from "./decks/Decks";
import Deck from "./decks/Deck";
import Header from "./common/Header"
import Card from "./cards/Card";
import EditCard from "./cards/EditCard";
import CreateDeck from "./decks/CreateDeck";
import Study from "./decks/Study";
import EditDeck from "./decks/EditDeck";
import AddCard from "./cards/AddCard";

function App() {
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        <Route path="/" element={<Decks />}></Route>

        <Route path="decks">
        <Route path="new" element={<CreateDeck />} />
          <Route path=":deckId" element={<Deck />} />
          <Route path=":deckId/edit" element={<EditDeck />} />
          <Route path=":deckId/study" element={<Study />} />
          <Route path=":deckId/cards/new" element={<AddCard />} />
          <Route path=":deckId/cards/:cardId" element={<Card />} />
          <Route path=":deckId/cards/:cardId/edit" element={<EditCard />} />
        </Route>
       
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
