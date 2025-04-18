import { Routes, Route } from "react-router-dom";
import Deck from "./components/decks/Deck";
import Header from "./common/Header"

function App() {
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
        <Route path="/decks/:deckId" element={<Deck />}></Route>

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
      </div>

    </>
  );
}

export default App;
