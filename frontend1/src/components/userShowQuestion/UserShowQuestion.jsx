import React from "react";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
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
import { useFetchQuestion } from "../../hooks/FetchQuestion";
import { updateResult } from "../../hooks/setResult";

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

function UserShowQuestion({onChecked}) {
  const [show, setShow] = useState([]);
  const [count, setCount] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState("");
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(undefined)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [{
    isLoading,
    apiData,
    serverError
  }] = useFetchQuestion()

  const questions = useSelector(state => state.questions.queue[state.questions.trace])

  const {trace} = useSelector(state => state.questions)
  // useSelector(state => console.log(state))

  useEffect(() => {
    dispatch(updateResult({trace, checked}))
  }, [checked])
  

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
    onChecked(questions?.option1);
    setChecked(questions?.option1);
    setSelected(true);
  };

  const onSelect2 = () => {
    onChecked(questions?.option2);
    setChecked(questions?.option2);
    setSelected(true);
  };

  const onSelect3 = () => {
    onChecked(questions?.option3);
    setChecked(questions?.option3);
    setSelected(true);
  };
  
  const onSelect4 = () => {
    onChecked(questions?.option4);
    setChecked(questions?.option4);
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

  useEffect(() => {
    questionShow();
  }, []);

  

  if(isLoading) return <h4 className="text-light">isLoading</h4>
  if(serverError) return <h4 className="text-light">{serverError || "Unknown Error"}</h4>

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
        {/* <Typography variant="p" component="h2" style={styleFour}>
          Question {questionIndex + 1} of {count.length}
        </Typography> */}
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
          {questions?.question}
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
            Please select a choice!!
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
                  value={questions?.option1}
                  control={<Radio />}
                  label={questions?.option1}
                  onChange={onSelect1}
                  onClick={handleCheck1}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={questions?.option2}
                  control={<Radio />}
                  label={questions?.option2}
                  onChange={onSelect2}
                  onClick={handleCheck2}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={questions?.option3}
                  control={<Radio />}
                  label={questions?.option3}
                  onChange={onSelect3}
                  onClick={handleCheck3}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={questions?.option4}
                  control={<Radio />}
                  label={questions?.option4}
                  onChange={onSelect4}
                  onClick={handleCheck4}
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </Box>
      <ToastContainer />
    </div>
  );
}

export default UserShowQuestion;
