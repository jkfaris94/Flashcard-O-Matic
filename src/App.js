import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      
      <Routes>
        <Route path="/" element={"App"} name="home Page"/> //displays decks and description

        <Route path="/decks" element={"decks"}>
          <Route path="/:deckId" element={"deckId"}>
            <Route path="/cards" element={"cards"}>
              <Route path="/:cardId" element={"cardId"}>
              </Route>
            </Route>
          </Route>
        </Route>


        <Route path="*" element={<p>Not found.</p>} />
      </Routes>
    </>
  );
}

export default App;
