import React, { useState } from "react";
import "./GEList.css"; // Import the CSS file
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const my_GEs = [
  "CC",
  "ER",
  "IM",
  "MF",
  "SI",
  "SR",
  "TA",
  "PE-E",
  "PE-H",
  "PE-T",
  "PR-E",
  "PR-C",
  "PR-S",
  "C1",
  "C2",
];
const geList = my_GEs.map((ge) => `${ge}`);

const GEList = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "ge-list");
  };

  const handleClassClick = (className) => {
    setSelectedClass(selectedClass === className ? null : className);
  };

  const handleClosePopup = () => {
    setSelectedClass(null);
  };

  return (
    <div>
      <p>GE's</p>
      <div className="ge-list-section">
        {geList.map((className) => (
          <div key={className} className="ge-class-wrapper">
            <div
              className="ge-class"
              draggable
              onDragStart={(e) => handleDragStart(e, className)}
              onClick={() => handleClassClick(className)}
            >
              {className}
            </div>

            {/* Popup for each class */}
            <Popup
              open={selectedClass === className}
              closeOnDocumentClick
              onClose={handleClosePopup}
            >
              <h2>{className}</h2>
              <div>Prerequisites: None</div>
            </Popup>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GEList;
