import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import Avatar from "../../images/ava-3.jpg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

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

function UserProfileDetails() {
  return (
    <div>
      <Card
        sx={{ maxWidth: 345 }}
        style={{
          position: "relative",
          marginLeft: "15rem",
          marginTop: "-3.5rem",
          width: 250,
          height: 400,
          borderRadius: "5px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
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
            John
          </Typography>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            style={{ fontSize: "14px", marginTop: "-7px", color: "#858585" }}
          >
            Wick
          </Typography>
        </CardContent>
        <CardContent>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #94B49F",
                pointerEvents: 'none',
                borderTop: "1px solid #94B49F",
              }}
            >
              <ListItemText primary="Opportunities applied" />
              <ListItemText
                primary="32"
                style={{ color: "#205295", fontWeight: "bold", textAlign:"right" }}
              />
            </ListItemButton>
            <ListItemButton
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #94B49F",
                pointerEvents: 'none',
              }}
            >
              <ListItemText primary="Opportunities Won" />
              <ListItemText
                primary="12"
                style={{ color: "#54B435", fontWeight: "bold", textAlign:"right" }}
              />
            </ListItemButton>
            <ListItemButton
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #94B49F",
                pointerEvents: 'none',
              }}
            >
              <ListItemText primary="Current" />
              <ListItemText
                primary="3"
                style={{ color: "#858585", fontWeight: "bold", textAlign:"right" }}
              />
            </ListItemButton>
          </List>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserProfileDetails;
