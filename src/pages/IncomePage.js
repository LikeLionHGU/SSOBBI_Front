import React, { useState } from "react";
import IncomeInputComponent from "../components/IncomePage/IncomeInputComponent";
import TargetAmountComponent from "../components/IncomePage/TargetAmountComponent";
import ModalComponent from "../components/IncomePage/ModalComponent";
import { Vertical } from "../styles/CommunalStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AlarmQuestionComponent from "../components/IncomePage/AlarmQuestionComponent";
import EnterPhoneNumComponent from "../components/IncomePage/EnterPhoneNumComponent";

const AllWrapper = styled.div`
  width: 1440px;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 198px;
  justify-content: flex-start;
  padding-top: 158px;
`;

const StyledBtn = styled.button`
  border-radius: 24px;
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  display: inline-flex;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  color: white;
  border: none;
  margin-left: 224px;
  font-family: "SUITLight";
  /* font-size: 20px; */
  cursor: pointer;
`;

// input and button wrapper
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
  > span {
    font-family: "SUITSemiBold";
  }
`;

function IncomePage() {
  const [targetAmount, setTargetAmount] = useState(null); // 월간수입을 토대로 목표금액 설정 -> 백엔드와 연결
  const [modalPage, setModalPage] = useState(null);
  const navigate = useNavigate();
  function handleBtnClick() {
    setModalPage(1);
  }
  return (
    <AllWrapper>
      {modalPage > 0 && (
        <ModalComponent closeModal={() => setModalPage(0)}>
          {modalPage === 1 && (
            <AlarmQuestionComponent setModalPage={setModalPage} />
          )}
          {modalPage === 2 && <EnterPhoneNumComponent />}
        </ModalComponent>
      )}
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <div>
        <Title>
          OO님의 <span>한달 수입을 입력해주세요</span>
        </Title>
        <IncomeInputComponent setTargetAmount={setTargetAmount} />
      </div>
      <Vertical style={{ alignItems: "flex-start" }}>
        {targetAmount && (
          <>
            <Title>
              카테고리별로 한달에 사용할 <span>목표금액</span>을 설정해주세요
            </Title>
            <Wrapper>
              <div>
                {targetAmount.map((itm) => (
                  <TargetAmountComponent key={itm.id} item={itm} />
                ))}
              </div>
              <StyledBtn onClick={handleBtnClick}>확인</StyledBtn>
            </Wrapper>
          </>
        )}
      </Vertical>
    </AllWrapper>
  );
}

export default IncomePage;