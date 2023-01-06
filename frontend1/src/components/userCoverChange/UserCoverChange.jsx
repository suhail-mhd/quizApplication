import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Typography } from "@mui/material";
import Cover from "../../images/coverPage.webp";

const style = {
  width: "100%",
  height: "230px",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const style1 = {
  backgroundColor: "#C58940",
  float: "right",
  marginTop: "-13.5rem",
  marginLeft: "72rem",
  padding: "5px",
  color: "#f4f4f4",
  borderRadius: "5px",
  display: "flex",
  cursor: "pointer",
  position: "absolute",
};

function UserCoverChange() {
  return (
    <>
      <div>
        <img src={Cover} alt="cover" style={style} />
        <div
          style={style1}
          //   onClick={backHandler}
        >
          <CameraAltIcon fontSize="" style={{ marginTop: "4px" }} />
          <Typography
            style={{ fontSize: "13px", marginLeft: "10px", marginTop: "3px" }}
          >
            Change Cover
          </Typography>
        </div>
      </div>
    </>
  );
}

export default UserCoverChange;
