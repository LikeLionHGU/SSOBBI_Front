import styled from "styled-components";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function MainPage() {
  return (
    <>
      <Title>SSOBBI</Title>
    </>
  );
}

export default MainPage;
