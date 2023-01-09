import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Avatar from "../../images/ava-3.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  width: "100px",
  height: "100px",
  borderRadius: "100%",
};

const style1 = {
  backgroundColor: "orange",
  padding: "4px",
  borderRadius: "50%",
  position: "absolute",
  marginTop: "4.5rem",
  marginLeft: "-1.5rem",
  color: "#f4f4f4",
  cursor: "pointer",
};

const styleThree = {
  backgroundColor: "orange",
  borderRadius: "20px",
  marginTop: 25,
  paddingLeft: "50px",
  paddingRight: "50px",
  textTransform: "none",
};

const pages = [
  "Account Settings",
  "Company Settings",
  "Notification",
  "Settings",
];

function UserProfileDetails() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [render, setRender] = useState(0);
  const [userDataValue, setUserDataValue] = useState({});
  const [updateRes, setUpdateRes] = useState();
  const [snackOpen, snackClose] = useState(false);
  const userId = useParams();

  // snackbar
  const SnackClose = () => {
    snackClose(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={SnackClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const userData = () => {
    try {
      axios.get(`/api/user/getUserData/${userId.id}`).then((res) => {
        setUserDataValue(res.data.user);
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const userDataSubmit = (e) => {
    e.preventDefault();

    try {
      axios
        .patch(`/api/user/userUpdate/${userId.id}`, {
          firstName,
          lastName,
          email,
          phone,
        })
        .then((res) => {
          setUpdateRes(res.data.message);
          snackClose(true);
        });
      setRender(render + 1);
    } catch (error) {
      snackClose(false);
      console.log("Error occurred while data updating", error);
    }
  };

  useEffect(() => {
    userData();
  }, [render]);

  return (
    <div>
      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={snackClose}
        message={updateRes}
        action={action}
      />
      <Grid container style={{ marginTop: "-3.5rem" }}>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <Card
            sx={{ maxWidth: 345 }}
            style={{
              position: "relative",
              marginLeft: "15rem",
              marginBottom: "2rem",
              width: 250,
              height: 400,
              borderRadius: "5px",
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              padding: "10px 0",
            }}
          >
            <CardContent style={{ textAlign: "center" }}>
              <div>
                <img src={Avatar} alt="profile_pic" style={style} />
                <CameraAltIcon fontSize="" style={style1} />
              </div>
              <Typography
                gutterBottom
                variant="h6"
                component="p"
                style={{ fontWeight: "bold" }}
              >
                {userDataValue.firstName}
              </Typography>
              <Typography
                gutterBottom
                variant="p"
                component="div"
                style={{
                  fontSize: "14px",
                  marginTop: "-7px",
                  color: "#858585",
                }}
              >
                {userDataValue.lastName}
              </Typography>
            </CardContent>
            <CardContent>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <ListItemButton
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #94B49F",
                    pointerEvents: "none",
                    borderTop: "1px solid #94B49F",
                  }}
                >
                  <ListItemText primary="Opportunities applied" />
                  <ListItemText
                    primary="32"
                    style={{
                      color: "#205295",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #94B49F",
                    pointerEvents: "none",
                  }}
                >
                  <ListItemText primary="Opportunities Won" />
                  <ListItemText
                    primary="12"
                    style={{
                      color: "#54B435",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  />
                </ListItemButton>
                <ListItemButton
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #94B49F",
                    pointerEvents: "none",
                  }}
                >
                  <ListItemText primary="Current" />
                  <ListItemText
                    primary="3"
                    style={{
                      color: "#858585",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  />
                </ListItemButton>
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} lg={6} md={6}>
          <Card
            style={{
              position: "relative",
              marginLeft: "-8rem",
              marginBottom: "2rem",
              width: 750,
              height: 400,
              borderRadius: "5px",
              boxShadow:
                "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
              padding: "10px 0",
            }}
          >
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
              style={{ borderBottom: "1px solid #94B49F" }}
            >
              {pages.map((page) => (
                <Button
                  key={page}
                  // onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                  style={{
                    color: "#858585",
                    marginTop: "-1rem",
                    paddingTop: "1rem",
                    paddingBottom: 0,
                    textTransform: "none",
                    marginLeft: "1rem",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <form onSubmit={userDataSubmit}>
              <Grid container style={{ textAlign: "center" }}>
                <Grid item md={6} xs={12} lg={6} style={{ margin: "20px 0" }}>
                  <TextField
                    style={{ width: "300px" }}
                    variant="outlined"
                    label="First Name"
                    placeholder="First Name"
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} style={{ margin: "20px 0" }}>
                  <TextField
                    style={{ width: "300px" }}
                    variant="outlined"
                    label="Last Name"
                    placeholder="Last Name"
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} style={{ margin: "20px 0" }}>
                  <TextField
                    style={{ width: "300px" }}
                    variant="outlined"
                    label="Email"
                    placeholder="Email"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item md={6} xs={12} lg={6} style={{ margin: "20px 0" }}>
                  <TextField
                    style={{ width: "300px" }}
                    variant="outlined"
                    label="Phone"
                    placeholder="Phone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Box style={{ marginLeft: "2rem" }}>
                <Button
                  variant="contained"
                  type="submit"
                  value="submit"
                  style={styleThree}
                  // onClick={questionHandler}
                >
                  Update
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserProfileDetails;
