import React from "react";
import styled from "styled-components";
import { NoCenterHorizontal } from "../../../styles/CommunalStyle";

const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 300px;
  height: 112px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  background-color: #fcfffe;
`;

const TagCircle = styled.div`
  width: ${(props) => props.size || "60px"};
  height: ${(props) => props.size || "60px"};
  border-radius: 50%;
  border: none;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: "#0D6234";
  background-color: ${(props) => props.bgColor || "#D2F9E4"};
  margin-left: 16px;
  margin-right: 10px;
  font-size: ${(props) => (props.font ? `${props.font}px` : "14px")};
`;

const Graph = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: none;
  width: 80%;
`;

const GraphText = styled.p`
  width: 80px;
  font-family: "SUITLight";
  font-size: 8px;
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
  height: 10px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.width}%;
`;

const colors = ["#D2F9E4", "#D0FAF8", "#CDEEF9"];
const sizes = [
  "60px",
  "55px",
  "50px",
  "45px",
  "40px",
  "35px",
  "30px",
  "25px",
  "20px",
];

function CategoryDetailComponent({ userIncome, overspentData }) {
  return (
    <>
      <NoCenterHorizontal
        style={{
          flexWrap: "wrap",
          alignItems: "flex-start",
          width: "350px",
          height: "500px",
          overflowY: "scroll",
          padding: "10px 20px 20px 20px",
        }}
      >
        {overspentData?.map((item, index) => {
          const targetPercentage = (item.target / userIncome) * 800;
          const consumptionPercentage = item.consumption / targetPercentage;
          return (
            <Box>
              <TagCircle
                key={index}
                bgColor={colors[index % colors.length]}
                size={sizes[index % sizes.length]}
                font={14 - index * 2.5}
              >
                #{item.category}
              </TagCircle>
              <Graph>
                <NoCenterHorizontal>
                  <GraphText>목표 금액</GraphText>
                  <BarContainer>
                    <Bar bgColor={"#AFFFD4"} width={targetPercentage} />
                  </BarContainer>
                  <GraphText>{item.target}원</GraphText>
                </NoCenterHorizontal>
                <NoCenterHorizontal>
                  <GraphText> 사용 금액 </GraphText>
                  <BarContainer>
                    <Bar bgColor={"#19844A"} width={consumptionPercentage} />
                  </BarContainer>
                  <GraphText>{item.consumption}원</GraphText>
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