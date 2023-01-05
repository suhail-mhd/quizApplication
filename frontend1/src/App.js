import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import AdminQuestions from "./pages/adminQuestionTable";
import AdminCategory from "./pages/AdminCategory";
import UserHome from "./pages/userHome/userHome";
import UserQuiz from "./pages/userQuiz/userQuiz";
import UserQuestions from "./pages/userQuestions/userQuestions";
import UserResult from "./pages/userResult/UserResult";
import Result from "./contextApi/resultContext";
import Question from "./contextApi/questionContext";
import AdminQuizContext from "./contextApi/adminQuizContext";
import UserQuizContext from "./contextApi/userQuizContext";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import PasswordReset from "./components/passwordReset/PasswordReset";
import Login from "./pages/userLogin/userLogin";
import Signup from "./pages/userSignUp/userSignUp";
import GetOtp from "./components/GetOtp/GetOtp";

function App() {
  return (
    <>
      <UserQuizContext>
        <AdminQuizContext>
          <Question>
            <Result>
              <BrowserRouter>
                <Routes>
                  <Route path="/admin" element={<AdminLogin />} />
                  <Route path="/adminHome" element={<AdminHome />} />
                  <Route path="/adminQuestions" element={<AdminQuestions />} />
                  <Route path="/adminCategory" element={<AdminCategory />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route path="/getOtp" element={<GetOtp />} />
                  <Route path="/password-reset/:id/:otp" element={<PasswordReset />} />
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
