import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import LogoImg from "../../imgs/Logo.png";

const Menu = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Horizontal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: "SUITLight";
`;

const Logo = styled.img`
  width: 30;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const Li = styled.li`
  list-style: none;
  border-bottom: 1px gray solid;
  margin-top: 10px;
`;

const Icon = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`;

const DropDownComponent = () => {
  const [view, setView] = useState(false);
  return (
    <>
      <Menu>
        <ul
          onClick={() => {
            setView(!view);
          }}
          style={{ marginTop: 0 }}
        >
          <Horizontal>
            <Logo src={LogoImg} />
            이한나 <Icon>{view ? <SlArrowUp /> : <SlArrowDown />}</Icon>
          </Horizontal>
          {view && (
            <>
              <Li>
                <Link to="/">마이페이지</Link>
              </Li>
              <Li>
                <Link to="/">로그아웃</Link>
              </Li>
            </>
          )}
        </ul>
      </Menu>
    </>
  );
};

export default DropDownComponent;
