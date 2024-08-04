import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import axios from "axios";
import moment from "moment";
import { tokenState } from "../../store/atom";
import DayStatisticsComponent from "../../components/MobComponent/MobMainPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../../components/MobComponent/MobMainPage/WeekMonthStstisticsComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import MobMenuBarComponent from "../Mob/MobMenuBarComponent";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  margin: 0;
`;
const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const Box = styled.div`
  width: 318px;
  height: 71px;
  margin-top: 16px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 12px;
`;

function MobMainPage() {
  const [loading, setLoading] = useState(true);
  const [dailyData, setDailyData] = useState(null);
  const [weeklyData, setWeeklyData] = useState(null);
  const [monthlyData, setMonthlyData] = useState(null);
  const userToken = useRecoilValue(tokenState);
  const today = moment().format("YYYY-MM-DD");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const day = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/daily/${today}/summary`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setDailyData(day.data);
        const week = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/weekly/${today}/summary`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setWeeklyData(week.data);
        const month = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/records/monthly/${today}/summary`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setMonthlyData(month.data);
        setLoading(false);
        console.log(
          "메인페이지 데이터 확인 : ",
          day.data,
          week.data,
          month.data
        );
      } catch (err) {
        console.log("error: ", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [userToken, today]);
  if (loading) return <p>Loading...</p>;
  return (
    <>
      <MobileV>
        <NoCenterVertical
          style={{
            justifyContent: "flex-start",
            marginTop: "40px",
            width: "375px",
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

          <Vertical
            style={{
              paddingBottom: "20px",
            }}
          >
            <DayStatisticsComponent dayData={dailyData} />
            <Box>
              {dailyData.content
                ? dailyData.content
                : "오늘의 일기를 남겨주세요!"}
            </Box>
            <WeekMonthStstisticsComponent
              weekData={weeklyData}
              monthData={monthlyData}
            />
          </Vertical>
          <MobMenuBarComponent menu={"home"} />
        </NoCenterVertical>
      </MobileV>
    </>
  );
}
/** 메인페이지 */
export default MobMainPage;
