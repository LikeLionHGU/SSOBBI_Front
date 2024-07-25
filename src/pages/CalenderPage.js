import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import CalenderComponent from "../components/CalenderPage/CalenderComponent";
import MonthComponent from "../components/CalenderPage/MonthComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
  Box20,
} from "../styles/CommunalStyle";

import LogoImg from "../imgs/Logo.png";

const dayData = {
  happy: 24,
  cost: 250,
};

const staticData = {
  whappy: 52,
  wcost: 250,
  mhappy: 94,
  mcost: 250,
};
const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const Box = styled.div`
  width: 830px;
  height: 125px;
  margin-top: 65px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfffe;
`;
const HappyBox = styled.div`
  width: 1190px;
  height: 210px;
  margin-top: 30px;
  margin-left: 30px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfffe;
`;

function CalenderPage() {
  const [selectedMonth, setSelectedMonth] = useState(moment().format("M"));

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };
  return (
    <>
      <Horizontal
        style={{
          height: "100vh",
          overflowY: "hidden",
        }}
      >
        <MenuBarComponent menu={"calendar"} />
        <NoCenterVertical
          style={{
            height: "100vh",
            justifyContent: "flex-start",
            marginTop: "40px",
          }}
        >
          <NoCenterHorizontal>
            <Horizontal
              style={{
                justifyContent: "flex-start",
                marginLeft: "25px",
                marginBottom: "35px",
                marginTop: "30px",
              }}
            >
              <Logo src={LogoImg} />
              <Title>SSOBBI</Title>
            </Horizontal>
            <DropDownComponent />
          </NoCenterHorizontal>
          <Horizontal>
            <Vertical
              style={{
                alignItems: "flex-start",
                marginLeft: "30px",
                marginRight: "20px",
              }}
            >
              <MonthComponent happy={90} month={selectedMonth} />
              <Box>{selectedMonth}월의 과소비 일기 API 연결해서 보여주기</Box>
            </Vertical>
            <CalenderComponent onMonthChange={handleMonthChange} />
          </Horizontal>
          <HappyBox>낮은 행복/과소비 점 그래프 가져오기</HappyBox>
        </NoCenterVertical>
      </Horizontal>
    </>
  );
}

export default CalenderPage;
