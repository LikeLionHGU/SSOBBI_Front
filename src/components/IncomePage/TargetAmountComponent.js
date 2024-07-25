import React, { useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../styles/CommunalStyle";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
  }
  width: 115px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  margin-right: 16px;
`;

const PriceInput = styled.input`
  &::placeholder {
    text-align: left;
    padding-left: 24px;
  }
  text-align: center;
  width: 236px;
  height: 60px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  &:focus {
    outline: none;
    border: 1px solid rgba(42, 166, 99, 1);
  }
`;

function TargetAmountComponent(props) {
  const formattedNum = new Intl.NumberFormat().format(props.item.money);
  const [priceInputValue, setPriceInputValue] = useState(formattedNum);

  function handlePriceInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPriceInputValue(formattedNumber);
  }
  return (
    <>
      <Horizontal style={{ marginBottom: "14px" }}>
        <CategoryInput value={props.item.category} />
        <PriceInput value={priceInputValue} onChange={handlePriceInputChange} />
      </Horizontal>
    </>
  );
}

export default TargetAmountComponent;
