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
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function DayStatisticsComponent({ happy }) {
  return (
    <>
      <Title>
        한나님의 <span style={{ fontWeight: "800" }}>오늘의 기록 </span>
      </Title>
      <Horizontal>
        <Box>
          오늘의 행복지수
          <GaugeComponent
            arc={{
              subArcs: [
                {
                  limit: 20,
                  color: "#D0FFE5",
                  showTick: true,
                },
                {
                  limit: 50,
                  color: "#8FFFC2",
                  showTick: true,
                },
                {
                  limit: 70,
                  color: "#57EA9B",
                  showTick: true,
                },
                {
                  limit: 100,
                  color: "#2AA663",
                  showTick: true,
                },
              ],
            }}
            value={happy}
          />
        </Box>
        <Box>
          오늘 과소비 건수
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>
            <span
              style={{
                fontSize: "55px",
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
        <Box>오늘 과소비 항목</Box>
      </Horizontal>
    </>
  );
}

export default DayStatisticsComponent;
