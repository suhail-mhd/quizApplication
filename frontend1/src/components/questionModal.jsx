import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import ErrorMessage from "./ErrorMessage";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  //   p: 4,
};

const styleOne = {
  marginBottom: 20,
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "50px",
  textAlign: "center",
};
const styleThree = {
  backgroundColor: "#001253",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
};

export default function TransitionsModal(QuizName) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setErrorMsg(null);
  };
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  // const [type, setType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const type = QuizName?.QuizName;

  const handleChange2 = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };
  // const handleChange3 = (event) => {
  //   event.preventDefault();
  //   setType(event.target.value);
  // };

  const questionHandler = () => {
    if (
      question.length == 0 ||
      option1.length == 0 ||
      option2.length == 0 ||
      option3.length == 0 ||
      option4.length == 0 ||
      answer.length == 0 ||
      category.length == 0 ||
      type.length == 0
    ) {
      setError(true);
    } else {
      try {
        axios
          .post("/api/admin/addQuestion", {
            question,
            option1,
            option2,
            option3,
            option4,
            answer,
            category,
            type,
          })
          .then((res) => {
            setQuestion(res.data);
          })
          .catch((err) => {
            setErrorMsg(err.response.data);
            setOpen(true);
          });
        handleClose();
      } catch (error) {
        console.log("error occurred", error);
        setErrorMsg("Cannot use the existed question");
      }
    }
  };

  const getCategory = () => {
    try {
      axios.get("/api/user/getCategory").then((res) => {
        setCategoryList(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getType = () => {
    try {
      axios.get("/api/admin/getQuiz").then((res) => {
        setTypeList(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
    getType();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          float: "right",
          marginTop: 100,
          marginRight: 100,
          marginBottom: 50,
        }}
        onClick={handleOpen}
      >
        Add Questions
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={styleOne}
            >
              Add Questions
            </Typography>
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <Grid container style={{ textAlign: "center" }}>
              <Grid item md={6} xs={12} lg={12}>
                <TextField
                  variant="standard"
                  label="Question"
                  placeholder="Enter the Question"
                  type="text"
                  name="question"
                  style={{ width: "350px", marginLeft: "-20px" }}
                  onChange={(e) => setQuestion(e.target.value)}
                />
                {error && question.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Question is required
                  </p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <TextField
                  variant="standard"
                  label="Option1"
                  placeholder="Enter the Options"
                  type="text"
                  name="option1"
                  style={{ width: "150px" }}
                  onChange={(e) => setOption1(e.target.value)}
                />
                {error && option1.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <TextField
                  variant="standard"
                  label="Option2"
                  placeholder="Enter the Options"
                  type="text"
                  name="option2"
                  style={{ width: "150px" }}
                  onChange={(e) => setOption2(e.target.value)}
                />
                {error && option2.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <TextField
                  variant="standard"
                  label="Option3"
                  placeholder="Enter the Options"
                  type="text"
                  name="option3"
                  style={{ width: "150px" }}
                  onChange={(e) => setOption3(e.target.value)}
                />
                {error && option3.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <TextField
                  variant="standard"
                  label="Option4"
                  placeholder="Enter the Options"
                  type="text"
                  name="option4"
                  style={{ width: "150px" }}
                  onChange={(e) => setOption4(e.target.value)}
                />
                {error && option4.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item md={6} xs={12} lg={6}>
                <TextField
                  variant="standard"
                  label="Answer"
                  placeholder="Enter the answer"
                  type="text"
                  name="answer"
                  style={{ width: "150px" }}
                  onChange={(e) => setAnswer(e.target.value)}
                />
                {error && answer.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Answer is required
                  </p>
                ) : (
                  ""
                )}
              </Grid>
              <div>
                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120 }}
                  style={{ marginLeft: "2rem" }}
                >
                  <InputLabel htmlFor="demo-customized-select-native">
                    Category
                  </InputLabel>

                  <NativeSelect
                    id="demo-customized-select-native"
                    value={category}
                    onChange={handleChange2}
                    label="category"
                  >
                    <option aria-label="None" value="" />
                    {categoryList.length &&
                      categoryList.map((data) => {
                        return (
                          <option value={data.category} key={data.id}>
                            {data.category}
                          </option>
                        );
                      })}
                  </NativeSelect>
                </FormControl>
                {error && category.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </div>
              {/* <div>
              <TextField
                  variant="standard"
                  label="Type"
                  placeholder="Enter the Type"
                  type="text"
                  name="type"
                  style={{ width: "150px" }}
                  value={type}
                  // onChange={(e) => setAnswer(e.target.value)}
                />
                {error && type.length <= 0 ? (
                  <p
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontWeight: "bold",
                      margin: 0,
                      paddingLeft: "2rem",
                    }}
                  >
                    Please fill in the field
                  </p>
                ) : (
                  ""
                )}
              </div> */}
            </Grid>
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                value="submit"
                style={styleThree}
                onClick={questionHandler}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
