import React, { useState, useEffect } from "react";
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
  width: 400,
  height: 450,
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
  const handleOpen = () => {
    setOpen(true);
    setErrorMsg(null);
    setCategory(null);
  };
  const handleClose = () => setOpen(false);
  const [quiz, setQuiz] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [category, setCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const quizHandler = () => {
    if (quiz.length == 0) {
      setError(true);
    } else {
      try {
        axios
          .post("/api/admin/addQuiz", { quiz, category })
          .then((res) => {
            setQuiz(res.data);
          })
          .catch((err) => {
            setErrorMsg(err.response.data);
            setOpen(true);
          });
        handleClose();
      } catch (error) {
        console.log("error occurred", error);
      }
    }
  };

  const handleChange3 = (event) => {
    event.preventDefault();
    setCategory(event.target.value);
  };

  const getCategory = () => {
    try {
      axios.get("/api/admin/getCategory").then((res) => {
        setCategoryList(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

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
            {error && quiz.length <= 0 ? (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Please fill in the field
              </p>
            ) : (
              ""
            )}
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
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
            <div style={{ textAlign: "center" }}>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-customized-select-native">
                  Category
                </InputLabel>
                <NativeSelect
                  id="demo-customized-select-native"
                  value={category}
                  onChange={handleChange3}
                  label="type"
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
                  }}
                >
                  Please fill in the field
                </p>
              ) : (
                ""
              )}
            </div>
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
