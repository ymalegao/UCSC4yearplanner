import React from "react";
import "./Bar.css";
import { ExportButton } from "./GridComponent";

const Bar = () => {
  return (
    <div className="bar">
      <p className="top-text">UCSC Major Classes Planner</p>

      <ExportButton />
    </div>
  );
};

export default Bar;
