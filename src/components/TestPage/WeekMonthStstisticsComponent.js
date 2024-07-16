import { useState } from "react";

import styled from "styled-components";
import Chart from "react-apexcharts";
import Switch from "react-switch";

import { Horizontal } from "../../styles/CommunalStyle";

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

const Box = styled.div`
  width: 350px;
  height: 250px;
  margin: 20px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

function WeekMonthStstisticsComponent() {
  const [isMonthly, setIsMonthly] = useState(false);
  const weeklySeries = [44, 55, 41, 17, 15]; // 주간 데이터
  const monthlySeries = [10, 60, 50, 30, 50]; // 월간 데이터
  const series = isMonthly ? monthlySeries : weeklySeries; // 주간/월간 데이터 선택

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const overconsumptionCount = isMonthly ? 12 : 3; // 월간과 주간 과소비 건수
  return (
    <>
      {isMonthly ? (
        <Title>SSOBBI 월간 기록</Title>
      ) : (
        <Title>SSOBBI 주간 기록</Title>
      )}

      <ToggleContainer>
        <Switch
          onChange={handleToggle}
          checked={isMonthly}
          onColor="#6DE99B"
          onHandleColor="#26E683"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          //   boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          //   activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={28}
          width={55}
          className="react-switch"
          id="material-switch"
        />
      </ToggleContainer>
      <Horizontal>
        <Box></Box>
        <Box>
          {isMonthly ? "이번달 과소비 건수" : "이번주 과소비 건수"}
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            {overconsumptionCount} 건
          </p>
        </Box>
        <Box>
          <div id="chart">
            <Chart options={options} series={series} type="donut" />
          </div>
        </Box>
      </Horizontal>
    </>
  );
}

export default WeekMonthStstisticsComponent;
