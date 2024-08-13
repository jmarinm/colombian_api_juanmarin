import React, { useEffect, useState } from "react";
import "./TouristicAttractionsTab.css";
import TouristicAttractionsTable from "./TouristicAttractionsTable/TouristicAttractionsTable";
import DepartmentsTable from "./DepartmentsTable/DepartmentsTable";

const TouristicAttractionsTab = () => {
  const [selectedComponent, setSelectedComponent] = useState("A");
  const [touristicAttractions, setTouristicAttractions] = useState([]);
  const [rawTouristicAttractions, setRawTouristicAttractions] = useState([]);
  const [responseTime, setResponseTime] = useState(0);

  const getTouristicAttractions = async () => {
    const startTime = Date.now();
    fetch("https://api-colombia.com/api/v1/touristicattraction")
      .then((response) => response.json())
      .then((data) => {
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        setRawTouristicAttractions(data);

        //Group by department and city
        const touristicAttractionsByDepartmentAndCity = data.reduce(
          (acc, attraction) => {
            if (!acc[attraction.city.departmentId]) {
              acc[attraction.city.departmentId] = {};
            }
            if (!acc[attraction.city.departmentId][attraction.city.name]) {
              acc[attraction.city.departmentId][attraction.city.name] = [];
            }
            acc[attraction.city.departmentId][attraction.city.name].push(
              attraction
            );
            return acc;
          },
          {}
        );
        setTouristicAttractions(touristicAttractionsByDepartmentAndCity);
      });
  };

  useEffect(() => {
    getTouristicAttractions();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "A":
        return <DepartmentsTable touristicData={touristicAttractions} />;
      case "B":
        return (
          <TouristicAttractionsTable
            touristicAttractions={rawTouristicAttractions}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="presidents-tab">
      <h2>Atracciones Turísiticas de Colombia</h2>
      <div>
        <div className="presidents-header">
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
          >
            <option value="A">Sitios turísticos por departamento</option>
            <option value="B">Todos los sitios turisticos</option>
          </select>
          <p>Total de sitios turísticos: {rawTouristicAttractions.length}</p>
          <p>Tiempo de respuesta del API: {responseTime} ms</p>
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default TouristicAttractionsTab;
