import { useState } from "react";

function ToyForm({ addToy }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name,
      image,
    };

    addToy(newToy);

    setName("");
    setImage("");
  }

  return (
    <div className="container">
      <button onClick={() => setShowForm(!showForm)}>
        Add a Toy
      </button>

      {showForm ? (
        <form className="add-toy-form" onSubmit={handleSubmit}>
          <h3>Create a toy!</h3>

          <input
            type="text"
            name="name"
            placeholder="Enter a toy's name..."
            className="input-text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <br />

          <input
            type="text"
            name="image"
            placeholder="Enter a toy's image URL..."
            className="input-text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <br />

          <input
            type="submit"
            name="submit"
            className="submit"
            value="Create New Toy"
          />
        </form>
      ) : null}
    </div>
  );
}

export default ToyForm;
