// src/components/SideBar.js
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/TopBar";
import {
  Code,
  AccountCircle,
  // Settings,
  Logout,
} from "@styled-icons/material-rounded";
import {
  COGNITO_APP_URL,
  COGNITO_CLIENT_ID,
  COGNITO_REDIRECT_URI,
  REFINER_MEDIA_URL,
} from "../Constants";
const SideBarContainer = styled.div`
  color: white;
  width: 15%;
  padding: 50px 20px;
  text-align: left;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-left: 50px;
  &:hover {
    background-color: #444;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const SideBar = () => {
  const navigate = useNavigate();

  const handleMenuItemClick = (route) => {
    navigate(route);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    const url = `${COGNITO_APP_URL}/logout?client_id=${COGNITO_CLIENT_ID}&redirect_uri=${COGNITO_REDIRECT_URI}&response_type=code`;
    window.location.href = url;
  };
  return (
    <SideBarContainer>
      <MenuItem home onClick={() => handleMenuItemClick("/")}>
        <Code size="20px" /> &nbsp; API
      </MenuItem>
      <MenuItem onClick={() => handleMenuItemClick("/account")}>
        <AccountCircle size="20px" /> &nbsp; Account
      </MenuItem>
      {/* <MenuItem onClick={() => handleMenuItemClick("/settings")}>
        <Settings size="20px" /> &nbsp; Settings
      </MenuItem> */}
      <Spacer></Spacer>
      <MenuItem onClick={() => logout()}>
        <Logout size="20px" />
        &nbsp; Logout
      </MenuItem>
    </SideBarContainer>
  );
};

export default SideBar;
