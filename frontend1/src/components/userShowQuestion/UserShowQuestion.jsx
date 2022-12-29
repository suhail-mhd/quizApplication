import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "react-loader-spinner";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import "./UserShowQuestion.css";
import { resultContext } from "../../contextApi/resultContext";
import UserNoQuestionMsg from "../userNoQuestionMsg/UserNoQuestionMsg";

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
  position: "absolute",
};

const qStyle = {
  marginLeft: 40,
  fontWeight: "bold",
  marginTop: 60,
};

const errorStyle = {
  color: "red",
  justifyContent: "center",
  fontWeight: "bold",
  display: "flex",
  textAlign: "center",
  fontSize: "18px",
  marginTop: "2rem",
};

const loadStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function UserShowQuestion() {
  const [checked, setChecked] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState([]);
  const [questionCat, setQuestionCat] = useState([]);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setResult } = useContext(resultContext);
  const [isLoading, setIsLoading] = useState(false);

  const showQuestions = () => {
    try {
      axios.get("/api/user/getQuestion").then((res) => {
        setQuestionCat(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const quizName = location.state?.name;

  for (let i = 0; i < questionCat.length; i++) {
    let type = questionCat[i].type;
    if (quizName === type) {
      var types = type;
    }
  }

  const renderQuestion = (types) => {
    axios.get(`/api/user/getAllQuestions/${types}`).then((res) => {
      setQuestion(res.data);
    });
  };

  const _id = question[questionIndex]?._id;
  const quiz = question[questionIndex]?.type;

  // check answer

  const onSelect1 = () => {
    setChecked(question[questionIndex]?.option1);
    let check = question[questionIndex]?.option1;
    setSubmit([...submit, { _id, check, quiz }]);
    setError(false);
  };

  const onSelect2 = () => {
    setChecked(question[questionIndex]?.option2);
    let check = question[questionIndex]?.option2;
    setSubmit([...submit, { _id, check, quiz }]);
    setError(false);
  };

  const onSelect3 = () => {
    setChecked(question[questionIndex]?.option3);
    let check = question[questionIndex]?.option3;
    setSubmit([...submit, { _id, check, quiz }]);
    setError(false);
  };

  const onSelect4 = () => {
    setChecked(question[questionIndex]?.option4);
    let check = question[questionIndex]?.option4;
    setSubmit([...submit, { _id, check, quiz }]);
    setError(false);
  };

  // next and prev button

  const handleNext = () => {
    if (checked && questionIndex < question.length) {
      setQuestionIndex(questionIndex + 1);
      setChecked();
    } else {
      setError(true);
    }
  };

  const handlePrev = () => {
    setError(false);
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setChecked(checked);
    }
  };

  const handleSubmit = () => {
    if (checked) {
      try {
        axios
          .post("/api/user/submitAnswer", {
            submit,
          })
          .then((res) => {
            setResult(res.data);
          });
        navigate("/userResult");
      } catch (error) {
        console.log(error);
      }
      setChecked();
    } else {
      setError(true);
    }
  };

  const handleQuit = (category) => {
    navigate("/userQuiz", { state: { name: category } });
  };

  useEffect(() => {
    showQuestions();
    renderQuestion(`${types}`);
    console.log(submit);
  }, [question, submit]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader
          style={loadStyle}
          type="ThreeDots"
          color="orange"
          height={100}
          width={100}
        />
      ) : (
        <div>
          {question.length > 0 ? (
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
                Question {questionIndex + 1} of {question.length}
              </Typography>

              <div>
                <Typography
                  id="transition-modal-title"
                  variant="h5"
                  component="h2"
                  style={qStyle}
                >
                  {question[questionIndex]?.question}
                </Typography>

                <Grid
                  container
                  style={{ justifyContent: "center", marginTop: "2rem" }}
                >
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                        <FormControlLabel
                          value={question[questionIndex]?.option1}
                          control={<Radio />}
                          label={question[questionIndex]?.option1}
                          onChange={onSelect1}
                        />
                      </Grid>
                      <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                        <FormControlLabel
                          value={question[questionIndex]?.option2}
                          control={<Radio />}
                          label={question[questionIndex]?.option2}
                          onChange={onSelect2}
                        />
                      </Grid>
                      <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                        <FormControlLabel
                          value={question[questionIndex]?.option3}
                          control={<Radio />}
                          label={question[questionIndex]?.option3}
                          onChange={onSelect3}
                        />
                      </Grid>
                      <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                        <FormControlLabel
                          value={question[questionIndex]?.option4}
                          control={<Radio />}
                          label={question[questionIndex]?.option4}
                          onChange={onSelect4}
                        />
                      </Grid>
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </div>
              {error ? <p style={errorStyle}>Please select a choice!!</p> : ""}
              <Box>
                <Box
                  textAlign="right"
                  style={{ marginRight: "2rem", marginTop: "5rem" }}
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

                  {questionIndex >= question.length - 1 ? (
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
                <Box>
                  <Button
                    variant="contained"
                    type="submit"
                    value="submit"
                    style={styleThree}
                    onClick={() => handleQuit(question[questionIndex].category)}
                  >
                    Quit
                  </Button>
                </Box>
              </Box>
            </Box>
          ) : (
            <UserNoQuestionMsg />
          )}
        </div>
      )}
    </>
  );
}

export default UserShowQuestion;
