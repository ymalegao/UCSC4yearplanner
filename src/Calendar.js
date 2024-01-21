import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { GridComponent } from "./GridComponent.js";
import ClassesList from "./ClassesList.js";
import GEList from "./GEList.js";
import Search from "./Search.js";

const Calendar = () => {
  const [majorClasses, setMajorClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(true);

  const updateMajorClasses = (data) => {
    setMajorClasses(data);
    setIsLoading(false);
    if (isEmpty) {
      setIsEmpty(false);
    }
  };

  return (
    <div className="calendar">
      <div className="container1">
        <div className="Search">
          <Search
            updateMajorClasses={updateMajorClasses}
            setLoading={setIsLoading}
          />
        </div>
        <div className="schedule-container">
          <GridComponent />
        </div>
      </div>
      <div className="container2">
        <div className="classes-list">
          <p>Major Reqs</p>
          {isEmpty ? (
            // Display only the GIF initially
            <div className="test">
              <iframe
                title="Giphy Embed"
                src="https://giphy.com/embed/g5FB33d3GVUkg"
                className="gif"
              ></iframe>
              <p>choose a major to start a plan</p>
            </div>
          ) : isLoading ? (
            <div className="test">
              <iframe
                title="Giphy Embed"
                src="https://giphy.com/embed/g5FB33d3GVUkg"
                className="gif"
              ></iframe>
              <p>Loading...</p>
            </div>
          ) : (
            <ClassesList majorClasses={majorClasses} />
          )}
        </div>
        <div className="ge-list">
          <GEList />
        </div>
      </div>
    </div>
  );
};

export default Calendar;