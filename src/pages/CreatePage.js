import styled from "styled-components";
import HappinessRateComponent from "../components/CreatePage/HappinessRateComponent";
import ContentComponent from "../components/CreatePage/ContentComponent";
import ConsumptionIndexComponent from "../components/CreatePage/ConsumptionIndexComponent";
import {
  consumptionIndexState,
  tokenState,
  happinessRateState,
  contentState,
} from "../store/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const [id, setId] = useState(null);
  const setHappiness = useSetRecoilState(happinessRateState);
  const setContent = useSetRecoilState(contentState);
  const [keyCounter, setKeyCounter] = useState(1); // id 1씩 증가시키기 위한 useState
  const navigate = useNavigate();

  function writeBtnClick() {
    setConsumptions((prev) =>
      prev
        .filter((itm) => itm.category !== undefined && itm.amount !== undefined)
        .map((itm) => {
          const target = targetAmount.find((t) => t.category === itm.category);
          if (target) {
            return {
              category: itm.category,
              targetAmount: target.amount,
              amount: convertToInt(itm.amount),
            };
          }
          return itm;
        })
    );
    if (id !== null) {
      navigate(`/ssobbi/create/check?id=${id}`, {
        state: { date: selectDate },
      });
    } else {
      navigate("/ssobbi/create/check", {
        state: { date: selectDate },
      });
    }
  }

  function handleAddBtnClick() {
    setConsumptions((prev) => [
      ...prev.map((itm) => ({ ...itm, focus: false, isLast: false })),
      { key: keyCounter + 1, id: keyCounter + 1, focus: true, isLast: true },
    ]);
    setKeyCounter((prev) => prev + 1);
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
  }, [userToken]); // userToken이 변경될 때마다 API 호출

  useEffect(() => {
    setConsumptions([]);
    const apiUrl =
      process.env.REACT_APP_BASE_URL + `/records/daily/${selectDate}`;
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.isRecorded) {
          setHappiness(data.happinessRate);
          setContent(data.content);
          const newArr = data.consumptions.map((itm, idx, arr) => ({
            key: idx,
            id: idx,
            category: itm.category,
            amount: itm.amount,
            focus: false,
            isLast: idx === arr.length - 1,
          }));
          setConsumptions(newArr);
          setId(data.id);
        } else {
          setHappiness(0);
          setContent(" ");
          const newArr = [
            {
              key: 1,
              id: 1,
              category: " ",
              amount: 0,
              focus: false,
              isLast: true,
            },
          ];
          setConsumptions(newArr);
          setId(null);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectDate, userToken, setHappiness, setContent, setConsumptions]);

  return (
    options && (
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
              <a href="/ssobbi">
                <Logo src={LogoImg} />
              </a>
              <a href="/ssobbi" style={{ textDecoration: "none" }}>
                <Title>SSOBBI</Title>
              </a>
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
                      {consumptions.map((item) => (
                        <>
                          <ConsumptionIndexComponent
                            key={item.id}
                            id={item.id}
                            category={item.category}
                            amount={item.amount}
                            handleAddBtnClick={handleAddBtnClick}
                            focus={item.focus}
                            isLast={item.isLast}
                            options={options}
                          />
                        </>
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
    )
  );
}

export default CreatePage;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  return parseInt(numberWithoutCommas, 10);
}
