import styled from "styled-components";
import HappinessRateComponent from "../components/CreatePage/HappinessRateComponent";
import ContentComponent from "../components/CreatePage/ContentComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import { consumptionIndexState } from "../store/atom";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
} from "../styles/CommunalStyle";
import CalenderComponent from "../components/CreatePage/CalenderComponent";
import { useNavigate } from "react-router-dom";

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
  right: 28%; /*부모의 50%*/
  bottom: 10%;
  background-color: #2aa663;
  border-radius: 24px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  font-weight: 600;
  gap: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 1px transparent, 0 0 0 4px transparent,
      0 6px 16px rgba(0, 0, 0, 0.12) !important; /*그림자가 세개지만 마지막것만 표시된다.*/
    transform: translateX(-50%) scale(1.04);
  }
`;

function CreatePage() {
  const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const [inputCmpnt, setInputCmpnt] = useState(null); //inputComponent
  const [keyCounter, setKeyCounter] = useState(consumptions.length + 1); // id 1씩 증가시키기 위한 useState
  const navigate = useNavigate();
  function writeBtnClick() {
    setConsumptions((prev) =>
      prev.filter(
        (itm) => itm.category !== undefined && itm.consumption !== undefined
      )
    );
    navigate("/ssobbi/create/check");
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
    const existData = consumptions.map((itm, idx, arr) => ({
      key: itm.id,
      id: itm.id,
      category: itm.category,
      consumption: itm.consumption,
      focus: false,
      isLast: idx === arr.length - 1,
    }));
    const newData = [{ key: "1", id: "1" }];

    setInputCmpnt(consumptions.length === 0 ? newData : existData);
  }, [consumptions]); // 화면 처음 렌더링 될 때 기본 데이터 불러와서 화면에 띄우기, 이후 백엔드 api와 연결할 때 코드 똑같이 복사
  return (
    <Horizontal style={{ height: "100vh", alignItems: "flex-start" }}>
      <MenuBarComponent menu={"note"} />
      <Vertical
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "33px",
        }}
      >
        <div style={{ height: "158px" }} />
        <HappinessRateComponent />
        <ContentComponent />
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
      <NoCenterVertical style={{ marginLeft: "56px" }}>
        <div style={{ height: "158px" }} />
        <CalenderComponent />
      </NoCenterVertical>
    </Horizontal>
  );
}

export default CreatePage;
