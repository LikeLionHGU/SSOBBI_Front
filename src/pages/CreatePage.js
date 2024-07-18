import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import { priceInputState } from "../store/atom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import { Horizontal, Vertical } from "../styles/CommunalStyle";
import AddBtnImg from "../imgs/AddBtnImg.svg";

const BtnInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const AddBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid #2aa663;
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  cursor: pointer;
  margin-left: 16px;
  &:hover {
  }
`;

const AddImg = styled.img`
  width: 16px;
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
          <p style={{ marginTop: "16px" }}>
            OO님의 <strong>오늘 소비를 입력해주세요</strong>
          </p>
          <BtnInputWrapper>
            <div>{inputCmpnt}</div>
            {isPriceEnter && (
              <AddBtn onClick={handleBtnChange}>
                <AddImg src={AddBtnImg} alt="AddBtn" />
              </AddBtn>
            )}
          </BtnInputWrapper>
        </div>
      </Vertical>
    </Horizontal>
  );
}

export default CreatePage;
