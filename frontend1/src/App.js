import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHome from "./pages/AdminHome";
import AdminQuestions from "./pages/adminQuestionTable";
import AdminCategory from "./pages/AdminCategory";
import UserLogin from "./pages/userLogin/userLogin";
import UserSignUp from "./pages/userSignUp/useSignUp";
import UserHome from "./pages/userHome/userHome";
import UserQuiz from "./pages/userQuiz/userQuiz";
import UserQuestions from "./pages/userQuestions/userQuestions";
import UserResult from "./pages/userResult/UserResult";
import Result from "./contextApi/resultContext";
import Question from "./contextApi/questionContext";
import AdminQuizContext from "./contextApi/adminQuizContext";
import UserQuizContext from "./contextApi/userQuizContext";

function App() {
  return (
    <>
      <UserQuizContext>
        <AdminQuizContext>
          <Question>
            <Result>
              <BrowserRouter>
                <Routes>
                  <Route path="/admin" element={<AdminHome />} />
                  <Route path="/adminQuestions" element={<AdminQuestions />} />
                  <Route path="/adminCategory" element={<AdminCategory />} />
                  <Route path="/" element={<UserLogin />} />
                  <Route path="/useSignUp" element={<UserSignUp />} />
                  <Route path="/userHome" element={<UserHome />} />
                  <Route path="/userQuiz" element={<UserQuiz />} />
                  <Route path="/userQuestions" element={<UserQuestions />} />
                  <Route path="/userResult" element={<UserResult />} />
                </Routes>
              </BrowserRouter>
            </Result>
          </Question>
        </AdminQuizContext>
      </UserQuizContext>
    </>
  );
}

export default App;
