import styled from "styled-components";
import { Horizontal } from "../../../styles/CommunalStyle";
import { useRecoilValue } from "recoil";
import { userData } from "../../../store/atom";

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  margin-right: 120px;
`;
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
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
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

const colors = ["#BEFEDB", "#C4FAF7", "#BDEFFF", "#C1FFAC"];
function DayStatisticsComponent({ dayData }) {
  const userInfo = useRecoilValue(userData);
  const dailyHappyRate = dayData.happinessRate;
  return (
    <>
      <Title>
        {userInfo.name}님의{" "}
        <span style={{ fontFamily: "SUITMedium" }}>오늘 소비 기록 </span>
      </Title>
      <HappyBox>
        {dailyHappyRate === null ? (
          "오늘의 행복지수를 입력해주세요 🙌🏻"
        ) : (
          <>
            <p style={{ marginTop: "5px", marginBottom: "5px" }}>
              {" "}
              오늘의 행복지수
            </p>
            <HappinessInput
              value={dailyHappyRate}
              type="range"
              min="0"
              max="100"
            />
            <p
              style={{
                margin: 0,
                marginLeft: `${dailyHappyRate * 2.5}px`,
              }}
            >
              {dailyHappyRate} %
            </p>
          </>
        )}
      </HappyBox>
      <Horizontal>
        <Box>
          오늘 과소비 건수
          {dayData.totalOverConsumptionCount ||
          dayData.totalOverConsumptionCount === 0 ? (
            <p>
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
            </p>
          ) : (
            <span
              style={{
                fontSize: "11px",
                color: "#19844A",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              오늘의 데이터 입력해주세요!
            </span>
          )}
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
                fontSize: "11px",
                color: "#19844A",
                marginTop: "20px",
                marginBottom: "20px",
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
