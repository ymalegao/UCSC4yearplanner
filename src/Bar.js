import React from "react";
import "./Bar.css";
import { ExportButton } from "./GridComponent";

const Bar = () => {
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