import React, { useEffect, useState } from "react";
import MenuBarComponent from "../../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  NoCenterVertical,
  NoCenterHorizontal,
} from "../../styles/CommunalStyle";
import ProfileComponent from "../../components/MyPage/ProfileComponent";
import MonthIncomeComponent from "../../components/MyPage/MonthIncomeComponent";
import CategoryAmountComponent from "../../components/MyPage/CategoryAmountComponent";
import { userData, tokenState } from "../../store/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AlarmComponent from "../../components/MyPage/AlarmComponent";
import DropDownComponent from "../../components/MainPage/DropDownComponent";
import LogoImg from "../../imgs/Logo.png";

const AmountUpdateBtn = styled.button`
  display: inline-flex;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 24px;
  font-family: "SUITLight";
  font-size: 17px;
  color: white;
  margin-left: 28px;
  margin-bottom: 7px;
  cursor: pointer;
  width: 90px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
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

const ScrollContainer = styled.div`
  overflow-y: scroll;
  height: 700px;
  padding-left: 33px;
  padding-right: 144px;
  width: 707px;
`;

function MyPage() {
  const userInfo = useRecoilValue(userData);
  const userToken = useRecoilValue(tokenState);
  const [isUpdating, setIsUpdating] = useState(false);
  const [amount, setAmount] = useState([]);
  const [isMinimumCategory, setIsMinimumCategory] = useState(false);
  const [keyCounter, setKeyCounter] = useState(1); // id 1씩 증가시키기 위한 useState
  const [isIncludeZero, setIsIncludeZero] = useState(false);
  const [monthIncome, setMonthIncome] = useState("");
  const [isIncludeEtcCategory, setIsIncludeEtcCategory] = useState(false);

  function handleAmountBtnClick() {
    setIsUpdating(true);
  }

  function handleAddBtnClick() {
    setAmount((prev) => [
      ...prev.map((itm) => ({ ...itm, isLast: false })),
      {
        category: "",
        amount: 0,
        isLast: true,
        id: keyCounter + 1,
        key: keyCounter + 1,
      },
    ]);
    setIsMinimumCategory(false);
    setIsIncludeZero(false);
    setIsIncludeEtcCategory(false);
    setKeyCounter((prev) => prev + 1);
  }

  function handleLoadBtnClick() {
    setIsIncludeEtcCategory(false);
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";

    const checkData = amount.map((itm) => {
      if (itm.amount === 0 || itm.amount === "0") {
        return true;
      } else {
        return false;
      }
    });

    if (checkData.includes(true)) {
      setIsIncludeZero(true);
      return;
    }
    setIsIncludeZero(false);

    const data = amount
      .filter(
        (itm) => itm.category !== "" && itm.amount !== "0" && itm.amount !== 0
      )
      .map((itm) => ({
        category: itm.category,
        amount: convertToInt(itm.amount),
      }));

    const newArr = { requests: data };
    console.log(newArr);
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        if (response) setIsUpdating(false);
      })
      .catch((error) => {
        console.log(error);
      });
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
        const data = response.data.responses.map((itm, idx, arr) => ({
          category: itm.category,
          amount: convertStringNum(itm.amount),
          isLast: idx === arr.length - 1,
          id: idx,
          key: idx,
        }));
        setAmount(data);
        setKeyCounter(data.length + 1);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);

  return (
    amount && (
      <Horizontal style={{ height: "100vh", overflow: "hidden" }}>
        <MenuBarComponent menu={"profile"} />
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
          <Horizontal
            style={{
              alignItems: "flex-start",
              paddingTop: "43px",
            }}
          >
            <NoCenterVertical style={{ alignItems: "flex-start" }}>
              <ScrollContainer>
                <ProfileComponent userInfo={userInfo} />
                <MonthIncomeComponent
                  userInfo={userInfo}
                  setMonthIncome={setMonthIncome}
                />
                <div style={{ paddingBottom: "120px" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      {amount.map((itm) => (
                        <CategoryAmountComponent
                          data={itm}
                          isUpdating={isUpdating}
                          amount={amount}
                          setAmount={setAmount}
                          setIsMinimumCategory={setIsMinimumCategory}
                          isLast={itm.isLast}
                          handleAddBtnClick={handleAddBtnClick}
                          monthIncome={monthIncome}
                          setIsIncludeEtcCategory={setIsIncludeEtcCategory}
                        />
                      ))}
                    </div>
                    {!isUpdating && (
                      <AmountUpdateBtn onClick={handleAmountBtnClick}>
                        수정하기
                      </AmountUpdateBtn>
                    )}
                    {isUpdating && (
                      <AmountUpdateBtn onClick={handleLoadBtnClick}>
                        저장하기
                      </AmountUpdateBtn>
                    )}
                  </div>
                  {isMinimumCategory && (
                    <ErrorMessage>
                      카테고리는 최소 2개 이상 있어야합니다
                    </ErrorMessage>
                  )}
                  {isIncludeZero && (
                    <ErrorMessage>목표금액은 0원일 수 없습니다</ErrorMessage>
                  )}
                  {isIncludeEtcCategory && (
                    <ErrorMessage>
                      기타 카테고리는 수정, 삭제할 수 없습니다
                    </ErrorMessage>
                  )}
                </div>
              </ScrollContainer>
            </NoCenterVertical>
            <NoCenterVertical style={{ marginLeft: "56px" }}>
              <AlarmComponent userInfo={userInfo} />
            </NoCenterVertical>
          </Horizontal>
        </NoCenterVertical>
      </Horizontal>
    )
  );
}

export default MyPage;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
