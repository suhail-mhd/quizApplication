import React from "react";
import UserShowQuestion from "../../components/userShowQuestion/UserShowQuestion";

// import UserSideBar from "../../components/userSideBar/userSideBar";


function userQuestions() {
  const myStyle = {
    backgroundImage:
      "url('https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-background-vector-scaled.jpg')",
    height: "100rem",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginTop:"-30px"
  };

  return (
    <div style={myStyle}>
      {/* <UserSideBar /> */}
      <p  style={{
                fontSize: "30px",
                padding: "20px",
                color: "#f4f4f4",
                fontWeight: "bold",
                
              }}>Quiz Master</p>
              <UserShowQuestion/>
    </div>
  );
}

export default userQuestions;
