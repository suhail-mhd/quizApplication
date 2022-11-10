import React from "react";
import { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";

import { PushAnswer } from "../../hooks/setResult";

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
  width:"150px",
  borderRadius: "10px",
  marginTop:"-2rem",
  textAlign:"center",
  display:"flex",
  justifyContent:"center",
  marginLeft:"17rem"
};

function UserShowQuestion() {
  const [show, setShow] = useState([]);
  const [count, setCount] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const questionShow = () => {
    try {
      axios.get("/api/user/getQuestion").then((res) => {
        // console.log(res.data.data);
        setCount(res.data.data);
        setShow(res.data.data[questionIndex]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = () => {
    // setCheck(true)
    console.log("options change");
  };

  const handleNext = () => {
    if (questionIndex < count.length - 1) {
      axios.get("/api/user/getQuestion").then((res) => {
        setShow(res.data.data[questionIndex + 1]);
      });
      setQuestionIndex(questionIndex + 1);
      dispatch(PushAnswer())
    } else {
      navigate("/userResult");
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

  const handleQuit = () => {};

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
        {/* {show.length && show.map((data, i) => {
        return( */}
        <>
          <Typography
            id="transition-modal-title"
            variant="h5"
            component="h2"
            style={{ marginLeft: 40, fontWeight: "bold", marginTop: 60 }}
          >
            {show.question}
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
                    value={false}
                    control={<Radio />}
                    label={show.option1}
                    onChange={onSelect}
                  />
                </Grid>
                <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={show.option2}
                    onChange={onSelect}
                  />
                </Grid>
                <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={show.option3}
                    onChange={onSelect}
                  />
                </Grid>
                <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label={show.option4}
                    onChange={onSelect}
                  />
                </Grid>
              </RadioGroup>
            </FormControl>
          </Grid>
        </>
        {/* )
       })} */}
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
            onClick={handleQuit}
          >
            Quit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default UserShowQuestion;
