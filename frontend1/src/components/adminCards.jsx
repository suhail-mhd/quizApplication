import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
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

function Cards() {
  const [show, setShow] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [render, setRender] = useState(false);

  const quizShow = () => {
    try {
      axios.get("http://localhost:5000/api/admin/getQuiz").then((res) => {
        setShow(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // delete quiz handle
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dltQuiz = (id) => {
    console.log(id);
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
      <Grid container>
        {show.length &&
          show.map((data) => {
            return (
              <div>
                <Link to="/adminQuestions" style={{ textDecoration: "none" }}>
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
                        }}
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
                </Link>
                <div style={styleOne}>
                  <EditOutlinedIcon
                    // onClick={() => getQuestionDetails(`${data._id}`)}
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
