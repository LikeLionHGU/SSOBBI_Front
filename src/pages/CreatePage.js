import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function CreatePage() {
  return (
    <>
      <Title>SSOBBI Create</Title>
      <HappinessIndexComponent />
      <EmotionIndexComponent />
      <ConsumptionIndexComponent />
    </>
  );
}

export default CreatePage;
