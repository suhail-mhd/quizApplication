import React from "react";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  // marginTop: "10rem",
  marginBottom: "10rem",
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
  backgroundColor: "#f4f4f4",
  color: "#333",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
  width: "50px",
  marginTop: "-50px",
  fontWeight: "bold",
  marginLeft: "2rem",
};

function UserShowResult() {
  return (
    <div>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h4"
          component="h2"
          style={styleOne}
        >
          - Result -
        </Typography>
        <div style={{margin:"60px"}}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:20 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Total Quiz Points:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              44
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:20 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Total Questions:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              3
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:20 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Total Attempts:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              2
            </Typography>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom:20 }}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Total Earn Points:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              34
            </Typography>
          </div>
          <div
            style={{ display: "flex", justifyContent: "space-between", marginBottom:20 }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Total Result:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{fontWeight: "bold"}}
            >
              Passed
            </Typography>
          </div>
        </div>
        <Box
          textAlign="right"
          style={{ marginRight: "2rem", marginTop: "5rem" }}
        >
          <Link to={'/userQuestions'} style={{textDecoration:"none"}}>
         
          <Button
            variant="contained"
            type="submit"
            value="submit"
            style={styleTwo}
            // onClick={quizHandler}
          >
            Restart
          </Button>
          </Link>

          <Link to={'/'} style={{textDecoration:"none"}}>
          <Button
            variant="contained"
            type="submit"
            value="submit"
            style={styleTwo}
            // onClick={quizHandler}
          >
            Finish
          </Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default UserShowResult;
