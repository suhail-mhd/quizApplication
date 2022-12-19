import { createContext, useState } from "react";

export const userQuizContext = createContext([]);

function Quiz({ children }) {
  const [getQuiz, setGetQuiz] = useState([]);
  console.log(getQuiz);
  return (
    <userQuizContext.Provider value={{ getQuiz, setGetQuiz }}>
      {children}
    </userQuizContext.Provider>
  );
}

export default Quiz;
