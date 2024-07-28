import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import axios from "axios";
import moment from "moment";
import { tokenState } from "../store/atom";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import CalenderComponent from "../components/MainPage/CalenderComponent";
import DayStatisticsComponent from "../components/MainPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../components/MainPage/WeekMonthStstisticsComponent";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../styles/CommunalStyle";
import LogoImg from "../imgs/Logo.png";

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
  width: 820px;
  height: 113px;
  margin-top: 50px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfffe;
`;

function MainPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const userToken = useRecoilValue(tokenState);
  const today = moment().format("YYYY-MM-DD");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `${process.env.REACT_APP_BASE_URL}/records/daily/${today}/summary`,
          `${process.env.REACT_APP_BASE_URL}/records/daily/${today}`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setData(response.data);
        setLoading(false);
        console.log("메인페이지 데이터 확인 : ", response.data);
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
      <Horizontal style={{ height: "100vh", overflowY: "hidden" }}>
        <MenuBarComponent menu={"home"} />
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
                marginRight: "55px",
              }}
            >
              <DayStatisticsComponent dayData={data} />

              <Box>
                {data.content ? data.content : "오늘의 일기를 남겨주세요!"}
              </Box>
              <WeekMonthStstisticsComponent weekData={data} monthData={data} />
            </Vertical>
            <CalenderComponent />
          </Horizontal>
        </NoCenterVertical>
      </Horizontal>
    </>
  );
}

export default MainPage;
