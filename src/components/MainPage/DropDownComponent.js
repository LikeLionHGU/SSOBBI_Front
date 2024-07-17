import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../imgs/Logo.png";

const Menu = styled.div`
  background-color: aliceblue;
  width: 200px;
`;

const Logo = styled.img`
  width: 30;
  height: 30px;
  border-radius: 50%;
`;

const Li = styled.li`
  list-style: none;
`;

const DropDownComponent = () => {
  const [view, setView] = useState(false);
  return (
    <Menu>
      <ul
        onClick={() => {
          setView(!view);
        }}
      >
        <Logo src={LogoImg} />
        이한나 {view ? "⌃" : "⌄"}
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
  );
};

export default DropDownComponent;
