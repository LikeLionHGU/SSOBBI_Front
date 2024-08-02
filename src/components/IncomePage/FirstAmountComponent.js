import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { firstCategoryState, tokenState, userData } from "../../store/atom";
import TargetAmountComponent from "./TargetAmountComponent";
import axios from "axios";

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

export default function FirstAmountComponent(props) {
  const [categoryAmount, setCategoryAmount] =
    useRecoilState(firstCategoryState);
  const userInfo = useRecoilValue(userData);
  const userToken = useRecoilValue(tokenState);

  function handleSubmitBtnClick() {
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    const newArr = categoryAmount.map((itm) => ({
      category: itm.name,
      amount: convertToInt(itm.consumption),
    }));
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        props.setIsRunning(true);
        props.setShowComponent(3);
        props.setHandleProgress({ direction: "go", point: 66.6 });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Wrapper>
      <Title>
        {userInfo.name}님의 <span>한달 수입</span>
      </Title>
      <StyledInput readOnly value={props.inputValue} disabled />
      <Title>
        {userInfo.name}님의 <span>카테고리별 목표금액</span>
      </Title>
      {categoryAmount.map((itm) => (
        <>
          <TargetAmountComponent
            category={itm.name}
            amount={itm.consumption}
            setTargetAmount={setCategoryAmount}
            targetAmount={categoryAmount}
          />
        </>
      ))}
      <button onClick={handleSubmitBtnClick}>다음</button>
    </Wrapper>
  );
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
