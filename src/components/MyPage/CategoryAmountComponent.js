import React from "react";
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
    outline: none;
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
    outline: none;
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

function CategoryAmountComponent({ data }) {
  return (
    <Horizontal style={{ marginTop: "14px" }}>
      <CategoryInput readOnly value={data.category} />
      <div style={{ position: "relative" }}>
        <PriceInput readOnly value={data.amount} />
        <Unit>원</Unit>
      </div>
    </Horizontal>
  );
}

export default CategoryAmountComponent;
