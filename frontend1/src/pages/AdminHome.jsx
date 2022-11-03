import React from "react";
import BasicCard from "../components/adminCards";
import ResponsiveAppBar from "../components/AppBar";
import QuizModal from "../components/quizModal";

const AdminHome = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <QuizModal/>
      <BasicCard/>
    </div>
  );
};

export default AdminHome;
