import React from "react";
import styled from "styled-components";
import CoinBagImg from "../../imgs/CoinBag.png";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";
import { useNavigate } from "react-router-dom";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 30px;
`;

const StyledBtn = styled.button`
  width: 408px;
  height: 70px;
  border-radius: 16px;
  font-family: "SUITLight";
  font-size: 24px;
  border: none;
  cursor: pointer;
`;
function CompleteModalComponent(props) {
  const navigate = useNavigate();
  return (
    <Vertical style={{ justifyContent: "space-between", height: "100%" }}>
      <Title>오늘의 소비가 완료되었어요</Title>
      <img src={CoinBagImg} alt="coinBag" />
      <Horizontal>
        <StyledBtn style={{ marginRight: "24px" }} onClick={props.closeModal}>
          계속하기
        </StyledBtn>
        <StyledBtn
          style={{ background: "#3FC87E", color: "white" }}
          onClick={() => navigate("/ssobbi/calender")}
        >
          기록확인하기
        </StyledBtn>
      </Horizontal>
    </Vertical>
  );
}

export default CompleteModalComponent;
