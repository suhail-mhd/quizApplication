import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminQuizContext } from "../contextApi/adminQuizContext";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
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
  marginTop: "-3.5rem",
  marginLeft: "22rem",
};

const styleTwo = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  // p: 4,
};

const styleThree = {
  marginBottom: 20,
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "50px",
  textAlign: "center",
};

function Cards() {
  const [show, setShow] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState(false);
  const [updateId, setUpdateId] = useState();
  const [id, setId] = useState();
  const [quiz, setQuiz] = useState("");
  const navigate = useNavigate();
  const { setGetQuiz } = useContext(adminQuizContext);

  // delete quiz handle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // edit modal handle
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenEdit = () => setOpenModal(true);
  const handleCloseEdit = () => setOpenModal(false);

  const quizShow = () => {
    try {
      axios.get("/api/admin/getQuiz").then((res) => {
        setShow(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dltQuiz = (id) => {
    setDeleteId(id);
    handleOpen();
  };

  //deleting data
  const DeleteQuiz = async () => {
    try {
      await axios.post("/api/admin/deleteQuiz", {
        deleteId,
      });

      handleClose();
      setRender(true);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const getQuizDetails = async (id) => {
    setUpdateId(id);
    handleOpenEdit();
    try {
      await axios.get(`/api/admin/getAllQuizDetails/${id}`).then((res) => {
        setId(res.data._id);
        setQuiz(res.data.quiz);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmit = async () => {
    try {
      await axios
        .patch("/api/admin/updateQuiz", {
          id,
          quiz,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const quizHandler = (quiz) => {
    try {
      axios.post("/api/admin/quizNav", { quiz }).then((res) => {
        setGetQuiz(res.data.qType);
      });
      navigate("/adminQuestions");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quizShow();
  }, [quizShow, render]);

  return (
    <div>
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
                onClick={DeleteQuiz}
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
        <Box sx={styleTwo}>
          <form onSubmit={formSubmit} encType="multipart/form-data">
            <Box>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={styleThree}
              >
                Update Field
              </Typography>

              <Grid container>
                <Grid item md={6} xs={12} lg={12} marginTop={2}>
                  <br />

                  <TextField
                    variant="standard"
                    label="Quiz"
                    placeholder="Edit Quiz"
                    type="text"
                    name="quiz"
                    value={quiz}
                    onChange={(e) => setQuiz(e.target.value)}
                    style={{ marginLeft: "3rem" }}
                  />
                </Grid>
              </Grid>

              <div
                style={{
                  justifyContent: "end",
                  display: "flex",
                  marginRight: "1rem",
                  marginTop: "3rem",
                }}
              >
                <Button variant="contained" type="Submit">
                  Submit
                </Button>
              </div>
            </Box>
          </form>
        </Box>
      </Modal>
      {/* edit modal end */}
      <Grid container>
        {show.length &&
          show.map((data) => {
            return (
              <div>
                {/* <Link to="/adminQuestions" style={{ textDecoration: "none" }}> */}
                <Grid
                  sm={12}
                  xs={12}
                  md={6}
                  lg={6}
                  xl={4}
                  style={{
                    marginTop: 100,
                    marginLeft: 100,
                    borderRadius: 20,
                  }}
                >
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      position: "relative",
                      marginLeft: "30px",
                      marginTop: "10px",
                      width: 300,
                      borderRadius: "20px",
                      boxShadow:
                        "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                    }}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        cursor: "pointer",
                      }}
                      onClick={() => quizHandler(data.quiz)}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        style={{ fontWeight: "bold" }}
                      >
                        {data.quiz}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                {/* </Link> */}
                <div style={styleOne}>
                  <EditOutlinedIcon
                    onClick={() => getQuizDetails(`${data._id}`)}
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  />
                  <DeleteIcon
                    onClick={() => dltQuiz(`${data._id}`)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                </div>
              </div>
            );
          })}
      </Grid>
    </div>
  );
}

export default Cards;
