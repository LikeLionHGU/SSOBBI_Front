import React from "react";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";

const MonthIncome = styled.input`
  width: 401px;
  height: 60px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  &:focus {
    outline: none;
  }
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
  > span {
    font-family: "SUITSemiBold";
  }
`;

const UpdateBtn = styled.button`
  display: inline-flex;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 24px;
  font-family: "SUITLight";
  font-size: 17px;
  color: white;
  margin-left: 28px;
`;

const Unit = styled.span`
  font-family: "SUITLight";
  font-size: 17px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

function MonthIncomeComponent() {
  return (
    <Vertical style={{ alignItems: "flex-start" }}>
      <Title>
        소비님의 <span>한달 수입</span>
      </Title>
      <Horizontal style={{ justifyContent: "flex-start" }}>
        <div style={{ position: "relative" }}>
          <MonthIncome readOnly />
          <Unit>원</Unit>
        </div>
        <UpdateBtn>수정하기</UpdateBtn>
      </Horizontal>
    </Vertical>
  );
}

export default MonthIncomeComponent;
