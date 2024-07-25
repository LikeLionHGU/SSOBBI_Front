import styled from "styled-components";
import { NoCenterHorizontal } from "../../styles/CommunalStyle";

const Box = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  width: 260px;
  height: 192px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #fcfffe;
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
  return (
    <>
      <NoCenterHorizontal style={{ flexWrap: "wrap", width: "1190px" }}>
        {overspentData.map((item, index) => (
          <Box>
            <p>{item.category}</p>
            {item.used} / {item.goal}
          </Box>
        ))}
      </NoCenterHorizontal>
    </>
  );
}

export default CategoryDetailComponent;
