import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserSideBar from "../../components/userSideBar/userSideBar";
import { questionContext } from "../../contextApi/questionContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "./userHome.css";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import UserAppBar from "../../components/userAppBar/UserAppBar";

const styleOne = {
  width: "100px",
  height: "100px",
  position: "absolute",
  marginLeft: "13rem",
  marginTop: "-1rem",
};

function UserHome() {
  const [category, setCategory] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const { setGetQuestion } = useContext(questionContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [userId, setUserId] = useState();



  const showCategory = () => {
    try {
      axios.get("/api/user/getCategory").then((res) => {
        setCategory(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const categoryHandle = (category) => {
    navigate("/userQuiz", { state: { name: category } });
  };

  useEffect(() => {
    showCategory();
  }, [showCategory]);



  return (
    <div>
      <UserSideBar />
      <UserAppBar/>
      <div className="cardMove">
        <Typography
          variant="h4"
          component="h6"
          textAlign="center"
          fontFamily="egoe UI"
          fontWeight={"bold"}
          style={{ marginLeft: "-30rem", marginBottom: "2em" }}
        >
          - Categories -
        </Typography>
        <Grid container>
          {category?.length &&
            category?.map((data) => {
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
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => categoryHandle(data?.category)}
                  >
                    <img
                      src="../../card_img.png"
                      alt="card-img"
                      style={styleOne}
                    />
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Typography
                          component="div"
                          variant="h6"
                          style={{ fontWeight: "bold" }}
                        >
                          {data?.category}
                        </Typography>
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
