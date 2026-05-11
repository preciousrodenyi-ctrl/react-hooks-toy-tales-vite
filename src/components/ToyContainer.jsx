function ToyContainer({ toys = [], deleteToy, handleLike }) {
  return (
    <div className="toy-container">
      {toys.map((toy) => (
        <div
          key={toy.id}
          data-testid="toy-card"
          className="card"
        >
          <h2>{toy.name}</h2>

          <img
            src={toy.image}
            alt={toy.name}
            className="toy-avatar"
          />

          <p>{toy.likes} Likes</p>

          <button onClick={() => handleLike(toy)}>
  Like {"<3"}
</button>
          <button onClick={() => deleteToy(toy.id)}>
            Donate to GoodWill
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToyContainer;