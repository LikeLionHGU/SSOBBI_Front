import styled from "styled-components";
import { Horizontal } from "../../../styles/CommunalStyle";

const HappyBox = styled.div`
  font-family: "SUITLight";
  font-size: 12px;
  width: 300px;
  height: 71px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  background-color: white;
  padding-left: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
`;
const Box = styled.div`
  font-family: "SUITLight";
  font-size: 16px;
  width: 155px;
  height: 112px;
  margin-top: 16px;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: white;
  font-size: 12px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
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
  font-size: 8px;
  width: 100%;
  height: 25px;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;
  background-color: ${(props) => props.theme.colors.COLOR70};
  margin-top: 15px;
  cursor: pointer;
`;

const circledatas = [
  {
    size: "37px",
    bcolor: "#ACFFD2",
    font: "8px",
    margin: "5px",
  },
  {
    size: "22px",
    bcolor: "#ACFFFA",
    font: "5px",
    margin: "25px",
  },
  {
    size: "30px",
    bcolor: "#ACEBFF",
    font: "6px",
    margin: "8px",
  },
  {
    size: "15px",
    bcolor: "#C1FFAC",
    font: "4px",
    margin: "45px",
  },
];

const HappinessInput = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  width: 90%; /* Full width */
  height: 7px; /* Height of the slider */
  background: linear-gradient(
    to right,
    rgba(184, 255, 217, 1),
    rgba(42, 166, 99, 1)
  ); /* Background color of the slider */
  border-radius: 5px; /* Rounded corners */
  outline: none; /* Remove outline */
  /* opacity: 0.7; Transparency */
  transition: opacity 0.2s; /* Transition for hover effect */
  cursor: pointer;
  border: none;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default styling */
    appearance: none;
    width: 10px; /* Thumb width */
    height: 10px; /* Thumb height */
    border-radius: 50%; /* Circular thumb */
    border: 1px solid rgba(63, 200, 126, 1);
    background: rgba(240, 255, 247, 1); /* Thumb color */
    cursor: pointer; /* Pointer cursor on hover */
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5); /* Thumb shadow */
  }
`;

function MonthComponent({ monthlyData, month, onDetailCPChange }) {
  return (
    <>
      <HappyBox>
        {monthlyData?.happinessRate !== null ? (
          <>
            <p style={{ marginTop: "5px", marginBottom: "5px" }}>
              {" "}
              {month}월의 행복지수
            </p>
            <HappinessInput
              value={monthlyData.happinessRate}
              type="range"
              min="0"
              max="100"
            />
            <p
              style={{
                margin: 0,
                marginLeft: `${monthlyData.happinessRate * 2.5}px`,
              }}
            >
              {monthlyData?.happinessRate} %
            </p>
          </>
        ) : (
          <div>행복지수 데이터가 없습니다.</div>
        )}
      </HappyBox>
      <Horizontal>
        <Box>
          {month}월의 과소비 금액
          {monthlyData?.totalOverConsumptionAmount ||
          monthlyData?.totalOverConsumptionAmount === 0 ? (
            <p style={{ fontSize: "12px", fontWeight: "bold" }}>
              <span
                style={{
                  fontSize: "20px",
                  fontFamily: "SUITExtraBold",
                  fontWeight: "bold",
                }}
              >
                {monthlyData.totalOverConsumptionAmount.toLocaleString()}
              </span>
              {"   "}원
            </p>
          ) : (
            <span
              style={{
                fontSize: "12px",
                color: "#19844A",
                marginTop: "28px",
                marginBottom: "28px",
              }}
            >
              과소비 내역이 없습니다.
            </span>
          )}
        </Box>
        <Box style={{ paddingTop: "10px", height: "102px" }}>
          이번달 과소비 항목 TOP4
          <div style={{ marginTop: "10px" }} />
          {monthlyData?.topFourOverConsumptionCategories?.length > 0 ? (
            <Horizontal>
              {monthlyData.topFourOverConsumptionCategories.map(
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
                fontSize: "12px",
                color: "#19844A",
                marginTop: "15px",
                marginBottom: "15px",
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
