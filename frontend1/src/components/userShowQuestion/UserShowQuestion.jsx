import React from "react";
import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { questionContext } from "../../contextApi/questionContext";
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

function UserShowQuestion() {
  const [checked, setChecked] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState([]);
  const navigate = useNavigate();
  const { getQuestion } = useContext(questionContext);
  const { setResult } = useContext(resultContext);

  const [{ isLoading, apiData, serverError }] = useFetchQuestion();

  const _id = getQuestion[questionIndex]?._id;
  const category = getQuestion[questionIndex]?.category;

  // check answer

  const onSelect1 = () => {
    setChecked(getQuestion[questionIndex]?.option1);
    let check = getQuestion[questionIndex]?.option1;
    setSubmit([...submit, { _id, check, category }]);
    setError(false);
  };

  const onSelect2 = () => {
    setChecked(getQuestion[questionIndex]?.option2);
    let check = getQuestion[questionIndex]?.option2;
    setSubmit([...submit, { _id, check, category }]);
    setError(false);
  };

  const onSelect3 = () => {
    setChecked(getQuestion[questionIndex]?.option3);
    let check = getQuestion[questionIndex]?.option3;
    setSubmit([...submit, { _id, check, category }]);
    setError(false);
  };

  const onSelect4 = () => {
    setChecked(getQuestion[questionIndex]?.option4);
    let check = getQuestion[questionIndex]?.option4;
    setSubmit([...submit, { _id, check, category }]);
    setError(false);
  };

  useEffect(() => {
    console.log(submit);
  }, [submit]);

  // next and prev button

  const handleNext = () => {
    if (questionIndex < getQuestion.length && checked) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setError(true);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    }
  };

  const handleSubmit = () => {
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
  };

  const handleQuit = () => {
    navigate("/userCategory");
  };

  if (isLoading) return <h4 className="text-light">isLoading</h4>;
  if (serverError)
    return <h4 className="text-light">{serverError || "Unknown Error"}</h4>;

  return (
    <div>
      {getQuestion.length > 0 ? (
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
            Question {questionIndex + 1} of {getQuestion.length}
          </Typography>

          <div>
            <Typography
              id="transition-modal-title"
              variant="h5"
              component="h2"
              style={qStyle}
            >
              {getQuestion[questionIndex]?.question}
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
                      value={getQuestion[questionIndex]?.option1}
                      control={<Radio />}
                      label={getQuestion[questionIndex]?.option1}
                      onChange={onSelect1}
                    />
                  </Grid>
                  <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                    <FormControlLabel
                      value={getQuestion[questionIndex]?.option2}
                      control={<Radio />}
                      label={getQuestion[questionIndex]?.option2}
                      onChange={onSelect2}
                    />
                  </Grid>
                  <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                    <FormControlLabel
                      value={getQuestion[questionIndex]?.option3}
                      control={<Radio />}
                      label={getQuestion[questionIndex]?.option3}
                      onChange={onSelect3}
                    />
                  </Grid>
                  <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                    <FormControlLabel
                      value={getQuestion[questionIndex]?.option4}
                      control={<Radio />}
                      label={getQuestion[questionIndex]?.option4}
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
            <Box>
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
        </Box>
      ) : (
        <UserNoQuestionMsg />
      )}
      <ToastContainer />
    </div>
  );
}

export default UserShowQuestion;
