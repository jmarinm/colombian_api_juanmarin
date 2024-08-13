import React from "react";
import "./PartiesTable.css";

const PartiesTable = ({ presidents }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Partido político</th>
          <th>Presidentes</th>
          <th>Total presidentes</th>
        </tr>
      </thead>
      <tbody>
        {presidents.map((row, index) => (
          <tr key={index}>
            <td>{row.party}</td>
            <td>
              <div className="presidentes-container">
                {row.presidents.map((president, i) => (
                  <div key={i}>{`${president.name} ${president.lastName}`}</div>
                ))}
              </div>
            </td>
            <td>{row.presidents.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PartiesTable;
