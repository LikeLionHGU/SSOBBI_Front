import { Link } from "react-router-dom";
import styled from "styled-components";
import CalenderComponent from "../components/MainPage/CalenderComponent";
import DayStatisticsComponent from "../components/MainPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../components/MainPage/WeekMonthStstisticsComponent";
import { Horizontal, Vertical } from "../styles/CommunalStyle";

const dayData = {
  happy: 74,
  cost: 250,
};

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function MainPage() {
  return (
    <>
      <Title>SSOBBI</Title>
      <Link to="/create">
        <button>오늘의 소비 입력</button>
      </Link>
      <Horizontal>
        <Vertical>
          <DayStatisticsComponent happy={dayData.happy} />
          <WeekMonthStstisticsComponent />
        </Vertical>
        <CalenderComponent />
      </Horizontal>
    </>
  );
}

export default MainPage;
