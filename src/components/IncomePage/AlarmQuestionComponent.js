import React from "react";
import styled from "styled-components";
import { Horizontal } from "../../styles/CommunalStyle";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > .title {
    font-family: "SUITLight";
    font-size: 30px;
  }
`;

const StyledBtn = styled.button`
  width: 408px;
  height: 70px;
  border-radius: 16px;
  border: none;
  font-family: "SUITLight";
  font-size: 22px;
  cursor: pointer;
  background: ${(props) => (props.cancel ? "#ececec" : "var(--70, #3fc87e)")};
  color: ${(props) => (props.cancel ? "black" : "white")};
`;

function AlarmQuestionComponent({ setModalPage }) {
  const navigate = useNavigate();
  function nextModal() {
    setModalPage((prev) => prev + 1);
  }
  return (
    <Wrapper>
      <p className="title">카테고리 입력이 완료되었어요!</p>
      <p>본문 내용 블라블라</p>
      <Horizontal>
        <StyledBtn cancel onClick={() => navigate("/ssobbi")}>
          괜찮아요
        </StyledBtn>
        <StyledBtn style={{ marginLeft: "24px" }} onClick={nextModal}>
          알림 신청할게요!
        </StyledBtn>
      </Horizontal>
    </Wrapper>
  );
}

export default AlarmQuestionComponent;
