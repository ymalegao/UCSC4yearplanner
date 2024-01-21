import { createContext, useContext, useState } from 'react';

const MajorContext = createContext({});

export const useMajor = () => useContext(MajorContext);

export const MajorProvider = ({ children }) => {
  const [preReq, setPreReq] = useState([]);
  const [majorIndexes, setMajorIndexes] = useState({});

  const value = {
    preReq,
    setPreReq,
    majorIndexes,
    setMajorIndexes,
  };

  return (
    <MajorContext.Provider value={value}>
      {children}
    </MajorContext.Provider>
  );
};