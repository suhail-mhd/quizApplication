import React, { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserShowQuestion from "../../components/userShowQuestion/UserShowQuestion";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/FetchQuestion";
import axios from "axios";
import { resultContext } from "../../contextApi/resultContext";
import { questionContext } from "../../contextApi/questionContext";

const styleTwo = {
  backgroundColor: "#001253",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
  margin: "0 5px",
};
const styleThree = {
  backgroundColor: "red",
  color: "#f4f4f4",
  borderRadius: "20px",
  paddingLeft: "50px",
  paddingRight: "50px",
  width: "50px",
  marginTop: "-60px",
  fontWeight: "bold",
  marginLeft: "2rem",
};

const styleFour = {
  fontSize: "15px",
  backgroundColor: "#f4f4f4",
  padding: "5px",
  width: "150px",
  borderRadius: "10px",
  marginTop: "8rem",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: "42rem",
  position: "absolute",
};

function useUserQuestions() {
  const myStyle = {
    backgroundImage:
      "url('https://scr.vn/wp-content/uploads/2020/08/H%C3%ACnh-n%E1%BB%81n-background-vector-scaled.jpg')",
    height: "100vh",
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginTop: "-30px",
  };

  const [questionIndex, setQuestionIndex] = useState(0);
  const [count, setCount] = useState("");
  const [check, setChecked] = useState(undefined);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setResult } = useContext(resultContext);
  const { getQuestion } = useContext(questionContext);

  const { queue, trace } = useSelector((state) => state.questions);

  const question = useSelector(
    (state) => state.questions.queue[0]?.getQuestion[trace]
  );

  const _id = question?._id;
  const category = question?.category

  const onChecked = (check) => {
    setError(false)
    setChecked(check);
    setQuestions([...questions, { _id, check, category }]);
  };

  // next and prev button

  const handleNext = () => {
    if (questionIndex < getQuestion.length && check) {
      dispatch(MoveNextQuestion());
      setQuestionIndex(questionIndex + 1);
      
    }else {
      setError(true)
    }
  };

  const handlePrev = () => {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSubmit = () => {
    try {
      axios
        .post("/api/user/submitAnswer", {
          questions,
        })
        .then((res) => {
          setResult(res.data);
        });
      navigate("/userResult");
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuit = () => {
    navigate('/')
  }

  return (
    <div style={myStyle}>
      <p
        style={{
          fontSize: "30px",
          padding: "20px",
          color: "#f4f4f4",
          fontWeight: "bold",
        }}
      >
        Quiz Master
      </p>
      <UserShowQuestion onChecked={onChecked} error={error}/>
      <Typography variant="p" component="h2" style={styleFour}>
        Question {questionIndex + 1} of {getQuestion.length}
      </Typography>
      
      <Box style={{ marginTop: "32rem" }}>
        <Box
          textAlign="right"
          style={{ marginRight: "27rem", marginTop: "5rem" }}
        >
          {questionIndex > 0 ? (
            <Button
              variant="contained"
              type="submit"
              value="submit"
              style={styleTwo}
              onClick={handlePrev}
            >
              Prev
            </Button>
          ) : (
            ""
          )}

          {questionIndex >= getQuestion.length - 1 ? (
            <Button
              variant="contained"
              type="submit"
              value="submit"
              style={styleTwo}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              value="submit"
              style={styleTwo}
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
        <Box style={{ marginLeft: "27rem" }}>
          <Button
            variant="contained"
            type="submit"
            value="submit"
            style={styleThree}
            onClick={handleQuit}
          >
            Quit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default useUserQuestions;
