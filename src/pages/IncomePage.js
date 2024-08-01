import React from "react";
import {
  Vertical,
  NoCenterHorizontal,
  Horizontal,
} from "../styles/CommunalStyle";
import LogoImg from "../imgs/Logo.png";
import styled from "styled-components";
import ProgressBarComponent from "../components/IncomePage/ProgressBarComponent";

const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;

export default function IncomePage() {
  return (
    <Vertical>
      <NoCenterHorizontal>
        <Horizontal
          style={{
            justifyContent: "flex-start",
            marginLeft: "25px",
            marginTop: "30px",
          }}
        >
          <Logo src={LogoImg} />
          <Title>SSOBBI</Title>
        </Horizontal>
      </NoCenterHorizontal>
      <ProgressBarComponent />
    </Vertical>
  );
}
