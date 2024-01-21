import React, { useEffect, useState } from "react";
import "./ClassesList.css"; // Import the CSS file
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useMajor } from "./MajorContext"; // Import the context hook

const ClassesList = ({ majorClasses }) => {
  const [localMajorClasses, setLocalMajorClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [classPrereqs, setClassPrereqs] = useState(null);
  const { preReq, majorIndexes } = useMajor(); // Use the context hook to get preReq and majorIndexes

  useEffect(() => {
    // Update local state when majorClasses prop changes
    setLocalMajorClasses(majorClasses ?? []);
  }, [majorClasses]);

  const handleDragStart = (e, className) => {
    e.dataTransfer.setData("text", className);
    e.dataTransfer.setData("sourceGrid", "classes-list");
  };

  const handleClassClick = (className) => {
    const classIndex = majorIndexes[className];
    const prerequisites = classIndex !== undefined ? preReq[classIndex] : null;

    setSelectedClass(className);
    setClassPrereqs(prerequisites);
  };

  const handleClosePopup = () => {
    setSelectedClass(null);
    setClassPrereqs(null); // Reset prerequisites on closing the popup
  };

  return (
    <div>
      <div className="classes-list-section">
        {localMajorClasses.map((className) => (
          <div key={className} className="class-wrapper">
            <div
              className="c-class"
              draggable
              onDragStart={(e) => handleDragStart(e, className)}
              onClick={() => handleClassClick(className)}
            >
              {className}
            </div>

            <Popup
              open={selectedClass === className}
              closeOnDocumentClick
              onClose={() => setSelectedClass(null)}
              position="left center"
            >
              <h2>{className}</h2>
              <div>
                {classPrereqs && classPrereqs[className] != 5
                  ? classPrereqs[className]
                  : "None"}
              </div>
            </Popup>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ClassesList;
