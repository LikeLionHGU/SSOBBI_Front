import React from "react";
import { useRecoilValue } from "recoil";
import { consumptionIndexState } from "../store/atom";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
} from "../styles/CommunalStyle";
import CalenderComponent from "../components/CreatePage/CalenderComponent";
import CheckComponent from "../components/OverConsumptionPage/CheckComponent";
import TooltipComponent from "../components/OverConsumptionPage/TooltipComponent";
import styled from "styled-components";

const TooltipBtn = styled.button`
  cursor: pointer;
`;

function OverConsumptionPage() {
  const consumptions = useRecoilValue(consumptionIndexState);
  return (
    <Horizontal style={{ height: "100vh", alignItems: "flex-start" }}>
      <MenuBarComponent menu={"note"} />
      <Vertical
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "33px",
        }}
      >
        <div style={{ height: "158px" }} />
        <p style={{ marginTop: "16px" }}>
          쏘삐가 생각하는 OO님의 과소비 내역이 맞는지 확인해주세요
        </p>
        <div className="container">
          <TooltipComponent infoText="hello world">
            <TooltipBtn className="btn">!</TooltipBtn>
          </TooltipComponent>
        </div>
        {consumptions.map((itm) => (
          <CheckComponent
            category={itm.category}
            consumption={itm.consumption}
          />
        ))}
      </Vertical>
      <NoCenterVertical style={{ marginLeft: "56px" }}>
        <div style={{ height: "158px" }} />
        <CalenderComponent />
      </NoCenterVertical>
    </Horizontal>
  );
}

export default OverConsumptionPage;
