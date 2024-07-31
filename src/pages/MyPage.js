import React, { useEffect, useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
  NoCenterHorizontal,
} from "../styles/CommunalStyle";
import ProfileComponent from "../components/MyPage/ProfileComponent";
import MonthIncomeComponent from "../components/MyPage/MonthIncomeComponent";
import CategoryAmountComponent from "../components/MyPage/CategoryAmountComponent";
import { tokenState } from "../store/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AlarmComponent from "../components/MyPage/AlarmComponent";
import DropDownComponent from "../components/MainPage/DropDownComponent";
import LogoImg from "../imgs/Logo.png";

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
`;

const ErrorMessage = styled.p`
  color: red;
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

function MyPage() {
  const userToken = useRecoilValue(tokenState);
  const [isUpdating, setIsUpdating] = useState(false);
  const [amount, setAmount] = useState(null);
  const [categories, setCategories] = useState(null);
  const [isMinimumCategory, setIsMinimumCategory] = useState(false);
  function handleAmountBtnClick() {
    setIsUpdating(true);
  }
  function handleAddBtnClick() {
    setAmount((prev) => [
      ...prev.map((itm) => ({ ...itm, isLast: false })),
      { category: "", amount: "", isLast: true },
    ]);
    setIsMinimumCategory(false);
  }
  function haveSameCategory(array1, array2) {
    // 배열의 길이가 다르면 동일할 수 없으므로 false 반환
    if (array1.length !== array2.length) {
      return false;
    }
    const category1 = new Set(array1.map((item) => item.category));
    const category2 = new Set(array2.map((item) => item.category));
    if (category1.size !== category2.size) {
      return false;
    }
    for (const category of category1) {
      if (!category2.has(category)) {
        return false;
      }
    }
    return true;
  }
  function handleLoadBtnClick() {
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    const data = amount.map((itm) => ({
      category: itm.category,
      amount: itm.amount,
    }));

    const newArr = { requests: data };
    if (haveSameCategory(data, categories)) {
      axios
        .patch(apiUrl, newArr, {
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
    } else {
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
          amount: itm.amount,
          isLast: idx === arr.length - 1,
        }));
        setAmount(data);
        setCategories(data.map((itm) => ({ category: itm.category })));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    amount && (
      <Horizontal style={{ height: "100vh", overflow: "hidden" }}>
        <MenuBarComponent menu={"profile"} />
        <Vertical
          style={{
            alignItems: "flex-start",
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
          <Horizontal
            style={{
              alignItems: "flex-start",
              paddingTop: "43px",
            }}
          >
            <NoCenterVertical
              style={{
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  overflowY: "scroll",
                  height: "700px",
                  paddingLeft: "33px",
                  paddingRight: "210px",
                }}
              >
                <ProfileComponent />
                <MonthIncomeComponent />
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
                      />
                    ))}
                  </div>
                  {isUpdating === false && (
                    <AmountUpdateBtn onClick={handleAmountBtnClick}>
                      수정하기
                    </AmountUpdateBtn>
                  )}
                  {isUpdating === true && (
                    <AmountUpdateBtn onClick={handleLoadBtnClick}>
                      저장하기
                    </AmountUpdateBtn>
                  )}
                </div>
                {isMinimumCategory === true && (
                  <ErrorMessage>카테고리는 최소 2개 이상 있어야함</ErrorMessage>
                )}
              </div>
            </NoCenterVertical>
            <NoCenterVertical style={{ marginLeft: "56px" }}>
              <AlarmComponent />
            </NoCenterVertical>
          </Horizontal>
        </Vertical>
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
