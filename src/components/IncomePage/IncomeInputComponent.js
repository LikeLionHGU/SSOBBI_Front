import React, { useState } from "react";
import styled from "styled-components";
import { tokenState } from "../../store/atom";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    category: "식비",
    amount: 30000,
  },
  {
    category: "교통비",
    amount: 40000,
  },
];

const StyledInput = styled.input`
  width: 488px;
  height: 71px;
  border-radius: 20px;
  background: #fff;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  font-family: "SUITLight";
  font-size: 20px;
  font-weight: 400;
  padding-left: 45px;
  &:focus {
    outline: none;
    border: 1px solid rgba(42, 166, 99, 1);
  }
`;

const StyledBtn = styled.button`
  border-radius: 24px;
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  border: none;
  color: white;
  margin-left: 40px;
  font-family: "SUITLight";
  /* font-size: 20px; */
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;
function IncomeInputComponent(props) {
  const [monthIncome, setMonthIncome] = useState("");
  const userToken = useRecoilValue(tokenState);
  const navigate = useNavigate();
  function handleInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setMonthIncome(formattedNumber);
  }
  function activeEnter(e) {
    if (e.key === "Enter") {
      handleBtnClick();
    }
  }
  function handleBtnClick() {
    if (userToken === null) {
      alert("세션정보가 존재하지 않아 로그아웃됩니다");
      navigate("/");
    }
    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/monthly/income";
    const income = props.convertToInt(monthIncome);
    const newArr = { income: income };
    // 새로고침하면 토큰이 없어짐..
    // localStorage에 저장해서 쓰던지 다른 방법 고민좀,,
    axios
      .post(apiUrl, JSON.stringify(newArr), {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        //reponseData를 setTargetArgument에 저장
      })
      .catch((error) => {
        console.error(error);
      });
    props.setTargetAmount(dummyData);
  }
  return (
    <Wrapper>
      <StyledInput
        onChange={handleInputChange}
        value={monthIncome}
        onKeyDown={activeEnter}
      />
      <StyledBtn onClick={handleBtnClick}>입력하기</StyledBtn>
    </Wrapper>
  );
}

export default IncomeInputComponent;
