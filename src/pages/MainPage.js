import styled from "styled-components";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import CalenderComponent from "../components/MainPage/CalenderComponent";
import DayStatisticsComponent from "../components/MainPage/DayStatisticsComponent";
import WeekMonthStstisticsComponent from "../components/MainPage/WeekMonthStstisticsComponent";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../styles/CommunalStyle";

import LogoImg from "../imgs/Logo.png";

const dayData = {
  happy: 74,
  cost: 250,
};

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;

const Box = styled.div`
  width: 820px;
  height: 113px;
  margin-top: 36px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function MainPage() {
  return (
    <>
      <Horizontal style={{ height: "100vh", overflowY: "hidden" }}>
        <MenuBarComponent />
        <NoCenterVertical
          style={{
            height: "100vh",
            justifyContent: "flex-start",
            marginTop: "40px",
          }}
        >
          <NoCenterHorizontal>
            <Horizontal
              style={{
                justifyContent: "flex-start",
                marginLeft: "25px",
                marginBottom: "43px",
              }}
            >
              <Logo src={LogoImg} />
              <Title>SSOBBI</Title>
            </Horizontal>
            <DropDownComponent />
          </NoCenterHorizontal>
          <Horizontal>
            <Vertical
              style={{
                alignItems: "flex-start",
                marginLeft: "30px",
                marginRight: "50px",
              }}
            >
              <DayStatisticsComponent happy={dayData.happy} />
              <Box>오늘의 일기랄까</Box>
              <WeekMonthStstisticsComponent />
            </Vertical>
            <CalenderComponent />
          </Horizontal>
        </NoCenterVertical>
      </Horizontal>
    </>
  );
}

export default MainPage;
