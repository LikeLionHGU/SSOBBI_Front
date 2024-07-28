import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import CalenderComponent from "../components/CalenderPage/CalenderComponent";
import MainCalenderComponent from "../components/MainPage/CalenderComponent";
import MonthComponent from "../components/CalenderPage/MonthComponent";
import CategoryDetailComponent from "../components/CalenderPage/CategoryDetailComponent";
import ScatterChartsComponent from "../components/CalenderPage/ScatterChartsComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../styles/CommunalStyle";

import LogoImg from "../imgs/Logo.png";

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;

const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 20px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const Box = styled.div`
  width: 830px;
  height: 125px;
  margin-top: 50px;
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
  const [detailCP, setDetailCP] = useState(false);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleDetailCPChange = () => {
    setDetailCP(true);
  };
  return (
    <>
      <Horizontal style={{ height: "100vh", overflowY: "hidden" }}>
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
          {detailCP ? (
            <NoCenterHorizontal>
              <Vertical
                style={{
                  alignItems: "flex-start",
                  marginLeft: "30px",
                  marginRight: "20px",
                }}
              >
                <SubTitle>
                  한나님의 {selectedMonth}월{" "}
                  <span style={{ fontFamily: "SUITMedium" }}>
                    {" "}
                    카테고리별 소비{" "}
                  </span>
                </SubTitle>
                <CategoryDetailComponent />
              </Vertical>
              <MainCalenderComponent onMonthChange={handleMonthChange} />
            </NoCenterHorizontal>
          ) : (
            <Vertical
              style={{
                alignItems: "flex-start",
              }}
            >
              <NoCenterHorizontal>
                <Vertical
                  style={{
                    alignItems: "flex-start",
                    marginLeft: "30px",
                    marginRight: "20px",
                  }}
                >
                  <SubTitle>
                    한나님의 {selectedMonth}월{" "}
                    <span style={{ fontFamily: "SUITMedium" }}> 소비 </span>
                  </SubTitle>
                  <MonthComponent
                    happy={90}
                    month={selectedMonth}
                    onDetailCPChange={handleDetailCPChange}
                  />
                  <Box>
                    {selectedMonth}월의 과소비 일기 API 연결해서 보여주기
                  </Box>
                </Vertical>
                <CalenderComponent onMonthChange={handleMonthChange} />
              </NoCenterHorizontal>
              <SubTitle style={{ marginLeft: "30px" }}>
                한나님의 {selectedMonth}월{" "}
                <span style={{ fontFamily: "SUITMedium" }}> 감정별 소비 </span>
              </SubTitle>
              <HappyBox style={{ marginLeft: "30px" }}>
                <ScatterChartsComponent />
              </HappyBox>
            </Vertical>
          )}
        </NoCenterVertical>
      </Horizontal>
    </>
  );
}

export default CalenderPage;
