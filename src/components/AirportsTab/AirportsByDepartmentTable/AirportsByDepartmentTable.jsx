import React from "react";
import "./AirportsByDepartmentTable.css";

const AirportsByDepartmentTable = ({ airportsByDepartment }) => {
  return (
    <div className="airports-by-department-table">
      <table>
        <thead>
          <tr>
            <th>Departamento</th>
            <th>Ciudad</th>
            <th>Aeropuertos</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(airportsByDepartment).map((department) => {
            return Object.keys(airportsByDepartment[department]).map((city) => {
              return airportsByDepartment[department][city] instanceof Array ? (
                <tr key={city}>
                  <td>{department}</td>
                  <td>{city}</td>
                  <td>{airportsByDepartment[department][city].length}</td>
                </tr>
              ) : null;
            });
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AirportsByDepartmentTable;
