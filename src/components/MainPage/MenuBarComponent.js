import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHouseChimney } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { PiNotePencilFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

const Menu = styled.div`
  background-color: ${(props) => props.theme.colors.COLOR70};
  width: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  border-radius: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  font-size: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50% 0px 0px 50%;
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.COLOR70 : "inherit")};
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: ${(props) => props.theme.colors.COLOR70};
  }
`;

const MenuBarComponent = () => {
  const [activeIcon, setActiveIcon] = useState(null);
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  return (
    <Menu>
      <Icon
        active={activeIcon === "home"}
        onClick={() => handleIconClick("home")}
        style={{ marginTop: "60px" }}
      >
        <StyledLink href="/">
          <FaHouseChimney />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "profile"}
        onClick={() => handleIconClick("profile")}
      >
        <StyledLink href="/">
          <IoPersonCircleOutline />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "calendar"}
        onClick={() => handleIconClick("calendar")}
      >
        <StyledLink href="/">
          <FaRegCalendarCheck />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "target"}
        onClick={() => handleIconClick("target")}
      >
        <StyledLink href="/">
          <TbTargetArrow />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "note"}
        onClick={() => handleIconClick("note")}
      >
        <StyledLink href="/">
          <PiNotePencilFill />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "logout"}
        onClick={() => handleIconClick("logout")}
        style={{ marginTop: "auto" }}
      >
        <StyledLink href="/">
          <IoLogOutOutline />
        </StyledLink>
      </Icon>
    </Menu>
  );
};

export default MenuBarComponent;
