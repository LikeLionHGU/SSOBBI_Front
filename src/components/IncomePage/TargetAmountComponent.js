import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../styles/CommunalStyle";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
  }
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
`;

const PriceInput = styled.input`
  &::placeholder {
    text-align: left;
    padding-left: 24px;
  }
  text-align: left;
  padding-left: 30px;
  width: 240px;
  height: 60px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  &:focus {
    outline: none;
    border: 1px solid rgba(42, 166, 99, 1);
  }
  font-family: "SUITLight";
  font-size: 20px;
`;

const Unit = styled.span`
  position: absolute;
  font-family: "SUITLight";
  font-size: 20px;
  top: 37%;
  right: 21px;
`;

function TargetAmountComponent(props) {
  const [priceInputValue, setPriceInputValue] = useState(props.amount);
  const [categoryInputValue, setCategoryInputValue] = useState(props.category);

  function handleCategoryChange(e) {
    const newCategory = e.target.value;

    props.setTargetAmount((prev) => {
      // Update the existing category if found
      let categoryExists = false;
      const updatedAmount = prev.map((itm) => {
        if (itm.name === categoryInputValue) {
          categoryExists = true;
          return {
            ...itm,
            name: newCategory,
          };
        }
        return itm;
      });

      if (!categoryExists) {
        updatedAmount.push({
          name: newCategory,
          consumption: 0,
        });
      }

      return updatedAmount;
    });
    setCategoryInputValue(newCategory);
  }

  function handlePriceInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setPriceInputValue(convertStringNum(onlyNumber));

    const arr = props.targetAmount.map((itm) =>
      itm.name === props.category
        ? { ...itm, consumption: convertStringNum(onlyNumber) }
        : itm
    );
    const sum = arr.reduce(
      (acc, itm) =>
        itm.name === "기타" ? acc : acc + convertToInt(itm.consumption),
      0
    );

    const newArr = arr.map((itm) =>
      itm.name === "기타"
        ? {
            ...itm,
            consumption: convertStringNum(convertToInt(props.income) - sum),
          }
        : itm
    );

    props.setTargetAmount(newArr);
  }

  useEffect(() => {
    setCategoryInputValue(props.category);
    setPriceInputValue(props.amount);
  }, [props]);

  return (
    <>
      <Horizontal
        style={{
          marginTop: "14px",
          justifyContent: "flex-start",
          position: "relative",
        }}
      >
        <CategoryInput
          value={categoryInputValue}
          onChange={handleCategoryChange}
        />
        <PriceInput value={priceInputValue} onChange={handlePriceInputChange} />
        <Unit>원</Unit>
      </Horizontal>
    </>
  );
}

export default TargetAmountComponent;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
