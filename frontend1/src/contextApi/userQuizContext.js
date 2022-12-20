import { createContext, useState } from "react";

export const userQuizContext = createContext([]);

function Quiz({ children }) {
  const [getQuiz, setGetQuiz] = useState([]);
  return (
    <userQuizContext.Provider value={{ getQuiz, setGetQuiz }}>
      {children}
    </userQuizContext.Provider>
  );
}

export default Quiz;
