import React from "react";

function ToyCard({ toy, onDeleteToy, onUpdateToy }) {
  // Destructure the toy object for easy use
  const { id, name, image, likes } = toy;

  function handleLikeClick() {
    // 1. Send PATCH request to update likes
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: likes + 1 }),
    })
      .then((r) => r.json())
      .then((updatedToy) => onUpdateToy(updatedToy));
  }

  function handleDeleteClick() {
    // 2. Send DELETE request
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteToy(id));
  }

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes</p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>
        Donate to Toy Story
      </button>
    </div>
  );
}

export default ToyCard;
