import { useState } from "react";
import styled from "styled-components";
import Switch from "react-switch";
import { Horizontal } from "../../../styles/CommunalStyle";
import { useRecoilValue } from "recoil";
import { userData } from "../../../store/atom";

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 16px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  margin-left: -95px;
`;
const HappyBox = styled.div`
  font-family: "SUITLight";
  font-size: 12px;
  width: 320px;
  height: 71px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;
const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 150px;
  height: 112px;
  margin-top: 16px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  font-size: 12px;
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
      size: "37px",
      bcolor: "#ACFFD2",
      font: "8px",
      margin: "10px",
    },
    {
      size: "22px",
      bcolor: "#ACFFFA",
      font: "5px",
      margin: "30px",
    },
    {
      size: "30px",
      bcolor: "#ACEBFF",
      font: "6px",
      margin: "13px",
    },
    {
      size: "15px",
      bcolor: "#C1FFAC",
      font: "4px",
      margin: "50px",
    },
  ];

  const handleToggle = () => {
    setIsMonthly(!isMonthly);
  };

  const userInfo = useRecoilValue(userData);

  return (
    <>
      <Horizontal>
        {isMonthly ? (
          <Title>
            {userInfo.name}님의{" "}
            <span style={{ fontFamily: "SUITMedium" }}>월간 기록 </span>
          </Title>
        ) : (
          <Title>
            {userInfo.name}님의{" "}
            <span style={{ fontFamily: "SUITMedium" }}>주간 기록 </span>
          </Title>
        )}
        <ToggleContainer>
          <Switch
            onChange={handleToggle}
            checked={isMonthly}
            onColor="#2AA663"
            onHandleColor="white"
            handleDiameter={10}
            uncheckedIcon={
              <Horizontal
                style={{
                  color: "white",
                  fontSize: "7px",
                  paddingTop: "5px",
                  marginLeft: "-4px",
                }}
              >
                월간보기
              </Horizontal>
            }
            checkedIcon={
              <Horizontal
                style={{
                  color: "white",
                  fontSize: "7px",
                  paddingTop: "5px",
                  marginLeft: "4px",
                }}
              >
                주간보기
              </Horizontal>
            }
            //   boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
            // activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
            height={18}
            width={47}
            className="react-switch"
            id="material-switch"
          />
        </ToggleContainer>
      </Horizontal>
      <HappyBox>{isMonthly ? "이번달 행복지수" : "이번주 행복지수"}</HappyBox>
      <Horizontal>
        <Box>
          {isMonthly ? (
            <>
              이번달 과소비 비율
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {monthData?.overConsumptionRate ? (
                  <>
                    <span
                      style={{
                        fontSize: "20px",
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
                        fontSize: "8px",
                        color: "#19844A",
                        margin: 0,
                      }}
                    >
                      ({monthData.totalOverConsumptionCount}건 /
                      {monthData.totalConsumptionCount}건)
                    </p>
                  </>
                ) : (
                  <span style={{ fontSize: "12px", color: "#19844A" }}>
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
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {weekData.overConsumptionRate ? (
                  <>
                    <span
                      style={{
                        fontSize: "20px",
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
                        fontSize: "8px",
                        color: "#19844A",
                        margin: 0,
                      }}
                    >
                      ({weekData.totalOverConsumptionCount}건 /
                      {weekData.totalConsumptionCount}건)
                    </p>
                  </>
                ) : (
                  <span style={{ fontSize: "12px", color: "#19844A" }}>
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
              <div style={{ marginTop: "10px" }} />
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
                  <div style={{ marginTop: "10px" }} />
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
              <div style={{ marginTop: "10px" }} />
              {weekData.topFourOverConsumptionCategories?.length > 0 ? (
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
                  <div style={{ marginTop: "10px" }} />
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
