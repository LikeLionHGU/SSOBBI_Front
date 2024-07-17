import { Link } from "react-router-dom";
import styled from "styled-components";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import CalenderComponent from "../components/MainPage/CalenderComponent";
import DayStatisticsComponent from "../components/MainPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../components/MainPage/WeekMonthStstisticsComponent";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
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
      <Horizontal style={{ height: "100%" }}>
        <MenuBarComponent />
        <Vertical>
          <Horizontal>
            <Title>SSOBBI</Title>
            <Link to="/create">
              <button>오늘의 소비 입력</button>
            </Link>
            <DropDownComponent />
          </Horizontal>
          <DayStatisticsComponent happy={dayData.happy} />
          <WeekMonthStstisticsComponent />
        </Vertical>
        <CalenderComponent />
      </Horizontal>
    </>
  );
}

export default MainPage;
