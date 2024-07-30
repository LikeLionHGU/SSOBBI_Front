import styled from "styled-components";
import HappinessRateComponent from "../components/CreatePage/HappinessRateComponent";
import ContentComponent from "../components/CreatePage/ContentComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import { consumptionIndexState, tokenState } from "../store/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import moment from "moment";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
  NoCenterHorizontal,
} from "../styles/CommunalStyle";
import CalenderComponent from "../components/CreatePage/CalenderComponent";
import { useNavigate } from "react-router-dom";
import LogoImg from "../imgs/Logo.png";
import axios from "axios";

//TODO: API명세서 보고 다시 수정하기

const BtnInputWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
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
  const [selectDate, setSelectDate] = useState(moment().format("YYYY-MM-DD"));
  const month = selectDate.slice(5, 7).padStart(2, "0");
  const day = selectDate.slice(-2).padStart(2, "0");
  const [targetAmount, setTargetAmount] = useState(null);
  const [options, setOptions] = useState(null);
  const userToken = useRecoilValue(tokenState);
  const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const [inputCmpnt, setInputCmpnt] = useState(null); //inputComponent
  const [keyCounter, setKeyCounter] = useState(consumptions.length + 1); // id 1씩 증가시키기 위한 useState
  const navigate = useNavigate();
  function writeBtnClick() {
    setConsumptions((prev) =>
      prev
        .filter(
          (itm) => itm.category !== undefined && itm.consumption !== undefined
        )
        .map((itm) => {
          // 현재 아이템과 일치하는 targetAmount 항목 찾기
          const target = targetAmount.find((t) => t.category === itm.category);
          // 일치하는 targetAmount 항목이 있으면 아이템을 업데이트
          if (target) {
            return {
              ...itm,
              targetAmount: target.amount,
              consumption: convertToInt(itm.consumption),
            };
          }
          // 일치하는 항목이 없으면 원래 아이템을 반환
          return itm;
        })
    );
    navigate("/ssobbi/create/check", {
      state: { date: selectDate },
    });
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
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data.responses;
        setTargetAmount(data);
        setOptions(data.map((itm) => itm.category));
      })
      .catch((error) => {
        console.log(error);
      });
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
    <Horizontal style={{ height: "100vh", overflowY: "hidden" }}>
      <MenuBarComponent menu={"note"} />
      <NoCenterVertical
        style={{
          height: "100vh",
          justifyContent: "flex-start",
          marginTop: "40px",
        }}
      >
        <NoCenterHorizontal>
          <Horizontal
            style={{
              justifyContent: "flex-start",
              marginLeft: "25px",
              marginTop: "30px",
            }}
          >
            <Logo src={LogoImg} />
            <Title>SSOBBI</Title>
          </Horizontal>
          <DropDownComponent />
        </NoCenterHorizontal>
        <NoCenterHorizontal>
          <Vertical
            style={{
              justifyContent: "flex-start",
              alignItems: "flex-start",
              height: "100vh",
              marginRight: "28px;",
            }}
          >
            <div
              style={{
                overflowY: "scroll",
                height: "700px",
                paddingLeft: "45px",
                paddingRight: "60px",
              }}
            >
              <HappinessRateComponent month={month} day={day} />
              <ContentComponent />
              <div>
                <p style={{ marginTop: "16px" }}>
                  OO님의{" "}
                  <strong>
                    {month}월 {day}일 소비를 입력해주세요
                  </strong>
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
                          options={options}
                        />
                      ))}
                  </Vertical>
                </BtnInputWrapper>
              </div>
              <SubmitBtn onClick={writeBtnClick}>기록하기</SubmitBtn>
            </div>
          </Vertical>
          <NoCenterVertical style={{ marginLeft: "28px", height: "100vh" }}>
            <CalenderComponent setSelectDate={setSelectDate} />
          </NoCenterVertical>
        </NoCenterHorizontal>
      </NoCenterVertical>
    </Horizontal>
  );
}

export default CreatePage;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
