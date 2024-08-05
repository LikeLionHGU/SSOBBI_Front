import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { firstCategoryState, tokenState, userData } from "../../../store/atom";
import TargetAmountComponent from "./TargetAmountComponent";
import axios from "axios";

const StyledInput = styled.input`
  width: 280px;
  height: 48px;
  border-radius: 14px;
  &:focus {
    outline: 1px solid var(--70, #3fc87e);
  }
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  font-family: "SUITLight";
  font-size: 18px;
  padding-left: 30px;
  margin: 20px 0;
  opacity: 0.5;
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
  margin: 0;
  > span {
    font-family: "SUITMedium";
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 100%; */
  align-items: flex-start;
`;

const StyledBtn = styled.button`
  display: inline-flex;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  border-radius: 24px;
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  color: white;
  font-family: "SUITLight";
  border: none;
  cursor: pointer;
  &:hover {
    transform: translateY(0px) scale(1.05);
  }
  margin-top: 40px;
`;

const Unit = styled.span`
  position: absolute;
  font-family: "SUITLight";
  font-size: 18px;
  top: 37%;
  right: 21px;
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  font-family: "SUITLight";
  font-size: 18px;
`;

export default function FirstAmountComponent(props) {
  const [categoryAmount, setCategoryAmount] =
    useRecoilState(firstCategoryState);
  const userInfo = useRecoilValue(userData);
  const userToken = useRecoilValue(tokenState);
  const [isIncludeZero, setIsIncludeZero] = useState(false);

  function handleSubmitBtnClick() {
    const checkData = categoryAmount.map((itm) => {
      if (itm.consumption === 0 || itm.consumption === "0") {
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
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    const arr = categoryAmount.map((itm) => ({
      category: itm.name,
      amount:
        typeof itm.consumption === "string"
          ? convertToInt(itm.consumption)
          : itm.consumption,
    }));
    const newArr = { requests: arr };
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // props.setShowComponent(3);
        props.setShowComponent(3);
        props.setIsRunning(true);
        props.setHandleProgress({ direction: "go", point: 100 });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Wrapper>
        <InputWrapper>
          <Title>
            {userInfo.name}님의 <span>한달 수입</span>
          </Title>
          <div style={{ position: "relative" }}>
            <StyledInput value={props.inputValue} readOnly />
            <Unit>원</Unit>
          </div>
        </InputWrapper>
        {categoryAmount.map((itm) => (
          <>
            <TargetAmountComponent
              income={props.inputValue}
              category={itm.name}
              amount={itm.consumption}
              setTargetAmount={setCategoryAmount}
              targetAmount={categoryAmount}
            />
          </>
        ))}
        <StyledBtn onClick={handleSubmitBtnClick}>다음</StyledBtn>
        {isIncludeZero && (
          <ErrorMessage>목표금액은 0원일 수 없습니다</ErrorMessage>
        )}
      </Wrapper>
    </>
  );
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
