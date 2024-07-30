import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../store/atom";
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
  const location = useLocation();
  console.log("location.state?.detailDate", location.state.detailDate);
  const selectedDate = location.state?.detailDate
    ? moment(location.state.detailDate, "YYYY-MM-DD").format("YYYY-MM-DD")
    : moment().format("YYYY-MM-DD");
  const userToken = useRecoilValue(tokenState);
  const [apiMonth, setApiMonth] = useState(
    moment(selectedDate, "YYYY-MM-DD").format("YYYY-MM-DD")
  );
  const [selectedMonth, setSelectedMonth] = useState(
    moment(selectedDate, "YYYY-MM-DD").format("M")
  );
  const [detailCP, setDetailCP] = useState(false);
  const [dailyData, setDailyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const [happinessRate, setHappinessRate] = useState(null);

  useEffect(() => {
    const fetchMonthData = async () => {
      try {
        const month = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/monthly/${apiMonth}/summary`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setMonthlyData(month.data);
        console.log("setMonthlyData: ", month.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    const fetchHappyData = async () => {
      const happyDate = apiMonth.substring(0, 7);
      try {
        const happiness = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/monthly/${happyDate}/summary/by-happiness-rate`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setHappinessRate(happiness.data.records);
        console.log("setHappinessRate: ", happiness.data.records);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    const fetchDayilyData = async () => {
      try {
        const daycontent = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/daily/${apiMonth}/summary`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setDailyData(daycontent.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchMonthData();
    fetchHappyData();
    fetchDayilyData();
  }, [selectedMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    //TODO: 데이터 반영이 늦게됨. 추후 확인 필요
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/records/daily/${apiMonth}/summary`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      )
      .then((response) => {
        setDailyData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
                    monthlyData={monthlyData}
                    month={selectedMonth}
                    onDetailCPChange={handleDetailCPChange}
                  />
                  {dailyData?.content ? (
                    <>
                      <p style={{ marginTop: "30px", marginBottom: "5px" }}>
                        {apiMonth} 하루 과소비 일기
                      </p>
                      <Box>{dailyData.content}</Box>
                    </>
                  ) : (
                    <>
                      <p style={{ marginTop: "30px", marginBottom: "5px" }}>
                        {apiMonth} 하루 과소비 일기
                      </p>
                      <Box>해당 날에 일기가 없습니다.</Box>
                    </>
                  )}
                </Vertical>
                <CalenderComponent
                  onMonthChange={handleMonthChange}
                  setApiMonth={setApiMonth}
                />
              </NoCenterHorizontal>
              <SubTitle style={{ marginLeft: "30px" }}>
                한나님의 {selectedMonth}월{" "}
                <span style={{ fontFamily: "SUITMedium" }}> 감정별 소비 </span>
              </SubTitle>
              <HappyBox style={{ marginLeft: "30px" }}>
                <ScatterChartsComponent happinessRateData={happinessRate} />
              </HappyBox>
            </Vertical>
          )}
        </NoCenterVertical>
      </Horizontal>
    </>
  );
}

export default CalenderPage;
