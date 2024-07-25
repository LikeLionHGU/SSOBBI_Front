import { useState } from "react";

import styled from "styled-components";
// import Chart from "react-apexcharts";
import Switch from "react-switch";
import GaugeComponent from "react-gauge-component";

import { Horizontal, NoCenterHorizontal } from "../../styles/CommunalStyle";

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
  margin-top: 14px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 20px;
  margin-top: 36px;
`;

const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 260px;
  height: 192px;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fcfffe;
`;
const CircleBox = styled.div`
  font-family: "SUITLight";
  font-size: ${({ font }) => font};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.colors.COLOR100};
  background-color: ${({ color }) => color};
  margin-top: ${({ margin }) => margin};
`;

const options = {
  chart: {
    type: "donut",
  },
  labels: ["식비", "쇼핑", "교통비", "카페", "기타"],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

function WeekMonthStstisticsComponent({ whappy, mhappy }) {
  const [isMonthly, setIsMonthly] = useState(false);
  const weeklySeries = [44, 55, 41, 17, 15]; // 주간 데이터
  const monthlySeries = [10, 60, 50, 30, 50]; // 월간 데이터
  const circles = [
    {
      size: "80px",
      bcolor: "#ACFFD2",
      tag: "패션",
      font: "16px",
      margin: "32px",
    },
    {
      size: "50px",
      bcolor: "#ACFFFA",
      tag: "음식",
      font: "10px",
      margin: "63px",
    },
    {
      size: "65px",
      bcolor: "#ACEBFF",
      tag: "쇼핑",
      font: "12px",
      margin: "30px",
    },
    {
      size: "31px",
      bcolor: "#C1FFAC",
      tag: "교통비",
      font: "8px",
      margin: "72px",
    },
  ];
  const series = isMonthly ? monthlySeries : weeklySeries; // 주간/월간 데이터 선택

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const overconsumptionCount = isMonthly ? 12 : 3; // 월간과 주간 과소비 건수
  return (
    <>
      <NoCenterHorizontal>
        {isMonthly ? (
          <Title>
            한나님의{" "}
            <span style={{ fontFamily: "SUITMedium" }}>월간 기록 </span>
          </Title>
        ) : (
          <Title>
            한나님의{" "}
            <span style={{ fontFamily: "SUITMedium" }}>주간 기록 </span>
          </Title>
        )}
        <ToggleContainer>
          <Switch
            onChange={handleToggle}
            checked={isMonthly}
            onColor="#2AA663"
            onHandleColor="white"
            handleDiameter={20}
            uncheckedIcon={
              <Horizontal
                style={{
                  color: "white",
                  fontSize: "10px",
                  paddingTop: "10px",
                }}
              >
                월간보기
              </Horizontal>
            }
            checkedIcon={
              <Horizontal
                style={{
                  color: "white",
                  fontSize: "10px",
                  paddingTop: "10px",
                }}
              >
                주간보기
              </Horizontal>
            }
            //   boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            //   activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={31}
            width={72}
            className="react-switch"
            id="material-switch"
          />
        </ToggleContainer>
      </NoCenterHorizontal>
      <Horizontal>
        <Box>
          오늘의 행복지수
          <GaugeComponent
            type="semicircle"
            arc={{
              colorArray: ["#D0FFE5", "#2AA663"],
              padding: 0.01,
              subArcs: [{ limit: 33 }, { limit: 66 }, { limit: 100 }],
            }}
            pointer={{
              type: "arrow",
              animationDelay: 0,
            }}
            value={isMonthly ? mhappy : whappy}
            style={{ height: "120px", width: "250px" }}
            marginInPercent={{
              top: 0.12,
              bottom: 0.0,
              left: 0.07,
              right: 0.07,
            }}
          />
        </Box>
        <Box>
          {isMonthly ? "이번달 과소비 건수" : "이번주 과소비 건수"}
          <p
            style={{ fontSize: "35px", fontWeight: "bold", marginTop: "20px" }}
          >
            <span
              style={{
                fontSize: "60px",
                fontFamily: "SUITExtraBold",
                fontWeight: "bold",
                color: "#19844A",
              }}
            >
              {overconsumptionCount}
            </span>
            {"   "}건
          </p>
        </Box>
        <Box>
          {isMonthly ? "이번달 과소비 항목" : "이번주 과소비 항목"}
          {/* <div id="chart">
            <Chart options={options} series={series} type="donut" />
          </div> */}
          <Horizontal>
            {circles.map((item, index) => (
              <CircleBox
                key={index}
                color={item.bcolor}
                width={item.size}
                height={item.size}
                font={item.font}
                margin={item.margin}
              >
                {item.tag}
              </CircleBox>
            ))}
          </Horizontal>
        </Box>
      </Horizontal>
    </>
  );
}

export default WeekMonthStstisticsComponent;
