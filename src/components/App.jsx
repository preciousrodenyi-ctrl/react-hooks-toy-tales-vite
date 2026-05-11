import React, { useEffect, useState } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // 1. Fetch toys on startup
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  // 2. Handle adding a new toy (State Update)
  function handleAddToy(newToy) {
    setToys([...toys, newToy]);
  }

  // 3. Handle deleting a toy (State Update)
  function handleDeleteToy(id) {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  }

  // 4. Handle updating likes (State Update)
  function handleUpdateToy(updatedToy) {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  }
return (
  <div className="App">
    <Header />
    {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
    <div className="buttonContainer">
      <button onClick={handleClick}>Add a Toy</button>
    </div>
    <ToyContainer toys={toys} onDeleteToy={handleDeleteToy} onUpdateToy={handleUpdateToy} />
  </div>
);

}

export default App;