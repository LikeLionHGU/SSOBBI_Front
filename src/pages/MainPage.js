import styled from "styled-components";
import Calender from "../components/MainPage/Calender";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function MainPage() {
  return (
    <>
      <Title>SSOBBI</Title>
      <Calender />
    </>
  );
}

export default MainPage;
