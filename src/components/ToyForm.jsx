import React, { useState } from "react";

function ToyForm({ onAddToy }) {
  // 1. Manage local state for the form inputs
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  // 2. Handle input changes dynamically
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // 3. Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    const newToy = {
      ...formData,
      likes: 0, // New toys start with 0 likes
    };

    // 4. POST the new toy to the database
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((savedToy) => {
        onAddToy(savedToy); // Update state in App.jsx
        setFormData({ name: "", image: "" }); // Reset the form
      });
  }

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..." // EXACT placeholder required by test
          className="input-text"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..." // EXACT placeholder required by test
          className="input-text"
          value={formData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
