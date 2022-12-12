import { createContext, useState } from "react";

export const resultContext = createContext({});

function Result({ children }) {
  const [result, setResult] = useState({});

  return (
    <resultContext.Provider value={{ result, setResult }}>
      {children}
    </resultContext.Provider>
  );
}

export default Result;
