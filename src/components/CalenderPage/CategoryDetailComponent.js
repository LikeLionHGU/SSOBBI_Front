import styled from "styled-components";
import {
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";

const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 845px;
  height: 172px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  background-color: #fcfffe;
`;

const TagCircle = styled.div`
  width: ${(props) => props.size || "100px"};
  height: ${(props) => props.size || "100px"};
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: "#0D6234";
  background-color: ${(props) => props.bgColor || "#D2F9E4"};
  margin-left: 32px;
  margin-right: 36px;
  font-size: ${(props) => (props.font ? `${props.font}px` : "18px")};
`;

const Graph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  width: 80%;
`;

const GraphText = styled.p`
  width: 200px;
  font-family: "SUITLight";
  font-size: 18px;
  margin: 0;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const BarContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  width: 100%;
`;

const Bar = styled.div`
  height: 20px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width}%;
`;

const overspentData = [
  {
    category: "식비",
    used: 3000,
    goal: 1000,
  },
  {
    category: "교통비",
    used: 2400,
    goal: 100,
  },
  {
    category: "쇼핑",
    used: 300000,
    goal: 1000,
  },
  {
    category: "댄스학원",
    used: 45000,
    goal: 5000,
  },
  {
    category: "댄스학원",
    used: 45000,
    goal: 5000,
  },
  {
    category: "댄스학원",
    used: 45000,
    goal: 5000,
  },
];

function CategoryDetailComponent() {
  const colors = ["#D2F9E4", "#D0FAF8", "#CDEEF9"];
  const sizes = [
    "100px",
    "95px",
    "90px",
    "85px",
    "80px",
    "75px",
    "70px",
    "65px",
    "60px",
  ];
  return (
    <>
      <NoCenterHorizontal
        style={{
          flexWrap: "wrap",
          width: "850px",
          height: "600px",
          overflowY: "scroll",
          padding: "10px 20px 20px 20px",
        }}
      >
        {overspentData.map((item, index) => {
          const goalPercentage = item.goal / 100;
          const usedPercentage = (item.used / item.goal) * 10;
          return (
            <Box>
              <TagCircle
                key={index}
                bgColor={colors[index % colors.length]}
                size={sizes[index % sizes.length]}
                font={26 - index * 2.5}
              >
                #{item.category}
              </TagCircle>
              <Graph>
                <NoCenterHorizontal>
                  <GraphText>목표 금액</GraphText>
                  <BarContainer>
                    <Bar bgColor={"#AFFFD4"} width={goalPercentage} />
                  </BarContainer>
                  <GraphText>{item.goal}원</GraphText>
                </NoCenterHorizontal>
                <NoCenterHorizontal>
                  <GraphText> 사용 금액 </GraphText>
                  <BarContainer>
                    <Bar bgColor={"#19844A"} width={usedPercentage} />
                  </BarContainer>
                  <GraphText>{item.used}원</GraphText>
                </NoCenterHorizontal>
              </Graph>
            </Box>
          );
        })}
      </NoCenterHorizontal>
    </>
  );
}

export default CategoryDetailComponent;
