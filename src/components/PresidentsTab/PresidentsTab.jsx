import React, { useEffect, useState } from "react";
import PartiesTable from "./PartiesTable/PartiesTable";
import "./PresidentsTab.css";
import PresidentsTable from "./PresidentsTable/PresidentsTable";

const PresidentsTab = () => {
  const [presidents, setPresidents] = useState([]);
  const [rawPresidents, setRawPresidents] = useState([]);
  const [totalPresidents, setTotalPresidents] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState("A");
  const [responseTime, setResponseTime] = useState(0);

  const getPresidents = async () => {
    const startTime = Date.now();
    fetch("https://api-colombia.com/api/v1/president")
      .then((response) => response.json())
      .then((data) => {
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        //Group by party
        const presidentsByParty = data.reduce((acc, president) => {
          if (!acc[president.politicalParty]) {
            acc[president.politicalParty] = [];
          }
          acc[president.politicalParty].push(president);
          return acc;
        }, {});

        // Sort by length
        const sortedPresidentsByParty = Object.entries(presidentsByParty)
          .map(([party, presidents]) => ({
            party,
            presidents,
          }))
          .sort((a, b) => b.presidents.length - a.presidents.length);

        setTotalPresidents(data.length);
        setRawPresidents(data);
        setPresidents(sortedPresidentsByParty);
      });
  };
  useEffect(() => {
    getPresidents();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "A":
        return <PartiesTable presidents={presidents} />;
      case "B":
        return <PresidentsTable presidents={rawPresidents} />;
      default:
        return null;
    }
  };

  return (
    <div className="presidents-tab">
      <h2>Presidentes de Colombia</h2>
      <div>
        <div className="presidents-header">
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
          >
            <option value="A">Presidentes por partido político</option>
            <option value="B">Todos los presidentes</option>
          </select>
          <p>Total de presidentes: {totalPresidents}</p>
          <p>Tiempo de respuesta del API: {responseTime} ms</p>
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default PresidentsTab;
