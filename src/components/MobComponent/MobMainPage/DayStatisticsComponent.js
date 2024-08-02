import styled from "styled-components";
import GaugeComponent from "react-gauge-component";

import { Horizontal } from "../../../styles/CommunalStyle";
import { useRecoilValue } from "recoil";
import { userData } from "../../../store/atom";

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
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

const TagBox = styled.div`
  font-family: "SUITLight";
  font-size: 9px;
  width: 40px;
  height: 23px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${({ color }) => color || "#BEFEDB"};
  margin: 2px;
`;

const colors = ["#BEFEDB", "#C4FAF7", "#BDEFFF", "#C1FFAC"];
function DayStatisticsComponent({ dayData }) {
  const userInfo = useRecoilValue(userData);
  return (
    <>
      <Title>
        {userInfo.name}님의{" "}
        <span style={{ fontFamily: "SUITMedium" }}>오늘 소비 기록 </span>
      </Title>
      <HappyBox>오늘의 행복지수</HappyBox>
      <Horizontal>
        <Box>
          오늘 과소비 건수
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {dayData.totalOverConsumptionCount ||
            dayData.totalOverConsumptionCount === 0 ? (
              <>
                <span
                  style={{
                    fontSize: "20px",
                    fontFamily: "SUITExtraBold",
                    fontWeight: "bold",
                    color: "#19844A",
                  }}
                >
                  {dayData.totalOverConsumptionCount}
                </span>{" "}
                건
              </>
            ) : (
              <span style={{ fontSize: "12px", color: "#19844A" }}>
                오늘의 데이터 입력해주세요!
              </span>
            )}
          </p>
        </Box>
        <Box>
          오늘 과소비 항목
          {dayData.overConsumptionCategories?.length > 0 ? (
            <>
              <Horizontal
                style={{ width: "130px", flexWrap: "wrap", marginTop: "15px" }}
              >
                {dayData.overConsumptionCategories.map((item, index) => (
                  <TagBox key={index} color={colors[index % colors.length]}>
                    # {item}
                  </TagBox>
                ))}
              </Horizontal>
            </>
          ) : (
            <p
              style={{
                fontSize: "12px",
                color: "#19844A",
              }}
            >
              과소비 내역이 없습니다!
            </p>
          )}
        </Box>
      </Horizontal>
    </>
  );
}

export default DayStatisticsComponent;
