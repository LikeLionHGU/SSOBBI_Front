import styled from "styled-components";
import HappinessIndexComponent from "../components/CreatePage/HappinessIndexComponent";
import EmotionIndexComponent from "../components/CreatePage/EmotionIndexComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import {
  happinessIndexState,
  importantIncidentState,
  consumptionIndexState,
} from "../store/atom";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import { Horizontal, Vertical } from "../styles/CommunalStyle";

const BtnInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const SubmitBtn = styled.button`
  position: fixed;
  display: flex;
  padding: 14px 19px;
  align-items: center;
  left: 80%; /*부모의 50%*/
  bottom: 500px;
  background-color: white;
  border-radius: 24px;
  transform: translateX(-50%);
  color: black;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  cursor: pointer;
`;

function CreatePage() {
  const happinessIndex = useRecoilValue(happinessIndexState);
  const importantIncident = useRecoilValue(importantIncidentState);
  const consumptionIndex = useRecoilValue(consumptionIndexState);
  const [inputCmpnt, setInputCmpnt] = useState(null); //inputComponent
  const [keyCounter, setKeyCounter] = useState(consumptionIndex.length + 1); // id 1씩 증가시키기 위한 useState
  function writeBtnClick() {
    const data = {
      happinessIndex: happinessIndex,
      importantIncident: importantIncident,
      consumptionIndex: consumptionIndex,
    };
    console.log(data);
  }
  function handleAddBtnClick() {
    setInputCmpnt((prev) => [
      ...prev.map((itm) => ({ ...itm, focus: false, isLast: false })),
      { key: keyCounter + 1, id: keyCounter + 1, focus: true, isLast: true },
    ]);
    setKeyCounter((prev) => prev + 1);
    console.log(inputCmpnt);
  }
  useEffect(() => {
    const existData = consumptionIndex.map((itm, idx, arr) => ({
      key: itm.id,
      id: itm.id,
      category: itm.category,
      consumption: itm.consumption,
      focus: false,
      isLast: idx === arr.length - 1,
    }));
    const newData = [{ key: "1", id: "1" }];

    setInputCmpnt(consumptionIndex.length === 0 ? newData : existData);
  }, [consumptionIndex]); // 화면 처음 렌더링 될 때 기본 데이터 불러와서 화면에 띄우기, 이후 백엔드 api와 연결할 때 코드 똑같이 복사
  return (
    <Horizontal style={{ height: "100%" }}>
      <MenuBarComponent menu={"note"} />
      <Vertical>
        <HappinessIndexComponent />
        <EmotionIndexComponent />
        <div>
          <p style={{ marginTop: "16px" }}>
            OO님의 <strong>오늘 소비를 입력해주세요</strong>
          </p>
          <BtnInputWrapper>
            <Vertical>
              {inputCmpnt &&
                inputCmpnt.map((item) => (
                  <ConsumptionIndexComponent
                    key={item.id}
                    id={item.id}
                    category={item.category}
                    consumption={item.consumption}
                    handleAddBtnClick={handleAddBtnClick}
                    focus={item.focus}
                    isLast={item.isLast}
                  />
                ))}
            </Vertical>
          </BtnInputWrapper>
        </div>
        <SubmitBtn onClick={writeBtnClick}>기록하기</SubmitBtn>
      </Vertical>
    </Horizontal>
  );
}

export default CreatePage;
