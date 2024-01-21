import React from "react";
import "./Bar.css";
import { ExportButton, exportToCSV, getGridData } from "./GridComponent";

const Bar = () => {
  const yourGridData = getGridData();

  return (
    <div className="bar">
      <p className="top-text">UCSC Major Classes Planner</p>
      <div className="btn-container">
        <ExportButton />
      </div>
    </div>
  );
};

export default Bar;
