import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import { priceInputState } from "../store/atom";
import { useRecoilState } from "recoil";
import { useState } from "react";

const Title = styled.p`
  color: ${(props) => props.theme.colors.MAINCOLOR};
`;

function CreatePage() {
  const [isPriceEnter, setIsPriceEnter] = useRecoilState(priceInputState);
  const [inputCmpnt, setInputCmpnt] = useState([
    <ConsumptionIndexComponent key={0} handleBtnChange={handleBtnChange} />,
  ]);
  function handleBtnChange() {
    setIsPriceEnter(false);
    setInputCmpnt((prev) => [
      ...prev,
      <ConsumptionIndexComponent
        key={prev.length}
        handleBtnChange={handleBtnChange}
      />,
    ]);
  }
  return (
    <>
      <Title>SSOBBI Create</Title>
      <HappinessIndexComponent />
      <EmotionIndexComponent />
      <div>
        <p>
          OO님의 <strong>오늘 소비를 입력해주세요</strong>
        </p>
        {inputCmpnt}
        {isPriceEnter && <button onClick={handleBtnChange}>추가</button>}
      </div>
    </>
  );
}

export default CreatePage;
