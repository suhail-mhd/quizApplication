import React, { useState } from "react";
import {
  ProSidebarProvider,
  Menu,
  MenuItem,
  //   SidebarHeader,
  //   SidebarFooter,
  Sidebar,
} from "react-pro-sidebar";
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
import "./userSideBar.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        <ProSidebarProvider collapsed={menuCollapse}>
          <div>
            <div
              className="logotext"
              style={{
                fontSize: "30px",
                padding: "20px",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              <p>{menuCollapse ? "= Q-M =" : "Quiz Master"}</p>
            </div>
            <div
              className="closemenu"
              style={{ marginTop: "-35px", marginRight: 5 }}
              onClick={menuIconClick}
            >
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </div>
          <Sidebar>
            <Menu iconShape="square">
                 <Link
                          to="/"
                          style={{ textDecoration: "none" }}
                        >
              <MenuItem active={true} icon={<FiHome />}>
                Category
              </MenuItem>
              </Link>
              <MenuItem icon={<FaList />}>Type</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
            </Menu>
          </Sidebar>
          <div style={{ marginTop: "350px", borderTop: "1px solid #f4f4f4" }}>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </div>
        </ProSidebarProvider>
      </div>
    </>
  );
};

export default Header;
