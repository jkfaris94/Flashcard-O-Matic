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

        <Route path="/decks">
          <Route path="/decks/new" element={<CreateDeck />} />

          <Route path=":deckId" element={<Deck />}>
            <Route path="edit" element={<EditDeck />} />
            <Route path="study" element={<Study />} />

            <Route path="cards">
              <Route path="new" element={<AddCard />} />
              <Route path=":cardId" element={<Card />} />
              <Route path=":cardId/edit" element={<EditCard />}/>
            </Route>
          </Route>
        </Route>
       
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </div>
    </>
  );
}

export default App;
