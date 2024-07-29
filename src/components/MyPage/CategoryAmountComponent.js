import React, { useState } from "react";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";

const CategoryInput = styled.input`
  width: 115px;
  height: 59px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  font-family: "SUITLight";
  font-size: 17px;
  &:focus {
    outline: 1px solid #3fc87e;
  }
  text-align: center;
`;

const PriceInput = styled.input`
  width: 242px;
  height: 59px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  margin-left: 16px;
  font-family: "SUITLight";
  font-size: 17px;
  &:focus {
    outline: 1px solid #3fc87e;
  }
  padding-left: 28px;
`;

const Unit = styled.span`
  font-family: "SUITLight";
  font-size: 17px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

function CategoryAmountComponent({
  data,
  isUpdating,
  amount,
  setAmount,
  setIsMinimumCategory,
}) {
  const [category, setCategory] = useState(data.category);
  const [price, setPrice] = useState(convertStringNum(data.amount));
  function removeBtnClick() {
    if (amount.length > 2) {
      setAmount((prev) => prev.filter((itm) => itm.category !== data.category));
      setIsMinimumCategory(false);
    } else {
      setIsMinimumCategory(true);
    }
  }
  function handleCategoryChange(e) {
    setCategory(e.target.value);
    setAmount((prev) =>
      prev.map((itm) =>
        itm.category === data.category
          ? { ...itm, category: e.target.value }
          : itm
      )
    );
  }
  function handlePriceChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPrice(formattedNumber);
    setAmount((prev) =>
      prev.map((itm) =>
        itm.category === data.category ? { ...itm, amount: onlyNumber } : itm
      )
    );
  }
  return (
    <Horizontal style={{ marginTop: "14px" }}>
      <CategoryInput
        readOnly={!isUpdating}
        value={category}
        onChange={handleCategoryChange}
      />
      <div style={{ position: "relative" }}>
        <PriceInput
          readOnly={!isUpdating}
          value={price}
          onChange={handlePriceChange}
        />
        <Unit>원</Unit>
      </div>
      {isUpdating === true && <button onClick={removeBtnClick}>빼기</button>}
    </Horizontal>
  );
}

export default CategoryAmountComponent;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
