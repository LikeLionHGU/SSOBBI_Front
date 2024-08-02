import React, { useState } from "react";
import {
  Vertical,
  NoCenterHorizontal,
  Horizontal,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import styled from "styled-components";
import ProgressBarComponent from "../../components/IncomePage/ProgressBarComponent";
import IncomeInputComponent from "../../components/IncomePage/IncomeInputComponent";
import FirstAmountComponent from "../../components/IncomePage/FirstAmountComponent";
import EnterPhoneNumComponent from "../../components/IncomePage/EnterPhoneNumComponent";

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

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function IncomePage() {
  const [isRunning, setIsRunning] = useState(false);
  const [inputValue, setInputValue] = useState("0");
  const [showComponent, setShowComponent] = useState(1);
  const [handleProgress, setHandleProgress] = useState({
    direction: "",
    point: 0,
  });
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
  );
}
