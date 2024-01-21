// GridComponent.js
import "./GridComponent.css";
import React, { useState, useEffect } from "react";
let gridDataGlobal = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

function arrayToCSV(data) {
  const csvRows = [];
  const headers = ["Year", "Fall", "Winter", "Spring", "Summer"];
  csvRows.push(headers.join(","));
  for (let yearIndex = 0; yearIndex < data.length / 4; yearIndex++) {
    for (let classIndex = 0; classIndex < 4; classIndex++) {
      const row = [classIndex === 0 ? data[yearIndex * 4] : ""];
      for (let quarter = 0; quarter < 4; quarter++) {
        const cellIndex = yearIndex * 4 + quarter;
        const classText = data[cellIndex][classIndex] || "";
        row.push(`"${classText.replace(/"/g, '""')}"`);
      }
      csvRows.push(row.join(","));
    }
  }
  return csvRows.join("\n");
}

export const getGridData = () => {
  return gridDataGlobal;
};

export const exportToCSV = () => {
  const gridData = getGridData(); // Fetch the gridData
  const csvData = arrayToCSV(gridData);
  const blob = new Blob([csvData], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "4-year-plan.csv";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

export const GridComponent = () => {
  const years = ["1st year", "2nd year", "3rd year", "4th year"];
  const quarters = ["Fall", "Winter", "Spring", "Summer"];

  const [gridData, setGridData] = useState(gridDataGlobal);

  // Use useEffect to update the global variable when gridData changes
  useEffect(() => {
    gridDataGlobal = gridData;
  }, [gridData]);

  const handleDragStart = (e, rowIndex, cellIndex) => {
    e.dataTransfer.setData("text", gridData[rowIndex][cellIndex]);
    e.dataTransfer.setData("sourceGrid", "grid");
  };

  const handleDragOver = (e, rowIndex) => {
    e.preventDefault();
  };

  const handleDeleteItem = (rowIndex, item) => {
    const updatedGridData = [...gridData];
    updatedGridData[rowIndex] = updatedGridData[rowIndex].filter(
      (existingItem) => existingItem !== item
    );
    setGridData(updatedGridData);
  };

  const handleDrop = (e, rowIndex) => {
    e.preventDefault();

    const draggedText = e.dataTransfer.getData("text");

    // Check if the drop is triggered by a double-click
    if (e.detail === 2) {
      const updatedGridData = [...gridData];
      updatedGridData[rowIndex] = updatedGridData[rowIndex].filter(
        (item) => item !== draggedText
      );
      setGridData(updatedGridData);
    } else {
      const updatedGridData = [...gridData];
      const isItemInDestination =
        updatedGridData[rowIndex].includes(draggedText);

      if (!isItemInDestination) {
        updatedGridData.forEach((row, i) => {
          const indexOfDraggedItem = row.indexOf(draggedText);
          if (indexOfDraggedItem !== -1) {
            updatedGridData[i].splice(indexOfDraggedItem, 1);
          }
        });
        updatedGridData[rowIndex].push(draggedText);
        setGridData(updatedGridData);
      }
    }
  };

  function arrayToCSV(data) {
    const csvRows = [];
    // Add headers
    const headers = ["Year", "Fall", "Winter", "Spring", "Summer"];
    csvRows.push(headers.join(","));
    // Loop through each year
    for (let yearIndex = 0; yearIndex < years.length; yearIndex++) {
      // For each quarter in the year
      for (let classIndex = 0; classIndex < 4; classIndex++) {
        const row = [classIndex === 0 ? years[yearIndex] : ""];

        // For each quarter, add the class to the row, or an empty string if no class
        for (let quarter = 0; quarter < 4; quarter++) {
          const cellIndex = yearIndex * 4 + quarter; // Calculate the index for the quarter
          const classText = data[cellIndex][classIndex] || ""; // Get the class or an empty string
          row.push(`"${classText.replace(/"/g, '""')}"`); // Escape quotes and add to the row
        }

        // Add the completed row to the CSV
        csvRows.push(row.join(","));
      }
    }

    return csvRows.join("\n");
  }
  function exportToCSV() {
    // Convert the grid data to a CSV string
    const csvData = arrayToCSV(gridData);

    // Create a Blob from the CSV string
    const blob = new Blob([csvData], { type: "text/csv" });

    // Create an object URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link element and trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = "4-year-plan.csv";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Clean up the URL object
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="schedule-wrapper">
      <div className="section1">
        <div className="year-bar">
          {years.map((year, index) => (
            <div key={index} className="year-label">
              {year}
            </div>
          ))}
        </div>
      </div>

      <div className="section2">
        <div className="column-title-container">
          {quarters.map((quarter, index) => (
            <React.Fragment key={index}>
              <div className="quarter-bar-item">{quarter}</div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid-container">
          {gridData.map((row, i) => (
            <div
              key={i}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              className="grid-cell"
            >
              {row.map((text, j) => (
                <div
                  key={text}
                  onDragStart={(e) => handleDragStart(e, i, j)}
                  onDoubleClick={() => handleDeleteItem(i, text)} // Add this line
                  draggable
                >
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExportButton = () => {
  return (
    <button className="export-btn" onClick={() => exportToCSV()}>
      <span>Export to CSV</span>
    </button>
  );
};
