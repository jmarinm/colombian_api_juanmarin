import React from "react";
import "./PresidentsTable.css";

const PresidentsTable = ({ presidents }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Partido político</th>
          <th>Periodo</th>
        </tr>
      </thead>
      <tbody>
        {presidents.map((president, index) => (
          <tr key={index}>
            <td>{president.name}</td>
            <td>{president.lastName}</td>
            <td>{president.politicalParty}</td>
            <td>{`${president.startPeriodDate} - ${president.endPeriodDate}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PresidentsTable;
