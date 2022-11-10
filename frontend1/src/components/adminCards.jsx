import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

function Cards() {
  const [show, setShow] = useState([]);

  const quizShow = () => {
    try {
      axios.get("http://localhost:5000/api/admin/getQuiz").then((res) => {
        setShow(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    quizShow();
  }, [quizShow]);

  return (
    <div>
      <Grid container>
      {show.length &&
        show.map((data) => {
          return (
            <Link
                  to="/adminQuestions"
                  style={{ textDecoration: "none" }}
                >
              <Grid
                sm={12} xs={12} md={6} lg={6} xl={4}
                style={{ marginTop: 100, marginLeft: 100, borderRadius: 20 }}
              >
                  <Card
                    sx={{ maxWidth: 345 }}
                    style={{
                      marginLeft: "30px",
                      marginTop: "10px",
                      width: 300,
                    }}
                  >
                    <CardContent>
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
          );
        })}
      </Grid>
    </div>
  );
}

export default Cards;
