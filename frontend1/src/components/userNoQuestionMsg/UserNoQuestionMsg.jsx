import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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

const style1 = {
  marginBottom: 20,
  backgroundColor: "#001253",
  color: "#f4f4f4",
  borderTopRightRadius: "10px",
  borderTopLeftRadius: "10px",
  padding: "60px",
  textAlign: "center",
  fontWeight: "bold",
};

const styleOne = {
  fontFamily: "egoe UI",
  marginTop: "8rem",
  marginLeft: "5rem",
};

function useUserNoQuestionMsg() {
  return (
    <div>
      <Box sx={style}>
        <Typography
          id="transition-modal-title"
          variant="h4"
          component="h2"
          style={style1}
        >
          - Questions -
        </Typography>
        <h1 style={styleOne}>Sorry..Questions is not available..!!</h1>
      </Box>
    </div>
  );
}

export default useUserNoQuestionMsg;
