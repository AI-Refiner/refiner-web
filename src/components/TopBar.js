// src/components/TopBar.js
import React, { useState } from "react";
import styled from "styled-components";
import { Github } from "@styled-icons/boxicons-logos";
import { Flex, Box } from "../components/BaseStyles";
import { REFINER_MEDIA_URL, REFINER_GITHUB_URL } from "../Constants";
import { useNavigate } from "react-router-dom";

const TopBarContainer = styled.div`
  width: 100%;
  height: 70px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  z-index: 3;
`;

export const Logo = styled.img`
  height: 32px;
  margin: 20px;
  cursor: pointer;
  border-radius: 25px;
  &:hover {
    opacity: 0.8;
  }
`;

const Hover = styled.div`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const TopBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const logoClick = () => {
    navigate("/");
  };

  const githubClick = () => {
    window.open(REFINER_GITHUB_URL, "_blank");
  };

  return (
    <TopBarContainer>
      <Flex align="center" justify="space-between" padding="0px 0px 0px 50px">
        <Logo
          size="22px"
          src={`${REFINER_MEDIA_URL}/geometric-white.png`}
          onClick={logoClick}
        />
        <Flex align="center" justify="space-between" margin="20px 40px 20px">
          <Hover>
            <Github size="28px" onClick={githubClick} />
          </Hover>
          <Box height="100%" fontSize="14px"></Box>
        </Flex>
      </Flex>
    </TopBarContainer>
  );
};

export default TopBar;
