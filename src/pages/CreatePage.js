import styled from "styled-components";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function CreatePage() {
  return (
    <>
      <Title>SSOBBI Create</Title>
    </>
  );
}

export default CreatePage;
