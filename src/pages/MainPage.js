import styled from "styled-components";
import Calendar from "react-calendar";
import "../styles/Calender.css";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function MainPage() {
  return (
    <>
      <Title>SSOBBI</Title>
      <Calendar />
    </>
  );
}

export default MainPage;
