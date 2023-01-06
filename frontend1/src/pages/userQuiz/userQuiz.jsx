import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserSideBar from "../../components/userSideBar/userSideBar";
import UserCategory from "./userQuiz";
import { userQuizContext } from "../../contextApi/userQuizContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "./userQuiz.css";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import UserAppBar from "../../components/userAppBar/UserAppBar";

const styleOne = {
  width: "100px",
  height: "80px",
  position: "absolute",
  marginLeft: "13rem",
};

function UserQuiz() {
  const [quiz, setQuiz] = useState([]);
  const [getQuiz, setGetQuiz] = useState([]);
  const navigate = useNavigate();
  // const { setGetQuiz } = useContext(userQuizContext);
  const location = useLocation();

  const category = location.state?.name;

  const showQuiz = () => {
    try {
      axios.get("/api/user/getQuiz").then((res) => {
        setQuiz(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  for (let i = 0; i < quiz.length; i++) {
    let quizCat = quiz[i].category;
    if(category === quizCat) {
      var quizzes = quizCat
    }
  }

  const renderQuiz = (quizzes) => {
    axios.get(`/api/user/getAllQuizzes/${quizzes}`).then((res) => {
      setGetQuiz(res.data);
    })
  }

  const toQuestions = (quiz) => {
    navigate("/userQuestions", { state: { name: quiz } });
  };

  const backHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    showQuiz();
    renderQuiz(`${quizzes}`)
  }, [getQuiz]);

  return (
    <div>
      <UserSideBar />
      <UserAppBar/>
      <div style={{ float: "right", marginRight: "50px", marginTop: 70 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#333" }}
          onClick={backHandler}
        >
          Back
        </Button>
      </div>
      <div className="cardMove">
        <Typography
          variant="h4"
          component="h6"
          textAlign="center"
          fontFamily="egoe UI"
          fontWeight={"bold"}
          style={{ marginLeft: "-50rem", marginBottom: "2em" }}
        >
          - Quiz -
        </Typography>
        <Grid container>
          {getQuiz.length &&
            getQuiz.map((data) => {
              return (
                <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                  <Card
                    sx={{
                      display: "flex",
                      width: "300px",
                      height: "100px",
                      marginLeft: "300px",
                      boxShadow:
                        "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                      marginBottom: "40px",
                      borderRadius: "20px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <img src="../../quiz.png" alt="card-img" style={styleOne} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h6"
                          style={{ fontWeight: "bold" }}
                        >
                          {data.quiz}
                        </Typography>
                        <CardActions>
                          <Button
                            onClick={() => toQuestions(data?.quiz)}
                            size="small"
                          >
                            Move to Questions
                          </Button>
                        </CardActions>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default UserQuiz;
