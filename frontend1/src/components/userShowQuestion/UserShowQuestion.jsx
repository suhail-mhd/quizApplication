import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: "100%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 24,
  marginTop:"10rem",
  marginBottom:"10rem",
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

function UserShowQuestion() {
  const [show, setShow] = useState([]);
  const [checked, setCheck] = useState(null);

  const questionShow = () => {
    try {
      axios.get("/api/user/getQuestion").then((res) => {
        // console.log(res.data.data);
        setShow(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onSelect = () => {
    // setCheck(true)
    console.log("options change");
  };

  useEffect(() => {
    questionShow();
  }, []);

  return (
    <div>
      <Box sx={style}>
      <Typography
          id="transition-modal-title"
          variant="h4"
          component="h2"
          style={styleOne}
        >
       - Questions -
        </Typography>
       {show.length && show.map((data, i) => {
        return(
         <>
          <Typography
          id="transition-modal-title"
          variant="h5"
          component="h2"
          style={{marginLeft:40, fontWeight:"bold", marginTop:60}}
        >
         {i+1}. {data.question}
        </Typography>
        <Grid container style={{ justifyContent: "center", marginTop: "2rem" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value={false}
                  control={<Radio />}
                  label={data.option1}
                  onChange={onSelect}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value="options"
                  control={<Radio />}
                  label={data.option2}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value="options"
                  control={<Radio />}
                  label={data.option3}
                />
              </Grid>
              <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                <FormControlLabel
                  value="options"
                  control={<Radio />}
                  label={data.option4}
                />
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
         </>
        )
       })}
        <Box
          textAlign="right"
          style={{ marginRight: "2rem", marginTop: "5rem" }}
        >
          <Button
            variant="contained"
            type="submit"
            value="submit"
            style={styleTwo}
            // onClick={quizHandler}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default UserShowQuestion;
