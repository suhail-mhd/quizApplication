import * as React from "react";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const style = {
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

const styleOne = {
  marginBottom: 20,
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "50px",
  textAlign: "center",
};

const styleTwo = {
  backgroundColor: "#001253",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [quiz, setQuiz] = useState("");
  const navigate = useNavigate();

  const quizHandler = () => {
    try {
      axios
        .post("http://localhost:5000/api/admin/addQuiz", { quiz })
        .then((res) => {
          setQuiz(res.data);
        });
      navigate("/admin");
    } catch (error) {
      console.log("error occurred", error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{ float: "right", marginTop: 80, marginRight: 100 }}
        onClick={handleOpen}
      >
        Add Quiz
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
              Add Quiz
            </Typography>
            <Grid style={{ textAlign: "center" }}>
              <Grid item lg={12}>
                <TextField
                  variant="standard"
                  label="Quiz Name"
                  placeholder="Enter the Name"
                  type="text"
                  name="quiz"
                  onChange={(e) => setQuiz(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                value="submit"
                style={styleTwo}
                onClick={quizHandler}
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
