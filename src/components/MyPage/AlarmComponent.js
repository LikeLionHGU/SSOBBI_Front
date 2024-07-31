import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AlarmImg from "../../imgs/alarmCheck.png";
import {
  Horizontal,
  Vertical,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 630px;
  background-color: #f2f6f4;
  border-radius: 20px;
  width: 300px;
`;
const SSOBBIBox = styled.div`
  width: 232px;
  height: 90px;
  border-radius: 20px;
  font-family: "SUITLight";
  font-size: 14px;
  margin-top: 50px;
  text-align: center;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const CheckPoint = styled.img`
  width: 28px;
  height: 32px;
  margin-left: 20px;
  margin-top: -15px;
`;
const DetailBT = styled.button`
  font-family: "SUITLight";
  font-size: 10px;
  width: 100%;
  height: 34px;
  border: none;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: #0c0c0c;
  background-color: #fee500;
  cursor: pointer;
  text-decoration: none;
`;
const CheckBox = styled.button`
  border: 1px solid #3fc87e;
  border-radius: 3px;
  background-color: ${(props) => (props.checked ? "#3FC87E" : "#f2f6f4")};
  width: 15px;
  height: 15px;
  margin-left: 32px;
  margin-right: 10px;
  font-size: 14px;
  font-family: "SUITLight";
`;
const BoxTitle = styled.p`
  margin-top: 40px;
  margin-left: 32px;
  font-family: "SUITMedium";
  font-size: 18px;
`;
const SubmitButton = styled.button`
  font-family: "SUITMedium";
  font-size: 14px;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: ${(props) => (props.disabled ? "#D3D3D3" : "#2aa663")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  margin-top: 60px;
  margin-left: 170px;
`;

function AlarmComponent() {
  //TODO: API 불러와서 알람톡 신청 받고있는 사람인지 파악 후 setAlarm 초기값 세팅
  const [alarm, setAlarm] = useState(false);
  const [consent, setConsent] = useState(false);
  const [checks, setChecks] = useState({
    all: false,
    terms1: false,
    terms2: false,
    marketing: false,
  });

  const handleCheckBoxClick = (name) => {
    setChecks((prevChecks) => {
      const newChecks = { ...prevChecks, [name]: !prevChecks[name] };
      if (name === "all") {
        const newValue = !prevChecks.all;
        newChecks.terms1 = newValue;
        newChecks.terms2 = newValue;
        newChecks.marketing = newValue;
      } else {
        newChecks.all =
          newChecks.terms1 && newChecks.terms2 && newChecks.marketing;
      }
      return newChecks;
    });
  };
  const allRequiredChecked = checks.terms1 && checks.terms2;

  const handleAlarmClick = () => {
    console.log("handleAlarmClick");
    setConsent(!consent);
  };
  return (
    <Wrapper>
      <SSOBBIBox>
        <CheckPoint src={AlarmImg} />
        {alarm ? (
          <>
            {" "}
            <p>알림톡을 아직 신청하지 못했어요!</p>
            <DetailBT onClick={handleAlarmClick}>알림톡 신청하기</DetailBT>
          </>
        ) : (
          <>
            {" "}
            <p>알림톡 신청을 받고 있어요!</p>
            <DetailBT onClick={handleAlarmClick}>알림톡 취소하기</DetailBT>
          </>
        )}
      </SSOBBIBox>
      {consent ? (
        <></>
      ) : (
        <>
          <NoCenterVertical>
            <BoxTitle>약관 동의</BoxTitle>
            <hr
              style={{
                border: "0.5px solid #D9D9D9",
                margin: "0px 32px 20px 32px",
              }}
            />
            <NoCenterHorizontal style={{ marginBottom: "15px" }}>
              <CheckBox
                checked={checks.all}
                onClick={() => handleCheckBoxClick("all")}
              />{" "}
              모두 동의하기
            </NoCenterHorizontal>
            <NoCenterHorizontal style={{ marginBottom: "15px" }}>
              <CheckBox
                checked={checks.terms1}
                onClick={() => handleCheckBoxClick("terms1")}
              />{" "}
              (필수) 이용약관
            </NoCenterHorizontal>
            <NoCenterHorizontal style={{ marginBottom: "15px" }}>
              <CheckBox
                checked={checks.terms2}
                onClick={() => handleCheckBoxClick("terms2")}
              />{" "}
              (필수) 이용약관
            </NoCenterHorizontal>
            <NoCenterHorizontal
              style={{ marginBottom: "15px", width: "240px" }}
            >
              <CheckBox
                checked={checks.marketing}
                onClick={() => handleCheckBoxClick("marketing")}
              />{" "}
              (선택) 마케팅 활용 및 공급사 상품 및 배송을 위한 개인정보 제 3자
              제공 동의
            </NoCenterHorizontal>
            <SubmitButton disabled={!allRequiredChecked}>제출하기</SubmitButton>
          </NoCenterVertical>
        </>
      )}
    </Wrapper>
  );
}

export default AlarmComponent;
