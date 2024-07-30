import React, { useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../styles/CommunalStyle";
import AddBtnImg from "../../imgs/AddBtnImg.svg";
import RmvBtnImg from "../../imgs/RemoveBtnImg.svg";

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
  font-family: "SUITLight";
  font-size: 20px;
`;

const ManageBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  border: 1px solid
    ${(props) => (props.id === "addBtn" ? "#2AA663" : "#939393")};
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  cursor: pointer;
  margin-left: 16px;
  &:hover {
  }

  > img {
    width: 16px;
  }
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
  font-family: "SUITLight";
  font-size: 20px;
`;

function TargetAmountComponent(props) {
  const formattedNum = new Intl.NumberFormat().format(props.amount);
  const [priceInputValue, setPriceInputValue] = useState(formattedNum);

  function handlePriceInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPriceInputValue(formattedNumber);
    props.setTargetAmount((prev) =>
      prev.map((item) =>
        item.category === props.category
          ? { ...item, amount: props.convertToInt(value) }
          : item
      )
    );
  }

  function handleRmvBtnClick() {
    props.setTargetAmount((prev) =>
      prev.filter((item) => item.category !== props.category)
    );
  }

  return (
    <>
      <Horizontal style={{ marginTop: "14px", justifyContent: "flex-start" }}>
        <CategoryInput value={props.category} />
        <PriceInput value={priceInputValue} onChange={handlePriceInputChange} />
        {props.isLast === false && (
          <ManageBtn id="rmvBtn" onClick={handleRmvBtnClick}>
            <img src={RmvBtnImg} alt="removeImg" id="rmvBtn" />
          </ManageBtn>
        )}
        {props.isLast === true && (
          <ManageBtn id="addBtn" onClick={props.handleAddBtnClick}>
            <img src={AddBtnImg} alt="addImg" id="addBtn" />
          </ManageBtn>
        )}
      </Horizontal>
    </>
  );
}

export default TargetAmountComponent;
