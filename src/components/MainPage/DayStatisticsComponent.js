import styled from "styled-components";
import GaugeComponent from "react-gauge-component";

import { Horizontal } from "../../styles/CommunalStyle";

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

const tags = [
  { tag: "패션" },
  { tag: "음식" },
  { tag: "쇼핑" },
  { tag: "교통비" },
];
const colors = ["#BEFEDB", "#C4FAF7", "#BDEFFF", "#C1FFAC"];
function DayStatisticsComponent({ happy }) {
  return (
    <>
      <Title>
        한나님의 <span style={{ fontFamily: "SUITMedium" }}>오늘의 기록 </span>
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
            value={happy}
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
            <span
              style={{
                fontSize: "60px",
                fontFamily: "SUITExtraBold",
                fontWeight: "bold",
                color: "#19844A",
              }}
            >
              1
            </span>
            {"   "}건
          </p>
        </Box>
        <Box>
          오늘 과소비 항목
          <Horizontal
            style={{ width: "200px", flexWrap: "wrap", marginTop: "15px" }}
          >
            {tags.map((item, index) => (
              <TagBox key={index} color={colors[index % colors.length]}>
                # {item.tag}
              </TagBox>
            ))}
          </Horizontal>
        </Box>
      </Horizontal>
    </>
  );
}

export default DayStatisticsComponent;
