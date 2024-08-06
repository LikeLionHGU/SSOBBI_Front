import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState, userData } from "../../store/atom";
import CalenderComponent from "../../components/CalenderPage/CalenderComponent";
// import CalenderDetailComponent from "../../components/CalenderPage/CalenderDetailComponent";
import MonthComponent from "../../components/MobComponent/MobCalenderPage/MonthComponent";
import CategoryDetailComponent from "../../components/MobComponent/MobCalenderPage/CategoryDetailComponent";
import TooltipComponent from "../../components/CalenderPage/TooltipComponent";
import ScatterChartsComponent from "../../components/MobComponent/MobCalenderPage/ScatterChartsComponent";
import MobMenuBarComponent from "../Mob/MobMenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";
import InfoCircleImg from "../../imgs/InfoCircle.svg";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import LogoImg from "../../imgs/Logo.png";

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

const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const Box = styled.div`
  width: 318px;
  height: 71px;
  margin-top: 10px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-size: 12px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
  padding: 15px;
`;
const HappyBox = styled.div`
  width: 318px;
  height: 160px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfffe;
`;
const TooltipBtn = styled.button`
  width: 20px;
  height: 20px;
  background-color: white;
  border: none;
  cursor: pointer;
`;
const SmallCalenderWrapper = styled.div`
  position: absolute;
  top: 110px;
  z-index: 10;
  background-color: none;
  border: none;
  border-radius: 8px;
`;

function MobCalenderPage() {
  const location = useLocation();
  console.log("location.state?.detailDate", location.state?.detailDate);
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
  const [monthlyData, setMonthlyData] = useState("");
  const [happinessRate, setHappinessRate] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [overspentData, setOverspentData] = useState(null);
  const [userIncome, setUserIncome] = useState(null);
  const [showSmallCalender, setShowSmallCalender] = useState(false);

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
      console.log("happyDate", happyDate);
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
    const fetchOverspentData = async () => {
      try {
        const overspent = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/consumptions/${apiMonth}/category`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setOverspentData(
          overspent.data.monthlyConsumptionsAndTargetsByCategory
        );
        setUserIncome(overspent.data.userIncome);
        console.log("setOverspentData", overspent.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchMonthData();
    fetchHappyData();
    fetchDayilyData();
    fetchOverspentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, apiMonth]);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  const handleDetailCPChange = () => {
    setDetailCP(!detailCP);
  };

  const handleSmallCalender = () => {
    setShowSmallCalender(!showSmallCalender);
  };

  const userInfo = useRecoilValue(userData);
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
          {detailCP ? (
            <NoCenterHorizontal>
              <Vertical
                style={{
                  alignItems: "flex-start",
                  marginLeft: "20px",
                  marginRight: "30px",
                }}
              >
                <SubTitle>
                  <MdOutlineArrowBackIosNew
                    onClick={handleDetailCPChange}
                    style={{ cursor: "pointer", marginRight: "6px" }}
                  />
                  {userInfo.name}님의 {selectedMonth}월{" "}
                  <span style={{ fontFamily: "SUITMedium", marginLeft: "4px" }}>
                    {" "}
                    카테고리별 소비
                  </span>
                </SubTitle>
                <CategoryDetailComponent
                  overspentData={overspentData}
                  userIncome={userIncome}
                />
              </Vertical>
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
                  <SubTitle
                    onClick={handleSmallCalender}
                    style={{ cursor: "pointer" }}
                  >
                    &lt; {userInfo.name}님의 {selectedMonth}월{" "}
                    <span
                      style={{ fontFamily: "SUITMedium", marginRight: "2px" }}
                    >
                      {" "}
                      소비{" "}
                    </span>{" "}
                    &gt;
                  </SubTitle>
                  {showSmallCalender && (
                    <SmallCalenderWrapper>
                      <div style={{ marginTop: "-50px" }}></div>
                      <CalenderComponent
                        onMonthChange={handleMonthChange}
                        setApiMonth={setApiMonth}
                      />
                    </SmallCalenderWrapper>
                  )}
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
                      <p
                        style={{
                          marginTop: "30px",
                          marginBottom: "0px",
                          fontSize: "14px",
                        }}
                      >
                        {apiMonth} 하루 과소비 일기
                      </p>
                      <Box>해당 날에 일기가 없습니다.</Box>
                    </>
                  )}
                </Vertical>
              </NoCenterHorizontal>
              <SubTitle style={{ marginLeft: "30px" }}>
                {userInfo.name}님의 {selectedMonth}월{" "}
                <span style={{ marginLeft: "5px", fontFamily: "SUITMedium" }}>
                  {" "}
                  감정별 소비{" "}
                </span>
                <div className="container">
                  <TooltipComponent
                    infoText="hello world"
                    show={showTooltip}
                    version={"mobile"}
                  >
                    <TooltipBtn
                      className="btn"
                      onMouseEnter={() => setShowTooltip(true)}
                      onMouseLeave={() => setShowTooltip(false)}
                    >
                      <img src={InfoCircleImg} alt="infoCircle" />
                    </TooltipBtn>
                  </TooltipComponent>
                </div>
              </SubTitle>
              <HappyBox style={{ marginLeft: "30px", marginBottom: "20px" }}>
                <ScatterChartsComponent happinessRateData={happinessRate} />
              </HappyBox>
            </Vertical>
          )}
          <MobMenuBarComponent menu={"calendar"} />
        </NoCenterVertical>
      </MobileV>
    </>
  );
}

export default MobCalenderPage;
