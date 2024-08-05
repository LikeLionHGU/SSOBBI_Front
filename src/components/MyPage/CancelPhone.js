import React from "react";
import styled from "styled-components";
import { Vertical } from "../../styles/CommunalStyle";
import CompleteImg from "../../imgs/Saly-37.png";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 30px;
  margin-bottom: 80px;
`;

const StyledBtn = styled.button`
  width: 408px;
  height: 70px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--70, #3fc87e);
  font-family: "SUITLight";
  font-size: 24px;
  text-align: center;
  color: white;
  border: none;
  cursor: pointer;
  margin-top: 47px;
`;
function CancelPhone(props) {
  return (
    <Vertical>
      <Title>알림톡 취소신청이 완료되었어요</Title>
      <img src={CompleteImg} alt="completeImg" />
      <StyledBtn onClick={props.closeModal}>계속하기</StyledBtn>
    </Vertical>
  );
}

export default CancelPhone;
