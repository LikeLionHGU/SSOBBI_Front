import styled from "styled-components";
import GaugeComponent from "react-gauge-component";

import { Horizontal } from "../../styles/CommunalStyle";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

const Box = styled.div`
  width: 300px;
  height: 250px;
  margin: 20px;
  border: 1px black solid;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function DayStatisticsComponent({ happy }) {
  return (
    <>
      <Title>SSOBBI 오늘의 기록</Title>
      <Horizontal>
        <Box>
          행복지수
          <GaugeComponent
            arc={{
              subArcs: [
                {
                  limit: 20,
                  color: "#EA4228",
                  showTick: true,
                },
                {
                  limit: 50,
                  color: "#F58B19",
                  showTick: true,
                },
                {
                  limit: 70,
                  color: "#F5CD19",
                  showTick: true,
                },
                {
                  limit: 100,
                  color: "#5BE12C",
                  showTick: true,
                },
              ],
            }}
            value={happy}
          />
        </Box>
        <Box>
          오늘 과소비 건수
          <p style={{ fontSize: "30px", fontWeight: "bold" }}>1 건</p>
        </Box>
        <Box></Box>
      </Horizontal>
    </>
  );
}

export default DayStatisticsComponent;
