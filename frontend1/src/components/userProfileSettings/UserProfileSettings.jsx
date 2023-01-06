import React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";

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
  "Settings",
  "Settings",
  "Settings",
  "Settings",
];

function UserProfileSettings() {
  return (
    <div>
      <Card
        style={{
          position: "relative",
          marginLeft: "33rem",
          marginTop: "-26rem",
          width: 750,
          height: 400,
          borderRadius: "5px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
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
                marginLeft:"1rem"
              }}
            >
              {page}
            </Button>
          ))}
        </Box>
        <Grid container style={{ textAlign: "center" }}>
          <Grid item md={6} xs={12} lg={6} style={{ margin: "20px 0" }}>
            <TextField
              style={{ width: "300px" }}
              variant="outlined"
              label="First Name"
              placeholder="First Name"
              type="text"
              name="firstName"
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
      </Card>
    </div>
  );
}

export default UserProfileSettings;
