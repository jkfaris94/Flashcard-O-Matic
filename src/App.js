import { Routes, Route } from "react-router-dom";
import Deck from "./components/decks/Deck";
import Header from "./common/Header"
import Card from "./components/cards/Card";
import EditCard from "./components/cards/EditCard";

function App() {
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        <Route path="/decks/:deckId" element={<Deck />}></Route>
        <Route path="/decks/:deckId/cards/:cardId" element={<Card />}></Route>
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />}></Route>
       
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </div>

    </>
  );
}

export default App;
