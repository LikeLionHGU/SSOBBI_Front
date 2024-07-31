import React, { useRef, useState } from "react";
import { Vertical } from "../../styles/CommunalStyle";
import styled from "styled-components";
import axios from "axios";
import { tokenState } from "../../store/atom";
import { useRecoilValue } from "recoil";

const MonthIncome = styled.input`
  width: 381px;
  height: 60px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  outline: ${(props) =>
    props.readOnly === false ? "1px solid var(--70, #3FC87E)" : "none"};
  font-family: "SUITLight";
  font-size: 17px;
  padding-left: 20px;
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
  > span {
    font-family: "SUITSemiBold";
  }
`;

const UpdateBtn = styled.button`
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
  cursor: pointer;
`;

const Unit = styled.span`
  font-family: "SUITLight";
  font-size: 17px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const InputBtnWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

function MonthIncomeComponent() {
  const [income, setIncome] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const userToken = useRecoilValue(tokenState);
  const incomeRef = useRef("");

  function handleSubmitBtnClick() {
    const newArr = { requests: [{ income: convertToInt(income) }] };
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
        if (response) setIsUpdating(false);
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

  // useEffect(() => {
  //   axios
  //     .get(apiUrl, {
  //       headers: {
  //         Authorization: "Bearer " + userToken,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       if (response) setIsUpdating(false);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // })
  return (
    <Vertical style={{ alignItems: "flex-start" }}>
      <Title>
        소비님의 <span>한달 수입</span>
      </Title>
      <InputBtnWrapper>
        <div style={{ position: "relative" }}>
          <MonthIncome
            readOnly={!isUpdating}
            value={income}
            onChange={handleIncomeChange}
            ref={incomeRef}
          />
          <Unit>원</Unit>
        </div>
        {isUpdating === false && (
          <UpdateBtn
            onClick={() => {
              setIsUpdating(true);
              incomeRef.current.focus();
            }}
          >
            수정하기
          </UpdateBtn>
        )}
        {isUpdating === true && (
          <UpdateBtn onClick={handleSubmitBtnClick}>저장하기</UpdateBtn>
        )}
      </InputBtnWrapper>
    </Vertical>
  );
}

export default MonthIncomeComponent;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
