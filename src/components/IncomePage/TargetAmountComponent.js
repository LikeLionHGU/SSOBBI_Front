import React from "react";
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

function TargetAmountComponent({ targetAmount }) {
  return (
    <>
      <p>
        카테고리별로 한달에 사용할 <strong>목표금액</strong>을 설정해주세요
      </p>
      {targetAmount.map((itm) => (
        <Horizontal style={{ marginBottom: "14px" }}>
          <CategoryInput value={itm.category} />
          <PriceInput value={itm.money} />
        </Horizontal>
      ))}
    </>
  );
}

export default TargetAmountComponent;
