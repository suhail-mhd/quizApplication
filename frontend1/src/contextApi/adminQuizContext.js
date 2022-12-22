import { createContext, useState } from "react";

export const adminQuizContext = createContext([]);

function Quiz({ children }) {
  const [getQuiz, setGetQuiz] = useState([]);
  return (
    <adminQuizContext.Provider value={{ getQuiz, setGetQuiz }}>
      {children}
    </adminQuizContext.Provider>
  );
}

export default Quiz;
