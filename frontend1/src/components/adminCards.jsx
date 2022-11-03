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
  }, []);

  return (
    <div>
      {show.length &&
        show.map((data) => {
          return (
            <Grid
            item xl={3} lg={4} md={4} sm={6} xs={12}
              style={{ marginTop: 100, marginLeft: 100, borderRadius: 20 }}
            >
            <Link to='/admin/adminQuestions' style={{textDecoration:"none"}}>
              <Card
                sx={{ maxWidth: 345 }}
                style={{ marginLeft: "30px", marginTop: "10px", width: 300 }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" style={{fontWeight:"bold"}}>
                    {data.quiz}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          );
        })}
    </div>
  );
}

export default Cards;
