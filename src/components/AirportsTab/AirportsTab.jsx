import React, { useEffect, useState } from "react";
import "./AirportsTab.css";
import AirportsTable from "./AirportsTable/AirportsTable";
import AirportsByDepartmentTable from "./AirportsByDepartmentTable/AirportsByDepartmentTable";
import AirportsByRegionTable from "./AirportsByRegionTable/AirportsByRegionTable";

const AirportsTab = () => {
  const [selectedComponent, setSelectedComponent] = useState("A");
  const [responseTime, setResponseTime] = useState(0);
  const [airports, setAirports] = useState([]);
  const [airportsByRegion, setAirportsByRegion] = useState([]);
  const [airportsByDepartment, setAirportsByDepartment] = useState([]);
  const [regions, setRegions] = useState([]);

  const getAirports = async () => {
    const startTime = Date.now();
    fetch("https://api-colombia.com/api/v1/airport")
      .then((response) => response.json())
      .then((data) => {
        const endTime = Date.now();
        setResponseTime(endTime - startTime);
        setAirports(data);

        //Group by Department and City
        const airportsByDepartmentAndCity =
          getAirportsByDepartmentAndCity(data);
        setAirportsByDepartment(airportsByDepartmentAndCity);

        //Group by Region
        const airportsByRegion =
          getAirportsCountByRegionDepartmentCityAndType(data);
        setAirportsByRegion(airportsByRegion);
      });
  };

  const getAirportsByDepartmentAndCity = (airports) => {
    return airports.reduce((acc, airport) => {
      if (!acc[airport.department.name]) {
        acc[airport.department.name] = {};
      }
      if (!acc[airport.department.name][airport.city.name]) {
        acc[airport.department.name][airport.city.name] = [];
      }
      acc[airport.department.name][airport.city.name].push(airport);

      //Total airports by department
      if (!acc[airport.department.name].total) {
        acc[airport.department.name].total = 0;
      }
      acc[airport.department.name].total++;
      return acc;
    }, {});
  };

  const getAirportsCountByRegionDepartmentCityAndType = (airports) => {
    return airports.reduce((acc, airport) => {
      if (!acc["region"]) {
        acc["region"] = {};
      }
      if (!acc["region"][airport.department.regionId]) {
        acc["region"][airport.department.regionId] = {};
      }
      if (!acc["region"][airport.department.regionId]["departamento"]) {
        acc["region"][airport.department.regionId]["departamento"] = {};
      }
      if (
        !acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]
      ) {
        acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ] = {};
      }
      if (
        !acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"]
      ) {
        acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"] = {};
      }
      if (
        !acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name]
      ) {
        acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name] = {};
      }
      if (
        !acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name]["tipo"]
      ) {
        acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name]["tipo"] = {};
      }
      if (
        !acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name]["tipo"][airport.type]
      ) {
        acc["region"][airport.department.regionId]["departamento"][
          airport.department.name
        ]["ciudad"][airport.city.name]["tipo"][airport.type] = 0;
      }
      acc["region"][airport.department.regionId]["departamento"][
        airport.department.name
      ]["ciudad"][airport.city.name]["tipo"][airport.type]++;
      return acc;
    }, {});
  };

  const getRegions = async () => {
    fetch("https://api-colombia.com/api/v1/region")
      .then((response) => response.json())
      .then((data) => {
        setRegions(data);
      });
  };

  useEffect(() => {
    getAirports();
    getRegions();
  }, []);

  const renderComponent = () => {
    switch (selectedComponent) {
      case "A":
        return (
          <AirportsByDepartmentTable
            airportsByDepartment={airportsByDepartment}
          />
        );
      case "B":
        return (
          <AirportsByRegionTable
            airportsByRegion={airportsByRegion}
            regions={regions}
          />
        );
      case "C":
        return <AirportsTable airports={airports} regions={regions} />;
      default:
        return null;
    }
  };

  return (
    <div className="presidents-tab">
      <h2>Aeropuertos de Colombia</h2>
      <div>
        <div className="presidents-header">
          <select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
          >
            <option value="A">Aeropuertos por departamento y ciudad</option>
            <option value="B">Aeropuertos por region</option>
            <option value="C">Todos los aeropuertos</option>
          </select>
          <p>Total aeropuertos: {airports.length}</p>
          <p>Tiempo de respuesta del API: {responseTime} ms</p>
        </div>
        <div>{renderComponent()}</div>
      </div>
    </div>
  );
};

export default AirportsTab;
