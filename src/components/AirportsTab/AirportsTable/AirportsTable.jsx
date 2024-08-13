import React from "react";
import "./AirportsTable.css";

const AirportsTable = ({ airports, regions }) => {
  return (
    <div className="airports-table">
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ciudad</th>
            <th>Departamento</th>
            <th>Region</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport) => (
            <tr key={airport.id}>
              <td>{airport.name}</td>
              <td>{airport.city.name}</td>
              <td>{airport.department.name}</td>
              <td>
                {regions.find((r) => r.id === airport.department.regionId).name}
              </td>
              <td>{airport.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AirportsTable;
