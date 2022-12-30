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
import Modal from "@mui/material/Modal";

const styleOne = {
  width: "100px",
  height: "100px",
  position: "absolute",
  marginLeft: "13rem",
  marginTop: "-1rem",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function UserHome() {
  const [category, setCategory] = useState([]);
  const [getCategory, setGetCategory] = useState([]);
  const { setGetQuestion } = useContext(questionContext);
  const navigate = useNavigate();
  const location = useLocation();
  const loc = JSON.parse(localStorage.getItem("userInfo"));
  const [logout, setLogout] = useState(false);
  const [userId, setUserId] = useState();

  // modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  }, [showCategory, logout]);

  //   Logout handling
  const logoutHandle = () => {
    localStorage.removeItem("userInfo");
    setLogout(true);
    navigate("/");
    setOpen(false);
  };

  return (
    <div>
      <UserSideBar />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {loc ? (
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              textAlign="center"
              component="h2"
            >
              Are you sure want to Logout
            </Typography>
            <Box sx={{ justifyContent: "center", display: "flex" }}>
              <Button onClick={logoutHandle}>Yes</Button>
              <Button onClick={() => setOpen(false)}>No</Button>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Modal>
      {loc ? (
        <div>
          <div style={{ float: "right", marginRight: "50px", marginTop: 70 }}>
            <Button
              onClick={handleOpen}
              className="gap-1"
              variant="contained"
              style={{ backgroundColor: "orangered" }}
            >
              <i class="ri-logout-circle-line"></i> Logout
            </Button>
          </div>
          <div>
            <h6
              style={{
                color: "white",
                marginTop: "10px",
                marginLeft: "1rem",
              }}
            >
              {" "}
              Welcome {loc.name}
            </h6>
          </div>
        </div>
      ) : (
        ""
      )}
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
