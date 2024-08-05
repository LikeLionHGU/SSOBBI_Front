import React, { useState } from "react";
import {
  Vertical,
  NoCenterHorizontal,
  Horizontal,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import styled from "styled-components";
import ProgressBarComponent from "../../components/MobComponent/MobIncomePage/ProgressBarComponent";
import IncomeInputComponent from "../../components/MobComponent/MobIncomePage/IncomeInputComponent";
import FirstAmountComponent from "../../components/MobComponent/MobIncomePage/FirstAmountComponent";
import EnterPhoneNumComponent from "../../components/MobComponent/MobIncomePage/EnterPhoneNumComponent";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
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
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 72px;
`;

export default function MobIncomePaage() {
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState("0");
  const [showComponent, setShowComponent] = useState(1);
  const [handleProgress, setHandleProgress] = useState({
    direction: "",
    point: 0,
  });
  return (
    <MobileV>
      <Vertical
        style={{
          justifyContent: "flex-start",
          marginTop: "40px",
          width: "375px",
          position: "relative",
        }}
      >
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
        <ProgressBarComponent
          isRunning={isRunning}
          handleProgress={handleProgress}
        />
        <Wrapper>
          {showComponent === 1 && (
            <IncomeInputComponent
              setIsRunning={setIsRunning}
              setShowComponent={setShowComponent}
              setHandleProgress={setHandleProgress}
              setInputValue={setInputValue}
              inputValue={inputValue}
            />
          )}
          {showComponent === 2 && (
            <FirstAmountComponent
              inputValue={inputValue}
              setIsRunning={setIsRunning}
              setShowComponent={setShowComponent}
              setHandleProgress={setHandleProgress}
            />
          )}
          {showComponent === 3 && <EnterPhoneNumComponent />}
        </Wrapper>
      </Vertical>
    </MobileV>
  );
}
