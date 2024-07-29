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
import CalenderComponent from "../components/CreatePage/CalenderComponent";
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
  const [isMinimumCategory, setIsMinimumCategory] = useState(false);
  function handleAmountBtnClick() {
    setIsUpdating(true);
  }
  function handleAddBtnClick() {
    setAmount((prev) => [...prev, { category: "", amount: "" }]);
    setIsMinimumCategory(false);
  }
  function handleLoadBtnClick() {
    console.log(amount);
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    const newArr = {
      request: amount,
    };
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
        setAmount(response.data.responses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    amount && (
      <Horizontal style={{ height: "100vh", overflow: "hidden" }}>
        <MenuBarComponent />
        <Vertical
          style={{
            alignItems: "flex-start",
            marginRight: "217px",
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
                }}
              >
                <ProfileComponent />
                <MonthIncomeComponent />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
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
                      />
                    ))}
                  </div>
                  {isUpdating === false && (
                    <AmountUpdateBtn onClick={handleAmountBtnClick}>
                      수정하기
                    </AmountUpdateBtn>
                  )}
                </div>
                {isUpdating === true && (
                  <button onClick={handleAddBtnClick}>추가하기</button>
                )}
                {isMinimumCategory === true && (
                  <ErrorMessage>카테고리는 최소 2개 이상 있어야함</ErrorMessage>
                )}
                {isUpdating === true && (
                  <AmountUpdateBtn onClick={handleLoadBtnClick}>
                    저장하기
                  </AmountUpdateBtn>
                )}
              </div>
            </NoCenterVertical>
            <NoCenterVertical style={{ marginLeft: "56px" }}>
              <CalenderComponent />
            </NoCenterVertical>
          </Horizontal>
        </Vertical>
      </Horizontal>
    )
  );
}

export default MyPage;
