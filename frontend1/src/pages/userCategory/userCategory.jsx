import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserSideBar from "../../components/userSideBar/userSideBar";
import { questionContext } from "../../contextApi/questionContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import axios from "axios";
import "./userCategory.css";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";

const styleOne = {
  width: "100px",
  height: "100px",
  position: "absolute",
  marginLeft: "13rem",
  marginTop: "-1rem",
};

function UserCategory() {
  const [categoryType, setCategoryType] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const { setGetQuestion } = useContext(questionContext);
  const navigate = useNavigate();
  const location = useLocation()

  const quiz = location.state?.name;


  const showCategory = () => {
    try {
      axios.get("/api/user/getCategory").then((res) => {
        setCategoryType(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  for (let i = 0; i < categoryType.length; i++) {
    let type = categoryType[i].type;
    if(quiz === type) {
      var types = type
    }
  }
  

  const renderCategory = (types) => {
    axios.get(`/api/user/getAllCategories/${types}`).then((res) => {
      setGetCategory(res.data);
    })
  }

  const toQuestions = (category) => {
    try {
      axios.post("/api/user/catNav", { category }).then((res) => {
        setGetQuestion(res.data.qCat);
      });
      navigate("/userQuestions", { state: { name: category } });
    } catch (error) {
      console.log(error);
    }
  };

  const backHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    showCategory();
    renderCategory(`${types}`)
  }, [renderCategory]);

  return (
    <div>
      <UserSideBar />

      <div style={{ float: "right", marginRight: "50px", marginTop: 70 }}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#333" }}
          onClick={backHandler}
        >
          Back
        </Button>
      </div>
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
          {getCategory?.length &&
            getCategory?.map((data) => {
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
                    }}
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
                          variant="h5"
                          style={{ fontWeight: "bold" }}
                        >
                          {data?.category}
                        </Typography>
                        <CardActions>
                          <Button
                            onClick={() => toQuestions(data?.category)}
                            size="small"
                          >
                            Move to Questions
                          </Button>
                        </CardActions>
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

export default UserCategory;
