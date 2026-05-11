import { useEffect, useState } from "react";
import ToyContainer from "./ToyContainer";
import ToyForm from "./ToyForm";

function App() {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toysArray) => {
        setToys(toysArray);
      });
  }, []);

  function addToy(newToy) {
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newToy,
        likes: 0,
      }),
    })
      .then((r) => r.json())
      .then((addedToy) => {
        setToys([...toys, addedToy]);
      });
  }

  function deleteToy(id) {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    }).then(() => {
      setToys((currentToys) =>
        currentToys.filter((toy) => toy.id !== id)
      );
    });
  }

  function handleLike(toy) {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: toy.likes + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        const updatedToys = toys.map((t) =>
          t.id === updatedToy.id ? updatedToy : t
        );

        setToys(updatedToys);
      });
  }

  return (
    <div className="App">
      <ToyForm addToy={addToy} />

      <ToyContainer
        toys={toys}
        deleteToy={deleteToy}
        handleLike={handleLike}
      />
    </div>
  );
}

export default App;