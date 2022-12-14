import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { resetAllAction } from "../../redux/question_reducer";
import { resetResultAction } from "../../redux/result_reducer";
import { resultContext } from "../../contextApi/resultContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 655,
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

function UserShowResult() {
  const dispatch = useDispatch();
  const { result } = useContext(resultContext);
  const navigate = useNavigate()

  const resetHandler = (quiz) => {
    navigate("/userQuestions", { state: { name: quiz } });
  };

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
        <div style={{ margin: "60px", textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Total Questions:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              {result.totalQuestions}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Total Quiz Point:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              {result.totalQuizPoints}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Total Earn Points:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold", marginTop: "1rem" }}
            >
              {result.score}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{ fontWeight: "bold" }}
            >
              Quiz Result:
            </Typography>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              style={{
                fontWeight: "bold",
                marginTop: "1rem",
                color: `${result.flag ? "green" : "Red"}`,
              }}
            >
              {result.flag ? "Passed" : "Failed"}
            </Typography>
          </div>
        </div>
        <Box textAlign="right" style={{ marginRight: "2rem" }}>
            {/* <Button
              variant="contained"
              type="submit"
              value="submit"
              style={styleTwo}
              onClick={() => resetHandler(result?.type)}
            >
              Restart
            </Button> */}

          <Link to={"/"} style={{ textDecoration: "none" }}>
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
