import styled from "styled-components";
import { Horizontal } from "../../../styles/CommunalStyle";

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

function MonthComponent({ monthlyData, month, onDetailCPChange }) {
  return (
    <>
      <HappyBox>{month}월의 행복지수</HappyBox>
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
                {monthlyData.totalOverConsumptionAmount}
              </span>
              {"   "}원
            </p>
          ) : (
            <span
              style={{
                fontSize: "12px",
                color: "#19844A",
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
