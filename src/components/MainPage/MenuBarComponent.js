import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserTokenState } from "../../store/atom";
import styled from "styled-components";
import { FaHouseChimney } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { PiNotePencilFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

const Menu = styled.div`
  background-color: ${(props) => props.theme.colors.COLOR70};
  width: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 20px 20px 0 0;
  margin-top: 80px;
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
  margin-top: 21px;
  margin-bottom: 21px;
  font-size: 20px;
  width: 60px;
  margin-left: 18px;
  padding-left: -20px;
  padding-right: 18px;
  height: 50px;
  border-radius: 48% 0px 0px 48%;
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.COLOR80 : "#fff")};
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: ${(props) => props.theme.colors.COLOR80};
  }
`;

const MenuBarComponent = ({ menu }) => {
  const [activeIcon, setActiveIcon] = useState(menu);
  const setUserToken = useSetRecoilState(UserTokenState);

  const logoutClickHandler = () => {
    setUserToken(null);
    setUserToken({ isLoggedIn: false });
    handleIconClick("logout");
  };
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  return (
    <Menu>
      <Icon
        active={activeIcon === "home"}
        onClick={() => handleIconClick("home")}
        style={{ marginTop: "100px" }}
      >
        <StyledLink to="/ssobbi">
          <FaHouseChimney />
        </StyledLink>
      </Icon>
      <Icon
        style={{ fontSize: "24px" }}
        active={activeIcon === "profile"}
        onClick={() => handleIconClick("profile")}
      >
        <StyledLink to="/ssobbi/income">
          <IoPersonCircleOutline />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "calendar"}
        onClick={() => handleIconClick("calendar")}
      >
        <StyledLink to="/ssobbi/calender">
          <FaRegCalendarCheck />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "target"}
        onClick={() => handleIconClick("target")}
      >
        <StyledLink to="/ssobbi">
          <TbTargetArrow />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "note"}
        onClick={() => handleIconClick("note")}
      >
        <StyledLink to="/ssobbi/create">
          <PiNotePencilFill />
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "logout"}
        onClick={logoutClickHandler}
        style={{ marginTop: "auto", marginBottom: "60px" }}
      >
        <StyledLink to="/">
          <IoLogOutOutline />
        </StyledLink>
      </Icon>
    </Menu>
  );
};

export default MenuBarComponent;
