import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaHouseChimney } from "react-icons/fa6";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TbTargetArrow } from "react-icons/tb";
import { PiNotePencilFill } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";

const Menu = styled.div`
  background-color: aliceblue;
  width: 150px;
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
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 20px;
`;

const MenuBarComponent = () => {
  return (
    <Menu>
      <Icon style={{ marginTop: "60px" }}>
        <StyledLink to="/">
          <FaHouseChimney />
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink to="/">
          <IoPersonCircleOutline />
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink to="/">
          <FaRegCalendarCheck />
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink to="/">
          <TbTargetArrow />
        </StyledLink>
      </Icon>
      <Icon>
        <StyledLink to="/">
          <PiNotePencilFill />
        </StyledLink>
      </Icon>
      <Icon style={{ marginTop: "auto" }}>
        <StyledLink to="/">
          <IoLogOutOutline />
        </StyledLink>
      </Icon>
    </Menu>
  );
};

export default MenuBarComponent;
