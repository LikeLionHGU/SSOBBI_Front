import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firstCategoryState, tokenState, userData } from "../../store/atom";
import styled from "styled-components";
import axios from "axios";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
  margin: 0;
  > span {
    font-family: "SUITMedium";
  }
`;

const StyledInput = styled.input`
  width: 800px;
  height: 60px;
  border-radius: 20px;
  &:focus {
    outline: 1px solid var(--70, #3fc87e);
  }
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  font-family: "SUITLight";
  font-size: 16px;
  padding-left: 30px;
  margin: 20px 0;
`;

const StyledBtn = styled.button`
  padding-top: 14px;
  padding-right: 20px;
  padding-bottom: 14px;
  padding-left: 16px;
  display: inline-flex;
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
    transform: translateY(0px) scale(1.1);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 100%; */
  align-items: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  font-family: "SUITLight";
  font-size: "16px;";
  color: red;
`;

export default function IncomeInputComponent(props) {
  const userInfo = useRecoilValue(userData);
  const [showError, setShowError] = useState(false);
  const userToken = useRecoilValue(tokenState);
  const setCategoryAmount = useSetRecoilState(firstCategoryState);

  function handleInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    props.setInputValue(formattedNumber);
  }

  function handleBtnClick() {
    if (props.inputValue === "0") {
      setShowError(true);
      return;
    }

    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/monthly/income";
    const newArr = { income: convertToInt(props.inputValue) };
    console.log(newArr);
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
        },
      })
      .then((response) => {
        console.log(response);
        props.setIsRunning(true);
        props.setShowComponent(2);
        props.setHandleProgress({ direction: "go", point: 33.3 });
        const array = response.data.userCategoryAndAmounts;
        const newArr = array.map((itm, idx, arr) => ({
          ...itm,
          consumption: convertStringNum(itm.consumption),
          isLast: idx === arr.length - 1,
        }));
        setCategoryAmount(newArr);
        console.log(newArr);
      })
      .catch((error) => {
        console.log("첫 수입 입력 오류" + error);
      });
  }
  return (
    <Wrapper>
      <InputWrapper>
        <Title>
          {userInfo.name}님의 <span>한달 수입</span>
        </Title>
        <StyledInput
          value={props.inputValue}
          onChange={handleInputChange}
          placeholder="한달 수입을 입력해주세요"
        />
      </InputWrapper>
      {showError && <ErrorMessage>수입을 입력해주세요!</ErrorMessage>}
      <StyledBtn onClick={handleBtnClick}>확인</StyledBtn>
    </Wrapper>
  );
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
