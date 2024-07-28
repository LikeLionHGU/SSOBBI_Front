import React, { useEffect, useState } from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
} from "../styles/CommunalStyle";
import ProfileComponent from "../components/MyPage/ProfileComponent";
import MonthIncomeComponent from "../components/MyPage/MonthIncomeComponent";
import CategoryAmountComponent from "../components/MyPage/CategoryAmountComponent";
import { tokenState } from "../store/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import CalenderComponent from "../components/CreatePage/CalenderComponent";

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
`;

function MyPage() {
  const userToken = useRecoilValue(tokenState);
  const [amount, setAmount] = useState(null);
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
  }, [amount, userToken]);
  return (
    amount && (
      <Horizontal style={{ height: "100vh" }}>
        <MenuBarComponent />
        <Vertical
          style={{
            alignItems: "flex-start",
            marginLeft: "33px",
            marginRight: "217px",
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
                <CategoryAmountComponent data={itm} />
              ))}
            </div>
            <AmountUpdateBtn>수정하기</AmountUpdateBtn>
          </div>
        </Vertical>
        <NoCenterVertical style={{ marginLeft: "56px" }}>
          <div style={{ height: "158px" }} />
          <CalenderComponent />
        </NoCenterVertical>
      </Horizontal>
    )
  );
}

export default MyPage;
