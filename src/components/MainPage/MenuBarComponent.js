import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserTokenState, tokenState } from "../../store/atom";
import styled from "styled-components";
import { FaHouseChimney } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { PiNotePencilFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

const Menu = styled.div`
  background-color: ${(props) => props.theme.colors.COLOR70};
  width: 95px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  border-radius: 20px 20px 0 0;
  margin-top: 80px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const MenuText = styled.p`
  font-size: 12px;
  color: ${(props) => (props.active ? props.theme.colors.COLOR80 : "#fff")};
  margin: 0;
  margin-top: 8px;
  font-family: "SUITLight";
`;

const Icon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 20px;
  width: 60px;
  margin-left: 2px;
  padding-left: 5px;
  padding-right: 5px;
  height: 65px;
  border-radius: 0px 15px 15px 15px;
  background-color: ${(props) => (props.active ? "#fff" : "transparent")};
  color: ${(props) => (props.active ? props.theme.colors.COLOR80 : "#fff")};
  cursor: pointer;
  &:hover {
    background-color: #fff;
    color: ${(props) => props.theme.colors.COLOR80};

    ${MenuText} {
      color: ${(props) => props.theme.colors.COLOR80};
    }
  }
`;

const MenuBarComponent = ({ menu }) => {
  const [activeIcon, setActiveIcon] = useState(menu);
  const setUserToken = useSetRecoilState(UserTokenState);
  const setToken = useSetRecoilState(tokenState);

  const logoutClickHandler = () => {
    localStorage.removeItem("recoil-persist");
    setUserToken(null);
    setToken(null);
    setUserToken({ isLoggedIn: false });
    handleIconClick("logout");
  };
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  return (
    <Menu>
      <StyledLink to="/ssobbi">
        <Icon
          active={activeIcon === "home"}
          onClick={() => handleIconClick("home")}
          style={{ marginTop: "100px" }}
        >
          <FaHouseChimney />
          <MenuText active={activeIcon === "home"}>메인</MenuText>
        </Icon>
      </StyledLink>
      <StyledLink to="/ssobbi/mypage">
        <Icon
          style={{ fontSize: "24px" }}
          active={activeIcon === "profile"}
          onClick={() => handleIconClick("profile")}
        >
          <IoPersonCircleOutline />
          <MenuText active={activeIcon === "profile"}>내정보</MenuText>
        </Icon>
      </StyledLink>
      <StyledLink to="/ssobbi/calender">
        <Icon
          active={activeIcon === "calendar"}
          onClick={() => handleIconClick("calendar")}
        >
          <FaRegCalendarCheck />
          <MenuText active={activeIcon === "calendar"}>캘린더</MenuText>
        </Icon>
      </StyledLink>
      <StyledLink to="/ssobbi/create">
        <Icon
          active={activeIcon === "note"}
          onClick={() => handleIconClick("note")}
        >
          <PiNotePencilFill />
          <MenuText active={activeIcon === "note"}>기록</MenuText>
        </Icon>
      </StyledLink>
      <StyledLink to="/" style={{ marginTop: "auto", marginBottom: "60px" }}>
        <Icon active={activeIcon === "logout"} onClick={logoutClickHandler}>
          <IoLogOutOutline />
        </Icon>
      </StyledLink>
    </Menu>
  );
};

export default MenuBarComponent;
