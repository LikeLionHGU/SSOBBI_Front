import styled from "styled-components";
import GaugeComponent from "react-gauge-component";

import { Horizontal } from "../../styles/CommunalStyle";
import { useRecoilValue } from "recoil";
import { userData } from "../../store/atom";

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 20px;
`;

const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 260px;
  height: 192px;
  margin-right: 25px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fcfffe;
`;

const TagBox = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 80px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: ${({ color }) => color || "#BEFEDB"};
  margin: 5px;
`;

const colors = ["#BEFEDB", "#C4FAF7", "#BDEFFF", "#C1FFAC"];
function DayStatisticsComponent({ dayData }) {
  const userInfo = useRecoilValue(userData);
  return (
    <>
      <Title>
        {userInfo.name}님의{" "}
        <span style={{ fontFamily: "SUITMedium" }}>오늘의 기록 </span>
      </Title>
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
            value={dayData.happinessRate ? dayData.happinessRate : 0}
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
          오늘 과소비 건수
          <p
            style={{ fontSize: "35px", fontWeight: "bold", marginTop: "20px" }}
          >
            {dayData.totalOverConsumptionCount ? (
              <>
                <span
                  style={{
                    fontSize: "60px",
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
              <span style={{ fontSize: "18px", color: "#19844A" }}>
                오늘의 데이터 입력해주세요!
              </span>
            )}
          </p>
        </Box>
        <Box>
          오늘 과소비 항목
          {dayData.overConsumptionCategories ? (
            <>
              <Horizontal
                style={{ width: "200px", flexWrap: "wrap", marginTop: "15px" }}
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
                fontSize: "18px",
                marginTop: "37px",
                marginBottom: "43px",
                color: "#19844A",
              }}
            >
              오늘의 데이터 입력해주세요!
            </p>
          )}
        </Box>
      </Horizontal>
    </>
  );
}

export default DayStatisticsComponent;
