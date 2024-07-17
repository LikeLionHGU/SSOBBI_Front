import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function CreatePage() {
  return (
    <>
      <Title>SSOBBI Create</Title>
      <HappinessIndexComponent />
    </>
  );
}

export default CreatePage;
