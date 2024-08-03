import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { firstCategoryState, tokenState, userData } from "../../store/atom";
import TargetAmountComponent from "./TargetAmountComponent";
import axios from "axios";

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
  opacity: 0.5;
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
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
`;

const Unit = styled.span`
  position: absolute;
  font-family: "SUITLight";
  font-size: 20px;
  top: 37%;
  right: 21px;
`;

export default function FirstAmountComponent(props) {
  const [categoryAmount, setCategoryAmount] =
    useRecoilState(firstCategoryState);
  const userInfo = useRecoilValue(userData);
  const userToken = useRecoilValue(tokenState);

  function handleSubmitBtnClick() {
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    const arr = categoryAmount.map((itm) => ({
      category: itm.name,
      amount: convertToInt(itm.consumption),
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
      <StyledBtn style={{ opacity: "0" }} />
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
      </Wrapper>
      <StyledBtn onClick={handleSubmitBtnClick}>다음</StyledBtn>
    </>
  );
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
