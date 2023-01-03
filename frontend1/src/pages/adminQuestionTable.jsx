import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "react-loader-spinner";
import ResponsiveAppBar from "../components/AppBar";
import QuestionModal from "../components/questionModal";
import { adminQuizContext } from "../contextApi/adminQuizContext";
import { Box, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const styleOne = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const styleTwo = {
  position: "relative",
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "50px",
  textAlign: "center",
  marginTop: "-2rem",
  width: 364,
  marginLeft: "-2rem",
};

const style4 = {
  marginTop: "10rem",
  color: "blue",
};

const loadStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

function AdminQuestions() {
  const [question, setQuestion] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [id, setId] = useState();
  const [questions, setQuestions] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  // const [type, setType] = useState("");
  const [typeList, setTypeList] = useState([]);
  const [questionType, setQuestionType] = useState([]);
  const [showQuestion, setShowQuestion] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showQuestions = () => {
    try {
      axios.get("/api/admin/getQuestion").then((res) => {
        setQuestionType(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const QuizName = location.state?.name;
  const type = QuizName?.QuizName;

  for (let i = 0; i < questionType.length; i++) {
    let type = questionType[i].type;
    if (QuizName === type) {
      var types = type;
    }
  }

  const renderQuestion = (types) => {
    axios.get(`/api/admin/getAllQuestions/${types}`).then((res) => {
      setShowQuestion(res.data);
    });
  };

  // delete question handle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // edit modal handle
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenEdit = () => setOpenModal(true);
  const handleCloseEdit = () => setOpenModal(false);

  const dltQst = (id) => {
    console.log(id);
    setDeleteId(id);
    handleOpen();
  };

  //deleting data
  const DeleteQuestion = async () => {
    try {
      await axios.post("/api/admin/deleteQuestion", {
        deleteId,
      });

      handleClose();
      setRender(true);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  // edit data

  const getQuestionDetails = async (id) => {
    setUpdateId(id);
    handleOpenEdit();
    try {
      await axios.get(`/api/admin/getAllQuestionDetails/${id}`).then((res) => {
        setId(res.data._id);
        setQuestions(res.data.question);
        setOption1(res.data.option1);
        setOption2(res.data.option2);
        setOption3(res.data.option3);
        setOption4(res.data.option4);
        setAnswer(res.data.answer);
        setCategory(res.data.category);
        // setType(res.data.type);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .patch("/api/admin/updateQuestion", {
          id,
          questions,
          option1,
          option2,
          option3,
          option4,
          answer,
          category,
          type,
        })
        .then((res) => {
          console.log(res);
        });
      handleCloseEdit();
    } catch (error) {
      console.log(error);
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
  const backHandler = () => {
    navigate("/admin");
  };

  useEffect(() => {
    showQuestions();
    renderQuestion(`${types}`);
    getCategory();
    getType();
  }, [
    showQuestion,
    render,
    questions,
    option1,
    option2,
    option3,
    option4,
    answer,
    category,
    type,
  ]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <div style={{ float: "right", marginRight: "80px", marginTop: 100 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#333" }}
          onClick={backHandler}
        >
          Back
        </Button>
      </div>
      <QuestionModal QuizName={QuizName} />
      {/* delete Modal start */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            textAlign="center"
            variant="h6"
            component="h2"
          >
            Are You Sure Want to Delete
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 20,
            }}
          >
            <div>
              <Button
                variant="contained"
                onClick={DeleteQuestion}
                style={{ backgroundColor: "red" }}
              >
                Yes
              </Button>
            </div>
            <div>
              <Button variant="contained" onClick={handleClose}>
                NO
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      {/* delete modal end */}
      {/* edit modal start */}
      <Modal
        open={openModal}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleOne}>
          <form onSubmit={formSubmit} encType="multipart/form-data">
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={styleTwo}
              >
                Update Field
              </Typography>

              <Grid container>
                <Grid item md={6} xs={12} lg={12} marginTop={2}>
                  <br />

                  <TextField
                    variant="standard"
                    label="Question"
                    placeholder="Edit Question"
                    type="text"
                    name="question"
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Option 1"
                    placeholder="Edit Option 1"
                    type="text"
                    name="option1"
                    value={option1}
                    style={{ width: "150px" }}
                    onChange={(e) => setOption1(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Option 2"
                    placeholder="Edit Option 2"
                    type="text"
                    name="option2"
                    value={option2}
                    style={{ width: "150px" }}
                    onChange={(e) => setOption2(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Option 3"
                    placeholder="Edit Option 3"
                    type="text"
                    value={option3}
                    name="option3"
                    style={{ width: "150px" }}
                    onChange={(e) => setOption3(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Option 4"
                    placeholder="Edit Option 4"
                    type="text"
                    name="option4"
                    value={option4}
                    style={{ width: "150px" }}
                    onChange={(e) => setOption4(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <TextField
                    variant="standard"
                    label="Answer"
                    placeholder="Edit Answer"
                    type="text"
                    name="answer"
                    value={answer}
                    style={{ width: "150px" }}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="demo-customized-select-native">
                      Category
                    </InputLabel>

                    <NativeSelect
                      id="demo-customized-select-native"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
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
                </Grid>

                {/* <Grid item md={6} xs={12} lg={6} marginTop={2}>
                  <br />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel htmlFor="demo-customized-select-native">
                      Type
                    </InputLabel>
                    <NativeSelect
                      id="demo-customized-select-native"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      label="type"
                      style={{ width: "150px" }}
                    >
                      <option aria-label="None" value="" />
                      {typeList.length &&
                        typeList.map((data) => {
                          return (
                            <option value={data.quiz} key={data.id}>
                              {data.quiz}
                            </option>
                          );
                        })}
                    </NativeSelect>
                  </FormControl>
                </Grid> */}
              </Grid>

              <div style={{ justifyContent: "end", display: "flex" }}>
                <Button variant="contained" type="Submit">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* edit modal end */}
      <Typography
        variant="h4"
        component="h6"
        textAlign="center"
        fontFamily="egoe UI"
        fontWeight={"bold"}
        mt={5}
        mb={5}
      >
        Questions
      </Typography>

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
          {showQuestion.length > 0 ? (
            <Box sx={{ paddingLeft: 10, paddingRight: 10, marginBottom: 20 }}>
              <TableContainer
                component={Paper}
                style={{
                  borderRadius: "20px",
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                }}
              >
                <Table
                  sx={{ minWidth: 650 }}
                  size="small"
                  aria-label="a dense table"
                >
                  <TableHead>
                    <TableRow sx={{ border: "2px solid black" }}>
                      <TableCell style={{ fontWeight: "bold" }}>No</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Question
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Choices
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Answer
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Category
                      </TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {showQuestion?.map((data, i) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            height: 70,
                            border: "1px solid black",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {i + 1}
                          </TableCell>
                          <TableCell>{data?.question}</TableCell>
                          <TableCell>
                            <ol type="A">
                              <li>{data?.option1}</li>
                              <li>{data?.option2}</li>
                              <li>{data?.option3}</li>
                              <li>{data?.option4}</li>
                            </ol>
                          </TableCell>
                          <TableCell>{data?.answer}</TableCell>
                          <TableCell>{data?.category}</TableCell>
                          <TableCell>{data?.type}</TableCell>
                          <TableCell>
                            <EditOutlinedIcon
                              onClick={() => getQuestionDetails(`${data?._id}`)}
                              style={{ color: "blue", cursor: "pointer" }}
                            />
                          </TableCell>
                          <TableCell>
                            <DeleteIcon
                              onClick={() => dltQst(`${data?._id}`)}
                              style={{ color: "red", cursor: "pointer" }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <Typography
              variant="h4"
              component="h6"
              textAlign="center"
              fontFamily="egoe UI"
              fontWeight={"bold"}
              mt={5}
              mb={5}
              style={style4}
            >
              No Questions added...!! <br></br> Please add Questions
            </Typography>
          )}
        </div>
      )}
    </div>
  );
}

export default AdminQuestions;
