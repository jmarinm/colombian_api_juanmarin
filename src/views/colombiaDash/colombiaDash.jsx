import React from "react";
import Tab from "../../components/TabComponent/Tab";
import PresidentsTab from "../../components/PresidentsTab/PresidentsTab";
import TouristicAttractionsTab from "../../components/TouristicAttractionsTab/TouristicAttractionsTab";
import AirportsTab from "../../components/AirportsTab/AirportsTab";

const ColombiaDash = () => {
  const tabs = [
    {
      title: "Presidentes",
      content: <PresidentsTab />,
    },
    {
      title: "Sitios Turísticos",
      content: <TouristicAttractionsTab />,
    },
    {
      title: "Aeropuertos",
      content: <AirportsTab />,
    },
  ];
  return (
    <>
      <Tab tabs={tabs} />
    </>
  );
};

export default ColombiaDash;
