import React from "react";
import { useNavigate } from "react-router-dom";
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

const styleTwo = {
  backgroundColor: "#001253",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
  margin: "1rem 17rem",
};

function useUserNoQuestionMsg() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/userCategory");
  };

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
        <h1 style={styleOne}>Sorry..questions is not available..!!</h1>
        <Button
          variant="contained"
          type="submit"
          value="submit"
          style={styleTwo}
          onClick={handleBack}
        >
          Back
        </Button>
      </Box>
    </div>
  );
}

export default useUserNoQuestionMsg;
