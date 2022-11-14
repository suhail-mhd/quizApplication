import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./UserShowQuestion.css";
import UserShowResult from "../userShowResult/UserShowResult";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
};

const styleOne = {
  marginBottom: 20,
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "60px",
  textAlign: "center",
  fontWeight: "bold",
};

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
  marginTop: "-2rem",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  marginLeft: "17rem",
};

function UserShowQuestion() {
  const [show, setShow] = useState([]);
  const [count, setCount] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState("");
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  const questionShow = () => {
    try {
      axios.get("/api/user/getQuestion").then((res) => {
        setCount(res.data.data);
        setShow(res.data.data[questionIndex]);
        setCorrect(res.data.data[questionIndex]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // check answer

  const onSelect1 = () => {
    if (show.option1 == correct.answer) {
      toast.success("Correct Answer !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (show.option1 != correct.answer) {
      toast.error("Wrong Answer!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSelected(true);
  };

  const onSelect2 = () => {
    if (show.option2 == correct.answer) {
      toast.success("Correct Answer !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (show.option2 != correct.answer) {
      toast.error("Wrong Answer!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSelected(true);
  };

  const onSelect3 = () => {
    if (show.option3 == correct.answer) {
      toast.success("Correct Answer !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (show.option3 != correct.answer) {
      toast.error("Wrong Answer!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSelected(true);
  };
  
  const onSelect4 = () => {
    if (show.option4 == correct.answer) {
      toast.success("Correct Answer !", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (show.option4 != correct.answer) {
      toast.error("Wrong Answer!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    setSelected(true);
  };

  // set count

  const handleCheck1 = () => {
    if (show.option1 == correct.answer) {
      setScore(score + 1);
    }
  };
  const handleCheck2 = () => {
    if (show.option2 == correct.answer) {
      setScore(score + 1);
    }
  };
  const handleCheck3 = () => {
    if (show.option3 == correct.answer) {
      setScore(score + 1);
    }
  };
  const handleCheck4 = () => {
    if (show.option4 == correct.answer) {
      setScore(score + 1);
    }
  };

  // next and prev button

  const handleNext = () => {
    if (selected && questionIndex < count.length - 1) {
      axios.get("/api/user/getQuestion").then((res) => {
        setShow(res.data.data[questionIndex + 1]);
        setCorrect(res.data.data[questionIndex + 1]);
      });
      setQuestionIndex(questionIndex + 1);
      setError(false);
    } else if (!selected) {
      setError(true);
    } else {
      navigate("/userResult");
      <UserShowResult score={score} />;
      console.log(score);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0 && questionIndex < count.length) {
      axios.get("/api/user/getQuestion").then((res) => {
        setShow(res.data.data[questionIndex - 1]);
      });
      setQuestionIndex(questionIndex - 1);
    }
  };

  useEffect(() => {
    questionShow();
  }, []);

  return (
    <div>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h4"
          component="h2"
          style={styleOne}
        >
          - Questions -
        </Typography>
        <Typography variant="p" component="h2" style={styleFour}>
          Question {questionIndex + 1} of {count.length}
        </Typography>
        <div
          style={{ float: "right", marginRight: "20px", fontWeight: "bold" }}
        >
          Score: {score}
        </div>
        <Typography
          id="transition-modal-title"
          variant="h5"
          component="h2"
          style={{ marginLeft: 40, fontWeight: "bold", marginTop: 60 }}
        >
          {show.question}
        </Typography>
        {error ? (
          <p
            style={{
              color: "red",
              justifyContent: "center",
              fontWeight: "bold",
              display: "flex",
              textAlign: "center",
            }}
          >
            Please select a chioce!!
          </p>
        ) : (
          ""
        )}
        <Grid container style={{ justifyContent: "center", marginTop: "2rem" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={show.option1}
                  control={<Radio />}
                  label={show.option1}
                  onChange={onSelect1}
                  onClick={handleCheck1}
                  // disabled={selected}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={show.option2}
                  control={<Radio />}
                  label={show.option2}
                  onChange={onSelect2}
                  onClick={handleCheck2}
                  // disabled={selected}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={show.option3}
                  control={<Radio />}
                  label={show.option3}
                  onChange={onSelect3}
                  onClick={handleCheck3}
                  // disabled={selected}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={show.option4}
                  control={<Radio />}
                  label={show.option4}
                  onChange={onSelect4}
                  onClick={handleCheck4}
                  // disabled={selected}
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
        <Box
          textAlign="right"
          style={{ marginRight: "2rem", marginTop: "5rem" }}
        >
          <Button
            variant="contained"
            type="submit"
            value="submit"
            style={styleTwo}
            onClick={handlePrev}
          >
            Prev
          </Button>
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
        <Box style={{ marginRight: "2rem" }}>
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
      <ToastContainer />
    </div>
  );
}

export default UserShowQuestion;
