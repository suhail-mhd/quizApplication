import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminHome from "./pages/AdminHome";
import AdminQuestions from "./pages/adminQuestionTable";
import UserHome from "./pages/userHome/userHome";
import UserQuestions from "./pages/userQuestions/userQuestions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/adminQuestions" element={<AdminQuestions />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/userQuestions" element={<UserQuestions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
