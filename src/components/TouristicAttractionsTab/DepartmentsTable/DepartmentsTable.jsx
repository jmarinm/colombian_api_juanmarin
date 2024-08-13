import React, { useEffect, useState } from "react";

const DepartmentsTable = ({ touristicData }) => {
  const [departments, setDepartments] = useState([]);

  const processData = (data) => {
    const rows = [];

    Object.keys(data).forEach((departmentId) => {
      const cities = data[departmentId];
      Object.keys(cities).forEach((cityName) => {
        const attractions = cities[cityName];
        attractions.forEach((attraction, index) => {
          rows.push({
            departmentId,
            cityName,
            name: attraction.name,
            imageUrl: attraction.images[0],
            isFirstCity: index === 0,
            isFirstDepartment:
              rows.length === 0 ||
              rows[rows.length - 1].departmentId !== departmentId,
          });
        });
      });
    });

    return rows;
  };

  const fetchDepartments = async () => {
    fetch("https://api-colombia.com/api/v1/department")
      .then((response) => response.json())
      .then((data) => {
        setDepartments(data);
      });
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const placeholderImage =
    "https://archive.org/download/placeholder-image/placeholder-image.jpg";
  const handleError = (e) => {
    e.target.src = placeholderImage;
  };
  const data = processData(touristicData);

  return (
    <table>
      <thead>
        <tr>
          <th>Departamento</th>
          <th>Ciudad</th>
          <th>Sitio</th>
          <th>Foto</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {row.isFirstDepartment && (
              <td
                rowSpan={
                  data.filter((d) => d.departmentId === row.departmentId).length
                }
              >
                {
                  departments.find((d) => d.id === parseInt(row.departmentId))
                    .name
                }
              </td>
            )}
            {row.isFirstCity && (
              <td
                rowSpan={
                  data.filter(
                    (d) =>
                      d.cityName === row.cityName &&
                      d.departmentId === row.departmentId
                  ).length
                }
              >
                {row.cityName}
              </td>
            )}
            <td>{row.name}</td>
            <td>
              <img
                src={row.imageUrl}
                alt={row.name}
                style={{ width: "100px" }}
                onError={handleError}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DepartmentsTable;
