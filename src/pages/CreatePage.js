import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import { priceInputState } from "../store/atom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import { Horizontal, Vertical } from "../styles/CommunalStyle";

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
      ...prev.map((itm) => ({ ...itm, focus: false })),
      <ConsumptionIndexComponent
        key={prev.length}
        handleBtnChange={handleBtnChange}
        focus={true}
      />,
    ]);
  }
  return (
    <Horizontal style={{ height: "100%" }}>
      <MenuBarComponent />
      <Vertical>
        <HappinessIndexComponent />
        <EmotionIndexComponent />
        <div>
          <p>
            OO님의 <strong>오늘 소비를 입력해주세요</strong>
          </p>
          {inputCmpnt}
          {isPriceEnter && <button onClick={handleBtnChange}>추가</button>}
        </div>
      </Vertical>
    </Horizontal>
  );
}

export default CreatePage;
