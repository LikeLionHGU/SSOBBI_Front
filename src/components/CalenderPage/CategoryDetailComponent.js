import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import styled from "styled-components";
import { NoCenterHorizontal } from "../../styles/CommunalStyle";

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

// const overspentData = [
//   {
//     category: "식비",
//     used: 3000,
//     goal: 1000,
//   },
//   {
//     category: "교통비",
//     used: 2400,
//     goal: 100,
//   },
//   {
//     category: "쇼핑",
//     used: 300000,
//     goal: 1000,
//   },
//   {
//     category: "댄스학원",
//     used: 45000,
//     goal: 5000,
//   },
//   {
//     category: "댄스학원",
//     used: 45000,
//     goal: 5000,
//   },
//   {
//     category: "댄스학원",
//     used: 45000,
//     goal: 5000,
//   },
// ];
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

function CategoryDetailComponent({ apiMonth }) {
  const userToken = useRecoilValue(tokenState);
  const [overspentData, setOverspentData] = useState(null);

  //TODO: API 개발 배포 완료시 연결
  useEffect(() => {
    const fetchOverspentData = async () => {
      try {
        const overspent = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/consumptions/${apiMonth}/category`,
          {
            headers: {
              Authorization: "Bearer " + userToken,
            },
          }
        );
        setOverspentData(
          overspent.data.monthlyConsumptionsAndTargetsByCategory
        );
        console.log(
          "setOverspentData: ",
          overspent.data.monthlyConsumptionsAndTargetsByCategory
        );
      } catch (err) {
        console.log("error: ", err);
      }
    };
    fetchOverspentData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {overspentData?.map((item, index) => {
          const targetPercentage = item.target / 100;
          const consumptionPercentage = (item.consumption / item.target) * 10;
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
