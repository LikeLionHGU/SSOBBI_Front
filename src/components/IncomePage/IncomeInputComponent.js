import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { firstCategoryState, tokenState, userData } from "../../store/atom";
import styled from "styled-components";
import axios from "axios";
import { Horizontal } from "../../styles/CommunalStyle";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
  margin: 0;
  > span {
    font-family: "SUITMedium";
  }
`;

const StyledInput = styled.input`
  width: 371px;
  height: 59px;
  border-radius: 20px;
  &:focus {
    outline: 1px solid var(--70, #3fc87e);
  }
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  font-family: "SUITLight";
  font-size: 20px;
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
`;

const Unit = styled.span`
  position: absolute;
  font-family: "SUITLight";
  font-size: 20px;
  top: 37%;
  right: 21px;
`;

const CategoryInput = styled.input`
  width: 115px;
  height: 60px;
  text-align: center;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  margin-right: 16px;
  font-family: "SUITLight";
  font-size: 20px;
  &:focus {
    outline: none;
  }
  opacity: 0.5;
`;

const PriceInput = styled.input`
  text-align: center;
  width: 270px;
  height: 60px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  font-family: "SUITLight";
  font-size: 20px;
  &:focus {
    outline: none;
  }
  opacity: 0.5;
`;

const dummy = [
  { category: "식비", amount: "0" },
  { category: "문화", amount: "0" },
  { category: "교통비", amount: "0" },
  { category: "기타", amount: "0" },
];

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
      <StyledBtn style={{ opacity: "0" }}>확인</StyledBtn>
      <Wrapper>
        <InputWrapper>
          <Title>
            {userInfo.name}님의 <span>한달 수입</span>
          </Title>
          <div style={{ position: "relative" }}>
            <StyledInput
              value={props.inputValue}
              onChange={handleInputChange}
              onKeyDown={handleEnterDown}
            />
            <Unit>원</Unit>
          </div>
        </InputWrapper>
        <Title>
          {userInfo.name}님의 <span>카테고리별 목표금액</span>
        </Title>
        <div>
          {dummy.map((itm) => (
            <CategoryAmountInput category={itm.category} amount={itm.amount} />
          ))}
        </div>
      </Wrapper>
      <StyledBtn onClick={handleBtnClick} disabled={!showBtn} showBtn={showBtn}>
        확인
      </StyledBtn>
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

function CategoryAmountInput(props) {
  return (
    <>
      <Horizontal
        style={{
          marginTop: "14px",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <CategoryInput value={props.category} readOnly />
        <PriceInput value={props.amount} readOnly />
        <Unit>원</Unit>
      </Horizontal>
    </>
  );
}
