import React, { useState } from "react";
import Select from "react-select";
import "./Search.css";
import { useMajor } from "./MajorContext";

const Search = ({ updateMajorClasses, setLoading }) => {
  const initialMajors = [
    "Computer Science: Computer Game Design B.S.",
    "Computer Engineering B.S.",
    "Art B.A.",
    "Psychology B.A.",
    "Technology and Information Management B.S.",
    "Film and Digital Media B.A.",
    "History of Art and Visual Culture B.A.",
    "Economics B.A.",
    "Environmental Studies B.A.",
    "Biomolecular Engineering and Bioinformatics B.S.",
    "Politics B.A.",
    "Latin American and Latino Studies B.A.",
    "Global and Community Health B.A.",
    "Games and Playable Media M.S.",
    "Sociology B.A.",
    "Biotechnology B.A.",
    "Electrical Engineering B.S.",
    "Robotics Engineering B.S.",
    "Community Studies B.A.",
    "Education, Democracy, and Justice B.A.",
    "Agroecology B.A.",
    "Environmental Studies/Biology Combined Major B.A.",
    "Global and Community Health B.A.",
  ];

  const formatOptions = (majors) => {
    return majors.map((major) => ({
      label: major,
      value: major,
    }));
  };

  const [majors] = useState(formatOptions(initialMajors));
  const [selectedMajor, setSelectedMajor] = useState(null);
  const { setPreReq, setMajorIndexes } = useMajor();

  const handleSearch = async () => {
    setSelectedMajor(selectedMajor);

    if (selectedMajor) {
      try {
        setLoading(true);

        const apiEndpoint = `https://uscc-classes.osc-fr1.scalingo.io/api/majors/${selectedMajor.value}`;
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log(data);
        let preReq = data.prerequisites;
        setPreReq(data.prerequisites);
        let majorIndexs = {};
        for (let i = 0; i < data.requirements.length; i++) {
          majorIndexs[data.requirements[i]] = i;
        }
        setMajorIndexes(majorIndexs);

        // Call the function to update majorClasses in Calendar.js
        updateMajorClasses(data.requirements);
      } catch (error) {
        console.error("Error fetching major classes:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-bar">
      <div className="inp">
        <Select
          placeholder="Search for UCSC Majors..."
          options={majors}
          isSearchable
          value={selectedMajor}
          onChange={(selectedOption) => setSelectedMajor(selectedOption)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
