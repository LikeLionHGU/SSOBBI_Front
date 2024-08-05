import styled from "styled-components";
import GaugeComponent from "react-gauge-component";

import { Horizontal } from "../../styles/CommunalStyle";

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
const DetailBT = styled.div`
  font-family: "SUITLight";
  font-size: 10px;
  width: 100%;
  height: 40px;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.colors.COLOR70};
  margin-top: 22px;
  cursor: pointer;
`;

const circledatas = [
  {
    size: "80px",
    bcolor: "#ACFFD2",
    font: "16px",
    margin: "15px",
  },
  {
    size: "50px",
    bcolor: "#ACFFFA",
    font: "10px",
    margin: "43px",
  },
  {
    size: "65px",
    bcolor: "#ACEBFF",
    font: "12px",
    margin: "10px",
  },
  {
    size: "31px",
    bcolor: "#C1FFAC",
    font: "8px",
    margin: "52px",
  },
];

function MonthComponent({ monthlyData, month, onDetailCPChange }) {
  return (
    <>
      <Horizontal>
        <Box>
          {month}월의 행복지수
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
            value={monthlyData?.happinessRate}
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
          {month}월의 과소비 금액
          {monthlyData?.totalOverConsumptionAmount ||
          monthlyData?.totalOverConsumptionAmount === 0 ? (
            <p style={{ fontSize: "30px", fontWeight: "bold" }}>
              <span
                style={{
                  fontSize: "40px",
                  fontFamily: "SUITExtraBold",
                  fontWeight: "bold",
                }}
              >
                {monthlyData?.totalOverConsumptionAmount.toLocaleString()}
              </span>
              {"   "}원
            </p>
          ) : (
            <span
              style={{
                fontSize: "18px",
                color: "#19844A",
                marginTop: "50px",
                marginBottom: "45px",
              }}
            >
              과소비 내역이 없습니다.
            </span>
          )}
        </Box>
        <Box
          style={{ marginRight: "0px", paddingTop: "20px", height: "172px" }}
        >
          이번달 과소비 항목 TOP4
          {monthlyData?.topFourOverConsumptionCategories?.length > 0 ? (
            <Horizontal>
              {monthlyData?.topFourOverConsumptionCategories.map(
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
                marginTop: "40px",
                marginBottom: "25px",
              }}
            >
              과소비 내역이 없습니다.
            </span>
          )}
          <DetailBT onClick={onDetailCPChange}>
            {month}월 카테고리별 소비금액 확인하기
          </DetailBT>
        </Box>
      </Horizontal>
    </>
  );
}

export default MonthComponent;
