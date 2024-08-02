import React from "react";
import styled from "styled-components";
import LogoImg from "../imgs/Logo.png";
import { Horizontal, Vertical } from "../styles/CommunalStyle";
import SliderComponent from "../components/LandingPage/SliderComponent";
import Block1Component from "../components/LandingPage/Block1Component";
import Block2Component from "../components/LandingPage/Block2Component";
import Footer from "./Web/Footer";

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
  const handleMoveBox = () => {
    console.log("클릭함 이동버튼");
    const element = document.getElementById("block2");
    console.log(element, "클릭함 이동버튼");
    if (element) {
      console.log("클릭함 이동버튼!!!");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };

  return (
    <Vertical
      style={{
        width: "100%",
      }}
    >
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
          <a href="/ssobbi">
            <Logo src={LogoImg} />
          </a>
          <a href="/ssobbi" style={{ textDecoration: "none" }}>
            <Title>SSOBBI</Title>
          </a>
        </Horizontal>
        <LogIn onClick={handleLoginClick}>카카오톡 로그인</LogIn>
      </Horizontal>
      <SliderComponent onMoveBox={handleMoveBox} />
      <Block1Component />
      <Block2Component id={"block2"} />
      <Footer />
    </Vertical>
  );
};

export default LandingPage;
