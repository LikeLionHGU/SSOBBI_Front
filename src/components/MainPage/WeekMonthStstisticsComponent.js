import { useState } from "react";
import styled from "styled-components";
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
//ToDo: api 추가 개발 시 데이터 받아와서 연결 새롭게 하기
function WeekMonthStstisticsComponent({ weekData, monthData }) {
  const [isMonthly, setIsMonthly] = useState(false);
  const circledatas = [
    {
      size: "80px",
      bcolor: "#ACFFD2",
      font: "16px",
      margin: "32px",
    },
    {
      size: "50px",
      bcolor: "#ACFFFA",
      font: "10px",
      margin: "63px",
    },
    {
      size: "65px",
      bcolor: "#ACEBFF",
      font: "12px",
      margin: "30px",
    },
    {
      size: "31px",
      bcolor: "#C1FFAC",
      font: "8px",
      margin: "72px",
    },
  ];

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

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
          {isMonthly ? "이번달 행복지수" : "이번주 행복지수"}
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
            value={
              isMonthly
                ? monthData?.happinessRate
                  ? monthData.happinessRate
                  : 0
                : weekData?.happinessRate
                ? weekData.happinessRate
                : 0
            }
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
          {isMonthly ? (
            <>
              이번달 과소비 비율
              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                {monthData?.overConsumptionRate ? (
                  <>
                    <span
                      style={{
                        fontSize: "60px",
                        fontFamily: "SUITExtraBold",
                        fontWeight: "bold",
                        color: "#19844A",
                      }}
                    >
                      {monthData.overConsumptionRate}
                    </span>{" "}
                    %
                    <p
                      style={{
                        marginBottom: "-30px",
                        marginLeft: "30%",
                        fontSize: "12px",
                        color: "#19844A",
                        margin: 0,
                      }}
                    >
                      ({monthData.totalOverConsumptionCount}건 /
                      {monthData.totalConsumptionCount}건)
                    </p>
                  </>
                ) : (
                  <span style={{ fontSize: "18px", color: "#19844A" }}>
                    과소비 내역이 없습니다!
                  </span>
                )}
              </p>
            </>
          ) : (
            <>
              이번주 과소비 비율
              <p
                style={{
                  fontSize: "35px",
                  fontWeight: "bold",
                  marginTop: "20px",
                }}
              >
                {weekData.overConsumptionRate ? (
                  <>
                    <span
                      style={{
                        fontSize: "60px",
                        fontFamily: "SUITExtraBold",
                        fontWeight: "bold",
                        color: "#19844A",
                      }}
                    >
                      {weekData.overConsumptionRate}
                    </span>{" "}
                    %
                    <p
                      style={{
                        marginBottom: "-30px",
                        marginLeft: "30%",
                        fontSize: "12px",
                        color: "#19844A",
                        margin: 0,
                      }}
                    >
                      ({weekData.totalOverConsumptionCount}건 /
                      {weekData.totalConsumptionCount}건)
                    </p>
                  </>
                ) : (
                  <span style={{ fontSize: "18px", color: "#19844A" }}>
                    과소비 내역이 없습니다!
                  </span>
                )}
              </p>
            </>
          )}
        </Box>
        <Box>
          {isMonthly ? (
            <>
              이번달 과소비 항목 Top4
              {monthData?.topFourOverConsumptionCategories?.length > 0 ? (
                <Horizontal>
                  {monthData.topFourOverConsumptionCategories.map(
                    (item, index) => {
                      const circleData = circledatas[index];
                      return (
                        <CircleBox
                          key={index}
                          color={circleData.bcolor}
                          width={circleData.size}
                          height={circleData.size}
                          font={circleData.font}
                          margin={circleData.margin}
                        >
                          {item.category}
                        </CircleBox>
                      );
                    }
                  )}
                </Horizontal>
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    color: "#19844A",
                    marginTop: "37px",
                    marginBottom: "43px",
                  }}
                >
                  과소비 내역이 없습니다!
                </span>
              )}
            </>
          ) : (
            <>
              이번주 과소비 항목 Top4
              {weekData.topFourOverConsumptionCategories.length > 0 ? (
                <Horizontal>
                  {weekData.topFourOverConsumptionCategories.map(
                    (item, index) => {
                      const circleData = circledatas[index];
                      return (
                        <CircleBox
                          key={index}
                          color={circleData.bcolor}
                          width={circleData.size}
                          height={circleData.size}
                          font={circleData.font}
                          margin={circleData.margin}
                        >
                          {item.category}
                        </CircleBox>
                      );
                    }
                  )}
                </Horizontal>
              ) : (
                <span
                  style={{
                    fontSize: "18px",
                    color: "#19844A",
                    marginTop: "37px",
                    marginBottom: "43px",
                  }}
                >
                  과소비 내역이 없습니다!
                </span>
              )}
            </>
          )}
        </Box>
      </Horizontal>
    </>
  );
}

export default WeekMonthStstisticsComponent;
