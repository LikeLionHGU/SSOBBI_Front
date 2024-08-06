import React, { useEffect, useRef, useState } from "react";
import { NoCenterVertical } from "../../../styles/CommunalStyle";
import styled from "styled-components";
import axios from "axios";
import { tokenState, userData } from "../../../store/atom";
import { useRecoilValue } from "recoil";

const MonthIncome = styled.input`
  width: 206px;
  height: 48px;
  border-radius: 20px;
  border: none;
  outline: ${(props) =>
    props.readOnly === false ? "1px solid var(--70, #3FC87E)" : "none"};
  font-family: "SUITLight";
  font-size: 14px;
  padding-left: 20px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.03);
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
`;

// const UpdateBtn = styled.button`
//   display: inline-flex;
//   padding: 12px 14px;
//   justify-content: center;
//   align-items: center;
//   gap: 14px;
//   background: #2aa663;
//   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
//   border: none;
//   border-radius: 24px;
//   font-family: "SUITLight";
//   font-size: 17px;
//   color: white;
//   margin-left: 28px;
//   cursor: pointer;
// `;

const Unit = styled.span`
  font-family: "SUITLight";
  font-size: 14px;
  position: absolute;
  right: 110px;
  top: 15px;
`;

const InputBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
`;

function IncomeComponent({ isUpdating, isClick, setIsClick, setMonthIncome }) {
  const userInfo = useRecoilValue(userData);
  const [income, setIncome] = useState(null);
  const userToken = useRecoilValue(tokenState);
  const incomeRef = useRef("");

  // eslint-disable-next-line no-unused-vars
  function handleSubmitBtnClick() {
    const newArr = { income: convertToInt(income) };
    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/monthly/income";
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleIncomeChange(e) {
    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setIncome(formattedNumber);
  }

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/monthly/income";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const formattedNumber = new Intl.NumberFormat().format(
          response.data.income
        );
        setIncome(formattedNumber);
        setMonthIncome(response.data.income);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating, userToken]);

  useEffect(() => {
    if (isUpdating && isClick) {
      const newArr = { income: convertToInt(income) };
      const apiUrl = process.env.REACT_APP_BASE_URL + "/user/monthly/income";
      console.log(newArr);
      setMonthIncome(convertToInt(income));
      axios
        .post(apiUrl, newArr, {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          setIsClick(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClick, isUpdating]);
  return (
    <div style={{ width: "319px", marginTop: "32px" }}>
      <Title>{userInfo.name}님의 한달 수입</Title>
      <NoCenterVertical style={{ justifyContent: "" }}>
        <InputBtnWrapper>
          <MonthIncome
            readOnly={!isUpdating}
            value={income}
            onChange={handleIncomeChange}
            ref={incomeRef}
          />
          <Unit>원</Unit>
        </InputBtnWrapper>
      </NoCenterVertical>
    </div>
  );
}

export default IncomeComponent;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
