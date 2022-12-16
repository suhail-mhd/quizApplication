import { createContext, useState } from "react";

export const questionContext = createContext([]);

function Question({ children }) {
  const [getQuestion, setGetQuestion] = useState([]);
  return (
    <questionContext.Provider value={{ getQuestion, setGetQuestion }}>
      {children}
    </questionContext.Provider>
  );
}

export default Question;
