import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firstCategoryState, tokenState, userData } from "../../../store/atom";
import styled from "styled-components";
import axios from "axios";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
  margin: 0;
  > span {
    font-family: "SUITMedium";
  }
`;

const StyledInput = styled.input`
  width: 280px;
  height: 48px;
  border-radius: 20px;
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
    transform: ${(props) =>
      props.showBtn ? "translateY(0px) scale(1.05)" : ""};
  }
  opacity: ${(props) => (props.showBtn ? "1" : "0.5")};
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
  align-items: flex-start;
  justify-content: center;
  margin-top: 28px;
`;

const Unit = styled.span`
  position: absolute;
  font-family: "SUITLight";
  font-size: 18px;
  top: 37%;
  right: 21px;
`;

export default function IncomeInputComponent(props) {
  const userInfo = useRecoilValue(userData);
  const [showBtn, setShowBtn] = useState(false);
  const userToken = useRecoilValue(tokenState);
  const setCategoryAmount = useSetRecoilState(firstCategoryState);

  function handleInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    props.setInputValue(formattedNumber);

    if (formattedNumber === "0") setShowBtn(false);
    else setShowBtn(true);
  }

  function handleEnterDown(e) {
    if (e.key === "Enter") {
      handleBtnClick();
    }
  }

  function handleBtnClick() {
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
        props.setHandleProgress({ direction: "go", point: 50 });
        const array = response.data.userCategoryAndAmounts;
        const newArr = array.map((itm) => ({
          ...itm,
          consumption: convertStringNum(itm.consumption),
        }));
        setCategoryAmount(newArr);
        console.log(newArr);
      })
      .catch((error) => {
        console.log("첫 수입 입력 오류" + error);
      });
  }
  return (
    <>
      <Wrapper>
        <Title>
          {userInfo.name}님의 <span>한달 수입</span>
        </Title>
        <InputWrapper>
          <div style={{ position: "relative" }}>
            <StyledInput
              value={props.inputValue}
              onChange={handleInputChange}
              onKeyDown={handleEnterDown}
            />
            <Unit>원</Unit>
          </div>
          <StyledBtn
            onClick={handleBtnClick}
            disabled={!showBtn}
            showBtn={showBtn}
          >
            확인
          </StyledBtn>
        </InputWrapper>
      </Wrapper>
    </>
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
