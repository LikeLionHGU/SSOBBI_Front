import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Horizontal,
  NoCenterHorizontal,
  Vertical,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import ProfileComponent from "../../components/MobComponent/MobMyPage/ProfileComponent";
import IncomeComponent from "../../components/MobComponent/MobMyPage/IncomeComponent";
import CategoryAmountComponent from "../../components/MobComponent/MobMyPage/CategoryAmountComponent";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import MobMenuBarComponent from "./MobMenuBarComponent";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  /* height: 100vh; */
`;

const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  margin: 0;
`;

const Title2 = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
`;

const TitleAndInputWrapper = styled.div`
  width: 319px;
  margin-top: 32px;
`;

const AmountUpdateBtn = styled.button`
  position: fixed;
  bottom: 90px;
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
  transform: translateX(120%);
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-family: "SUITLight";
  font-size: 16px;
`;

function MobMyPage() {
  const userToken = useRecoilValue(tokenState);
  const [amount, setAmount] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isMinimumCategory, setIsMinimumCategory] = useState(false);
  const [monthIncome, setMonthIncome] = useState("");

  function handleAddBtnClick() {
    const data = [
      ...amount.map((itm) => ({ ...itm, isLast: false })),
      { category: "", amount: 0, isLast: true },
    ];

    console.log(data);
    setAmount((prev) => [
      ...prev.map((itm) => ({ ...itm, isLast: false })),
      { category: "", amount: 0, isLast: true },
    ]);
    setIsMinimumCategory(false);
  }

  function handleAmountBtnClick() {
    setIsUpdating(true);
  }

  function handleLoadBtnClick() {
    setIsClick(true);
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";

    const data = amount
      .filter((itm) => itm.category !== "" && itm.amount !== 0)
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
        }));
        setAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);
  return (
    <MobileV>
      <Vertical
        style={{
          justifyContent: "flex-start",
          marginTop: "40px",
          width: "375px",
        }}
      >
        <NoCenterHorizontal>
          <Horizontal
            style={{
              justifyContent: "flex-start",
              marginLeft: "25px",
            }}
          >
            <a href="/ssobbi">
              <Logo src={LogoImg} />
            </a>
            <a href="/ssobbi" style={{ textDecoration: "none" }}>
              <Title>SSOBBI</Title>
            </a>
          </Horizontal>
        </NoCenterHorizontal>
        <ProfileComponent />
        <IncomeComponent
          isUpdating={isUpdating}
          isClick={isClick}
          setIsClick={setIsClick}
          setMonthIncome={setMonthIncome}
        />
        <TitleAndInputWrapper>
          <Title2>카테고리별 목표금액</Title2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {amount.map((itm) => (
              <CategoryAmountComponent
                data={itm}
                isUpdating={isUpdating}
                amount={amount}
                setAmount={setAmount}
                isLast={itm.isLast}
                setIsMinimumCategory={setIsMinimumCategory}
                handleAddBtnClick={handleAddBtnClick}
                monthIncome={monthIncome}
              />
            ))}
          </div>
        </TitleAndInputWrapper>
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
        <MobMenuBarComponent menu={"profile"} />
        {isMinimumCategory && (
          <ErrorMessage>카테고리는 최소 2개 이상 있어야합니다</ErrorMessage>
        )}
      </Vertical>
    </MobileV>
  );
}

export default MobMyPage;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
