import { Routes, Route } from "react-router-dom";
import Decks from "./decks/Decks";
import Deck from "./decks/Deck";
import Header from "./common/Header"
import Card from "./cards/Card";
import EditCard from "./cards/EditCard";
import CreateDeck from "./decks/CreateDeck";
import Study from "./decks/Study";
import EditDeck from "./decks/EditDeck";

function App() {
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        <Route path="/" element={<Decks />}></Route>
        <Route path="/decks/:deckId" element={<Deck />}></Route>
        <Route path="/decks/:deckId/cards/:cardId" element={<Card />}></Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}></Route>
        <Route path="/decks/new" element={<CreateDeck />}></Route>
        <Route path="/decks/:deckId/study" element={<Study />}></Route>
        <Route path="/decks/:deckId/edit" element={<EditDeck />}></Route>
       
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </div>

    </>
  );
}

export default App;
