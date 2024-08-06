import React, { useRef, useState } from "react";
import styled from "styled-components";
import ModalComponent from "./ModalComponent";
import TermOfUseComponent from "./TermOfUseComponent";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import TermOfUse2Component from "./TermOfUse2Component";

const Title = styled.p`
  font-family: "SUITMedium";
  font-size: 20px;

  > span {
    color: red;
    font-size: 25px;
  }
`;

const InputsWrapper = styled.div`
  width: 400px;
  height: 177px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  justify-content: center;
`;

const StyledInput = styled.input`
  accent-color: rgb(94, 164, 91);
`;

const PhoneNumInput = styled.input`
  width: 371px;
  height: 59px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  font-family: "SUITLight";
  font-size: 18px;
  padding-left: 30px;
  &:focus {
    outline: ${(props) => (props.readOnly ? "none" : "#2AA663")};
  }
`;

const InputSpanWrapper = styled.div`
  font-family: "SUITLight";
  font-size: 18px;
  margin: 10px 38px 0 38px;
  position: relative;

  > .info {
    color: #999;
    font-family: "SUITLight";
    font-size: 18px;
    border-bottom: 1px solid #999;
    cursor: pointer;
    position: absolute;
    right: 0;
  }
`;

const SubmitBtn = styled.button`
  display: inline-flex;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  border-radius: 24px;
  background: var(--80, #2aa663);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  font-family: "SUITLight";
  font-size: 16px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    transform: ${(props) =>
      props.showBtn ? "translateY(0px) scale(1.05)" : ""};
  }
  opacity: ${(props) => (props.showBtn ? "1" : "0.5")};
`;

function EnterPhoneNumComponent() {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isC1Checked, setIsC1Checked] = useState(false);
  const [isC2Checked, setIsC2Checked] = useState(false);
  const phoneNumRef = useRef("");
  const [phoneNum, setPhoneNum] = useState("");
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const userToken = useRecoilValue(tokenState);

  function handleCheckboxChange(e) {
    const { id, checked } = e.target;
    if (id === "allCondition") {
      setIsAllChecked(checked);
      setIsC1Checked(checked);
      setIsC2Checked(checked);
      phoneNumRef.current.focus();
    } else if (id === "condition1") {
      setIsC1Checked(checked);
      if (checked && isC2Checked) {
        setIsAllChecked(true);
        phoneNumRef.current.focus();
      }
    } else if (id === "condition2") {
      setIsC2Checked(checked);
      if (checked && isC1Checked) {
        setIsAllChecked(true);
        phoneNumRef.current.focus();
      }
    }
  }

  function handlePhoneNumChange(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length <= 3) {
      setPhoneNum(value);
    } else if (value.length <= 7) {
      setPhoneNum(`${value.slice(0, 3)}-${value.slice(3)}`);
    } else if (value.length <= 11) {
      setPhoneNum(
        `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
      );
    }
  }

  function handleSubmitBtn() {
    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/alarm-message/ok";
    const newArr = { userPhoneNumber: removeHyphens(phoneNum) };
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        window.location.href = process.env.REACT_APP_KAKAO_URL;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      {showModal1 && (
        <ModalComponent closeModal={() => setShowModal1(false)}>
          <TermOfUseComponent />
        </ModalComponent>
      )}
      {showModal2 && (
        <ModalComponent closeModal={() => setShowModal2(false)}>
          <TermOfUse2Component />
        </ModalComponent>
      )}
      <SubmitBtn style={{ opacity: "0" }}>쏘삐 시작하기</SubmitBtn>
      <div>
        <Title>
          이용약관 <span>*</span>
        </Title>
        <InputsWrapper>
          <InputSpanWrapper
            style={{
              borderBottom: "1px solid #d9d9d9",
              paddingBottom: "10px",
            }}
          >
            <StyledInput
              type="checkbox"
              id="allCondition"
              checked={isAllChecked}
              onChange={handleCheckboxChange}
            />
            <span>모두 동의하기</span>
          </InputSpanWrapper>
          <InputSpanWrapper>
            <StyledInput
              type="checkbox"
              id="condition1"
              checked={isC1Checked}
              onChange={handleCheckboxChange}
            />
            <span>(필수) 이용약관</span>
            <span className="info" onClick={() => setShowModal1(true)}>
              보기
            </span>
          </InputSpanWrapper>
          <InputSpanWrapper>
            <StyledInput
              type="checkbox"
              id="condition2"
              checked={isC2Checked}
              onChange={handleCheckboxChange}
            />
            <span>(필수) 개인정보 처리방침</span>
            <span className="info" onClick={() => setShowModal2(true)}>
              보기
            </span>
          </InputSpanWrapper>
        </InputsWrapper>
        <Title>알림톡 전화번호</Title>
        <PhoneNumInput
          readOnly={!isAllChecked}
          ref={phoneNumRef}
          value={phoneNum}
          onChange={handlePhoneNumChange}
        />
      </div>
      <SubmitBtn
        onClick={handleSubmitBtn}
        disabled={!(isC1Checked && isC2Checked)}
        showBtn={isC1Checked && isC2Checked}
      >
        쏘삐 시작하기
      </SubmitBtn>
    </>
  );
}

export default EnterPhoneNumComponent;

function removeHyphens(phoneNumber) {
  return phoneNumber.replace(/-/g, "");
}
