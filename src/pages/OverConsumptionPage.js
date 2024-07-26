import React from "react";
import { useRecoilValue } from "recoil";
import { consumptionIndexState } from "../store/atom";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import InfoCircleImg from "../imgs/InfoCircle.svg";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
} from "../styles/CommunalStyle";
import CalenderComponent from "../components/CreatePage/CalenderComponent";
import CheckComponent from "../components/OverConsumptionPage/CheckComponent";
import TooltipComponent from "../components/OverConsumptionPage/TooltipComponent";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
`;

const TooltipBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "SUITLight";
  font-size: 20px;

  > p > span {
    font-family: "SUITSemiBold";
  }
`;

const StyledBtn = styled.button`
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  width: 100px;
  height: 48px;
  border-radius: 20px;
  border: none;
  color: white;
  font-family: "SUITLight";
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  bottom: 150px;
  right: 30px;
`;

function OverConsumptionPage() {
  const consumptions = useRecoilValue(consumptionIndexState);
  const navigate = useNavigate();
  function handleBtnClick() {
    navigate("/ssobbi");
  }
  return (
    <Horizontal style={{ height: "100vh", alignItems: "flex-start" }}>
      <MenuBarComponent menu={"note"} />
      <Vertical
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "33px",
          minWidth: "800px",
        }}
      >
        <div style={{ height: "158px" }} />
        <Wrapper>
          <TitleWrapper>
            <p style={{ marginTop: "16px" }}>
              쏘삐가 생각하는 OO님의 <span>과소비 내역</span>이 맞는지
              확인해주세요
            </p>
            <div className="container">
              <TooltipComponent infoText="hello world">
                <TooltipBtn className="btn">
                  <img src={InfoCircleImg} alt="infoCircle" />
                </TooltipBtn>
              </TooltipComponent>
            </div>
          </TitleWrapper>
          {consumptions.map((itm) => (
            <CheckComponent
              category={itm.category}
              consumption={itm.consumption}
            />
          ))}
          <StyledBtn onClick={handleBtnClick}>완료하기</StyledBtn>
        </Wrapper>
      </Vertical>
      <NoCenterVertical style={{ marginLeft: "56px" }}>
        <div style={{ height: "158px" }} />
        <CalenderComponent />
      </NoCenterVertical>
    </Horizontal>
  );
}

export default OverConsumptionPage;
