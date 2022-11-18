import React, { useEffect, useState } from "react";
import UserSideBar from "../../components/userSideBar/userSideBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "./userHome.css";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import { Link } from "react-router-dom";

const styleOne = {
  width:"100px",
  height:"100px",
  position:"absolute",
  marginLeft:"13rem",
  marginTop:"-1rem"
}

function UserHome() {
  const [category, setCategory] = useState([]);

  const showCategory = () => {
    try {
      axios.get("/api/user/getCategory").then((res) => {
        setCategory(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    showCategory();
  }, []);

  return (
    <div>
      <UserSideBar />

      <div style={{ float: "right", marginRight: "50px", marginTop: 40 }}>
        <Button
          variant="outlined"
          style={{ marginRight: 10, color: "#333", borderColor: "#333" }}
        >
          Outlined
        </Button>
        <Button variant="contained" style={{ backgroundColor: "#333" }}>
          Contained
        </Button>
      </div>
      <div className="cardMove">
        <Grid container>
          {category.length &&
            category.map((data) => {
              return (
                <Grid sm={12} xs={12} md={6} lg={6} xl={4}>
                  <Card
                    sx={{
                      display: "flex",
                      width: "300px",
                      marginLeft: "300px",
                      boxShadow:
                        "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                      marginBottom: "40px",
                      borderRadius: "20px",
                      position:"relative"
                    }}
                  >
                    <img src="../../card_img.png" alt="card-img" style={styleOne} />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h5"
                          style={{ fontWeight: "bold" }}
                        >
                          {data.category}
                        </Typography>
                        <Link
                          to={`/userQuestions/${data.category}`}
                          style={{ textDecoration: "none" }}
                        >
                          <CardActions>
                            <Button size="small">Move to Questions</Button>
                          </CardActions>
                        </Link>
                      </CardContent>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </div>
  );
}

export default UserHome;
