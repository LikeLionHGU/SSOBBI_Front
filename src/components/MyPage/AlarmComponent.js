import React, { useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import AlarmImg from "../../imgs/alarmCheck.png";
import {
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
  margin-top: 20px;
  margin-left: 170px;
`;
const CancleButton = styled.button`
  font-family: "SUITMedium";
  font-size: 14px;
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 20px;
  color: white;
  background-color: #d3d3d3;
  cursor: pointer;
  margin-top: 60px;
  margin-left: 170px;
`;
const InputField = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  width: 200px;
  margin-top: 6px;
`;

function AlarmComponent() {
  const userToken = useRecoilValue(tokenState);
  const [phoneNumber, setPhoneNumber] = useState("");
  //TODO: API 불러와서 알람톡 신청 받고있는 사람인지 파악 후 setAlarm 초기값 세팅
  const [alarm, setAlarm] = useState(true);
  const [consent, setConsent] = useState(false);
  const [checks, setChecks] = useState({
    all: false,
    terms1: false,
    terms2: false,
    marketing: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

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
  const allRequiredChecked =
    checks.terms1 && checks.terms2 && phoneNumber.trim() !== "";

  const handleAlarmClick = () => {
    console.log("handleAlarmClick");
    setConsent(!consent);
  };
  const onClickConsent = () => {
    console.log("알람 신청");
    console.log("전화번호:", phoneNumber);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/alarm-message/ok`,
        { userPhoneNumber: phoneNumber },
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("알람 설정 신청 response", response);
        setConsent(!consent);
        setAlarm(!alarm);
        openModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onClickAlarmCancle = () => {
    console.log("알람 취소");
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/user/alarm-message/no`, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("알람 설정 취소 response", response);
        setConsent(!consent);
        setAlarm(!alarm);
        openModal();
      })
      .catch((error) => {
        console.log(error);
      });
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
        <>
          {alarm ? (
            <>
              {" "}
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
                  style={{ marginBottom: "30px", width: "240px" }}
                >
                  <CheckBox
                    checked={checks.marketing}
                    onClick={() => handleCheckBoxClick("marketing")}
                  />{" "}
                  (선택) 마케팅 활용 및 공급사 상품 및 배송을 위한 개인정보 제
                  3자 제공 동의
                </NoCenterHorizontal>

                <NoCenterVertical
                  style={{
                    marginBottom: "15px",
                    marginLeft: "32px",
                    fontSize: "12px",
                  }}
                >
                  * 필수) 알림톡을 받을 전화번호를 입력해주세요!
                  <InputField
                    type="tel"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    placeholder="-없이 전화번호를 입력하세요"
                  />
                </NoCenterVertical>
                <SubmitButton
                  disabled={!allRequiredChecked}
                  onClick={onClickConsent}
                >
                  제출하기
                </SubmitButton>
              </NoCenterVertical>
            </>
          ) : (
            <>
              <NoCenterVertical>
                <BoxTitle>알림톡 취소</BoxTitle>
                <hr
                  style={{
                    border: "0.5px solid #D9D9D9",
                    margin: "0px 32px 20px 32px",
                  }}
                />
                <NoCenterHorizontal
                  style={{
                    marginBottom: "15px",
                    width: "240px",
                    marginLeft: "32px",
                  }}
                >
                  알림톡을 더 이상 받지 않으실 경우 아래 취소하기 버튼을
                  눌러주세요.
                </NoCenterHorizontal>
                <CancleButton onClick={onClickAlarmCancle}>
                  취소하기
                </CancleButton>
              </NoCenterVertical>
            </>
          )}
        </>
      ) : (
        <></>
      )}
      {isModalOpen && (
        <ModalComponent closeModal={closeModal}>
          {alarm ? (
            <p>알림톡 신청이 취소되었어요!</p>
          ) : (
            <p>알림톡 신청이 완료되었어요!</p>
          )}
        </ModalComponent>
      )}
    </Wrapper>
  );
}

export default AlarmComponent;
