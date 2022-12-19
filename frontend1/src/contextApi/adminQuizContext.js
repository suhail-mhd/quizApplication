import { createContext, useState } from "react";

export const adminQuizContext = createContext([]);

function Quiz({ children }) {
  const [getQuiz, setGetQuiz] = useState([]);
  console.log(getQuiz);
  return (
    <adminQuizContext.Provider value={{ getQuiz, setGetQuiz }}>
      {children}
    </adminQuizContext.Provider>
  );
}

export default Quiz;
