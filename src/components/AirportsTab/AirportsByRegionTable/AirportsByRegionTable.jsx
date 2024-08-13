import React from "react";
import "./AirportsByRegionTable.css";

const AirportsByRegionTable = ({ airportsByRegion, regions }) => {
  const flattenData = (data) => {
    let result = [];

    Object.keys(data.region).forEach((regionKey) => {
      const region = data.region[regionKey];

      Object.keys(region.departamento).forEach((departamentoKey) => {
        const departamento = region.departamento[departamentoKey];

        Object.keys(departamento.ciudad).forEach((ciudadKey) => {
          const ciudad = departamento.ciudad[ciudadKey];

          Object.keys(ciudad.tipo).forEach((tipoKey) => {
            const conteo = ciudad.tipo[tipoKey];

            result.push({
              region: regionKey,
              departamento: departamentoKey,
              ciudad: ciudadKey,
              tipo: tipoKey,
              conteo: conteo,
            });
          });
        });
      });
    });

    return result;
  };

  const flattenedData = flattenData(airportsByRegion);

  const renderTable = () => {
    let lastRegion = "";
    let lastDepartamento = "";
    let lastCiudad = "";

    return flattenedData.map((item, index) => {
      const showRegion = lastRegion !== item.region;
      const showDepartamento = lastDepartamento !== item.departamento;
      const showCiudad = lastCiudad !== item.ciudad;

      lastRegion = item.region;
      lastDepartamento = item.departamento;
      lastCiudad = item.ciudad;

      return (
        <tr key={index}>
          {showRegion && (
            <td
              rowSpan={
                flattenedData.filter((d) => d.region === item.region).length
              }
            >
              {regions.find((r) => r.id === parseInt(item.region)).name}
            </td>
          )}
          {showDepartamento && (
            <td
              rowSpan={
                flattenedData.filter(
                  (d) => d.departamento === item.departamento
                ).length
              }
            >
              {item.departamento}
            </td>
          )}
          {showCiudad && (
            <td
              rowSpan={
                flattenedData.filter((d) => d.ciudad === item.ciudad).length
              }
            >
              {item.ciudad}
            </td>
          )}
          <td>{item.tipo}</td>
          <td>{item.conteo}</td>
        </tr>
      );
    });
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Region</th>
          <th>Departamento</th>
          <th>Ciudad</th>
          <th>Tipo</th>
          <th>Conteo</th>
        </tr>
      </thead>
      <tbody>{renderTable()}</tbody>
    </table>
  );
};

export default AirportsByRegionTable;
