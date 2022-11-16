import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserShowQuestion from "../../components/userShowQuestion/UserShowQuestion";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MoveNextQuestion, MovePrevQuestion } from "../../hooks/FetchQuestion";
import { PushAnswer } from "../../hooks/setResult";
import axios from "axios";
import { resultReducer } from "../../redux/result_reducer";

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
  const [check, setChecked] = useState(undefined)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { queue, trace } = useSelector((state) => state.questions);

  const result = useSelector(state => state.result.result)


  const showCount = () => {
    try {
      axios.get("/api/user/getQuestion").then((res) => {
        setCount(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    showCount();
  }, []);

  const onChecked = (check) => {
    console.log(check);
    setChecked(check)
  }

  // next and prev button

  const handleNext = () => {
    if (trace < queue.length) {
      dispatch(MoveNextQuestion());
      setQuestionIndex(questionIndex + 1);

      if(result.length <= trace) {
        dispatch(PushAnswer(check));
      }
      
    }

    setChecked(undefined)
  };

  const handlePrev = () => {
    if (trace > 0) {
      dispatch(MovePrevQuestion());
      setQuestionIndex(questionIndex - 1);
    }
  };

  if(result.length && result.length >= queue.length) {
    return navigate('/userResult')
  }

  return (
    <div style={myStyle}>
      {/* <UserSideBar /> */}
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
      <UserShowQuestion onChecked={onChecked} />
      <Typography variant="p" component="h2" style={styleFour}>
        Question {questionIndex + 1} of {count.length}
      </Typography>
      <Box style={{marginTop:"32rem"}}>
      <Box textAlign="right" style={{ marginRight: "27rem", marginTop: "5rem" }}>
        {trace > 0 ? <Button
          variant="contained"
          type="submit"
          value="submit"
          style={styleTwo}
          onClick={handlePrev}
        >
          Prev
        </Button>:""}
        <Button
          variant="contained"
          type="submit"
          value="submit"
          style={styleTwo}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
      <Box style={{ marginLeft: "27rem" }}>
        <Button
          variant="contained"
          type="submit"
          value="submit"
          style={styleThree}
          href="/"
        >
          Quit
        </Button>
      </Box>
      </Box>
    </div>
  );
}

export default useUserQuestions;
