import React, { useState } from "react";
import styled from "styled-components";
import { FaHouseChimney } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { PiNotePencilFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 375px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  border-radius: 16px 16px 0px 0px;
  background: var(--White, #fcfffe);
  box-shadow: 0px -2px 4px 0px rgba(57, 84, 111, 0.1);
  position: fixed;
  bottom: 0;
`;

const Icon = styled.div`
  /* background-color: ${(props) => (props.active ? "#fff" : "transparent")}; */
  width: 24px;
  height: 24px;
  color: ${(props) => (props.active ? "#2aa663" : "#7c8188")};
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #fff;
    color: #2aa663;
  }

  > a {
    > svg {
      width: 20px;
      height: 20px;
    }

    .writeImg {
      width: 23px;
      height: 23px;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  > span {
    position: absolute;
    font-family: "SUITLight";
    font-size: 10px;
    width: 30px;
    top: 23px;
    text-align: center;
  }
`;

function MobMenuBarComponent({ menu }) {
  const [activeIcon, setActiveIcon] = useState(menu);
  const handleIconClick = (icon) => {
    setActiveIcon(icon);
  };
  return (
    <Wrapper>
      <Icon
        active={activeIcon === "home"}
        onClick={() => handleIconClick("home")}
      >
        <StyledLink to="/ssobbi">
          <FaHouseChimney />
          <span style={{ left: "-5px" }}>홈</span>
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "note"}
        onClick={() => handleIconClick("note")}
      >
        <StyledLink to="/ssobbi/create">
          <PiNotePencilFill style={{ width: "23px", height: "23px" }} />
          <span style={{ left: "-3px" }}>기록</span>
        </StyledLink>
      </Icon>
      <Icon
        active={activeIcon === "calendar"}
        onClick={() => handleIconClick("calendar")}
      >
        <StyledLink to="/ssobbi/calender">
          <FaRegCalendarCheck />
          <span style={{ left: "-5px" }}>캘린더</span>
        </StyledLink>
      </Icon>
      <Icon
        style={{ fontSize: "24px" }}
        active={activeIcon === "profile"}
        onClick={() => handleIconClick("profile")}
      >
        <StyledLink to="/ssobbi/mypage">
          <IoPersonCircleOutline style={{ width: "24px", height: "24px" }} />
          <span style={{ left: "-1px" }}>내정보</span>
        </StyledLink>
      </Icon>
    </Wrapper>
  );
}

export default MobMenuBarComponent;
