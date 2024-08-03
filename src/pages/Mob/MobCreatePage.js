import React from "react";
import { Vertical } from "../../styles/CommunalStyle";
import HappinessRateComponent from "../../components/MobComponent/MobCreatePage/HappinessRateComponent";
import styled from "styled-components";
import MobMenuBarComponent from "./MobMenuBarComponent";
import { Horizontal, NoCenterHorizontal } from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import ContentComponent from "../../components/MobComponent/MobCreatePage/ContentComponent";
import ConsumptionComponent from "../../components/MobComponent/MobCreatePage/ConsumptionComponent";

const MobileV = styled.div`
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  background: var(
    --mobile_bg,
    linear-gradient(280deg, #f7f7f7 56.16%, #ebf9f0 146.1%)
  );
  /* height: 100vh; */
`;

const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  margin: 0;
`;

function MobCreatePage() {
  return (
    <MobileV>
      <Vertical>
        <NoCenterHorizontal>
          <Horizontal
            style={{
              justifyContent: "flex-start",
              marginLeft: "25px",
            }}
          >
            <a href="/ssobbi">
              <Logo src={LogoImg} />
            </a>
            <a href="/ssobbi" style={{ textDecoration: "none" }}>
              <Title>SSOBBI</Title>
            </a>
          </Horizontal>
        </NoCenterHorizontal>
        <HappinessRateComponent />
        <ContentComponent />
        <ConsumptionComponent />
        <MobMenuBarComponent menu={"note"} />
      </Vertical>
    </MobileV>
  );
}

export default MobCreatePage;
