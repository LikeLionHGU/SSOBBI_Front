import React from "react";
import styled, { css } from "styled-components";
import { UserTokenState, tokenState } from "../../store/atom";
import { useSetRecoilState } from "recoil";
import useDetectClose from "../hooks/useDetectClose";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import LogoImg from "../../imgs/Logo.png";

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
  width: 250px;
  cursor: pointer;
`;

const Menu = styled.div`
  position: absolute;
  top: 40px;
  left: 50%;
  width: 130px;
  text-align: center;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
const Icon = styled.div`
  margin-left: 10px;
  margin-top: 5px;
`;
const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: black;
`;

const DropDownComponent = () => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const setUserToken = useSetRecoilState(UserTokenState);
  const setToken = useSetRecoilState(tokenState);

  const logoutClickHandler = () => {
    localStorage.removeItem("recoil-persist");
    setUserToken(null);
    setToken(null);
    setUserToken({ isLoggedIn: false });
  };

  return (
    <DropdownContainer>
      <Horizontal onClick={myPageHandler} ref={myPageRef}>
        <Logo src={LogoImg} />
        이한나 <Icon>{myPageIsOpen ? <SlArrowUp /> : <SlArrowDown />}</Icon>
      </Horizontal>
      <Menu isDropped={myPageIsOpen}>
        <Ul>
          <Li>
            <LinkWrapper href="/ssobbi/income">마이페이지</LinkWrapper>
          </Li>
          <Li onClick={logoutClickHandler}>
            <LinkWrapper href="/">로그아웃</LinkWrapper>
          </Li>
        </Ul>
      </Menu>
    </DropdownContainer>
  );
};

export default DropDownComponent;
