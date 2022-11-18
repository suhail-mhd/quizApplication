import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHome from "./pages/AdminHome";
import AdminQuestions from "./pages/adminQuestionTable";
import AdminCategory from "./pages/AdminCategory";
import UserHome from "./pages/userHome/userHome";
import UserQuestions from "./pages/userQuestions/userQuestions";
import UserResult from "./pages/userResult/UserResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/adminQuestions" element={<AdminQuestions />} />
        <Route path="/adminCategory" element={<AdminCategory />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/userQuestions/:category" element={<UserQuestions />} />
        <Route path="/userResult" element={<UserResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
