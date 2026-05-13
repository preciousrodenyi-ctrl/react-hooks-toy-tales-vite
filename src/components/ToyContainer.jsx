import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys = [], onDeleteToy, onUpdateToy }) {
  return (
    <div id="toy-collection">
      {/* We map through the toys array passed from App */}
      {toys.map((toy) => (
        <ToyCard 
          key={toy.id} 
          toy={toy} 
          onDeleteToy={onDeleteToy} 
          onUpdateToy={onUpdateToy} 
        />
      ))}
    </div>
  );
}

export default ToyContainer;