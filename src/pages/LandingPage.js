import React from "react";
import styled from "styled-components";
import LogoImg from "../imgs/Logo.png";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
} from "../styles/CommunalStyle";
import SliderComponent from "../components/LandingPage/SliderComponent";
import Block1Component from "../components/LandingPage/Block1Component";
import Block2Component from "../components/LandingPage/Block2Component";
import Footer from "./Footer";

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 5px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;
const LogIn = styled.button`
  color: ${(props) => props.theme.colors.COLORDark};
  font-family: "SUITLight";
  font-size: 18px;
  border: none;
  background-color: white;
  margin-right: 100px;
  width: 200px;
  margin-top: 15px;
  cursor: pointer;
`;

const LandingPage = () => {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };

  return (
    <Vertical>
      <Horizontal
        style={{
          width: "100%",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <Horizontal
          style={{
            width: "100%",
            justifyContent: "flex-start",
            marginLeft: "100px",
          }}
        >
          <Logo src={LogoImg} />
          <Title>SSOBBI</Title>
        </Horizontal>
        <LogIn onClick={handleLoginClick}>카카오톡 로그인</LogIn>
      </Horizontal>
      <SliderComponent />
      <Block1Component />
      <Block2Component />
      <Footer />
    </Vertical>
  );
};

export default LandingPage;
