import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function CreatePage() {
  return (
    <>
      <Title>SSOBBI Create</Title>
      <HappinessIndexComponent />
      <EmotionIndexComponent />
    </>
  );
}

export default CreatePage;
