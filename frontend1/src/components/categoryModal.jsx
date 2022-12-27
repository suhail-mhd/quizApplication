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

const styleThree = {
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
  const [category, setCategory] = useState("");
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const categoryHandler = () => {
    if (category.length == 0) {
      setError(true);
    }

    try {
      axios.post("/api/admin/addCategory", { category }).then((res) => {
        setCategory(res.data);
      });
      handleClose();
    } catch (error) {
      console.log("error occurred", error);
      setError(false);
      setErrorMsg("Cannot use the existed Category");
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        style={{
          float: "right",
          marginTop: 100,
          marginRight: 100,
          marginBottom: "2rem",
        }}
        onClick={handleOpen}
      >
        Add Category
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
              Add Category
            </Typography>
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
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            <Grid style={{ textAlign: "center" }}>
              <Grid item lg={12}>
                <TextField
                  variant="standard"
                  label="Category Name"
                  placeholder="Enter the Category"
                  type="text"
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
            </Grid>
            <Box textAlign="center">
              <Button
                variant="contained"
                type="submit"
                value="submit"
                style={styleThree}
                onClick={categoryHandler}
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
