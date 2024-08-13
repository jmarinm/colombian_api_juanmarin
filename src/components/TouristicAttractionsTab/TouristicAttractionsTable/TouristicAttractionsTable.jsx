import React from "react";
import "./TouristicAttractionsTable.css";

const TouristicAttractionsTable = ({ touristicAttractions }) => {
  return (
    <div className="touristic-attractions-table">
      <h2>Sitios Turísticos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {touristicAttractions.map((attraction) => (
            <tr key={attraction.id}>
              <td>{attraction.name}</td>
              <td>{attraction.city.name}</td>
              <td>{attraction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TouristicAttractionsTable;
