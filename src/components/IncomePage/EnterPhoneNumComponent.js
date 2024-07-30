import React, { useState } from "react";
import styled from "styled-components";
import { Vertical, NoCenterHorizontal } from "../../styles/CommunalStyle";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { tokenState } from "../../store/atom";
import { useRecoilValue } from "recoil";

const Phrases = styled.p`
  border: 1px solid black;
  width: 100%;
  height: 70px;
  overflow: scroll;
`;

const dummy =
  "동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세 남산 위에 저 소나무, 철갑을 두른 듯 바람서리 불변함은 우리 기상일세. 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려강산 대한 사람, 대한으로 길이 보전하세";

function EnterPhoneNumComponent() {
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [isC1Checked, setIsC1Checked] = useState(false);
  const [isC2Checked, setIsC2Checked] = useState(false);
  const [showError, setShowError] = useState(false);
  const userToken = useRecoilValue(tokenState);
  function handleInputChange(e) {
    setPhoneNum(e.target.value);
  }
  function handleCheckboxChange(e) {
    const { id, checked } = e.target;
    if (id === "condition1") {
      setIsC1Checked(checked);
    } else if (id === "condition2") {
      setIsC2Checked(checked);
    }
  }
  function handleSubmitbtn(e) {
    e.preventDefault();

    if (!isC1Checked || !isC2Checked) {
      setShowError(true);
      return;
    } else {
      setShowError(false);
      const apiUrl = process.env.REACT_APP_BASE_URL + "/user/alarm-message/ok";
      const newObj = { userPhoneNumber: phoneNum };
      axios
        .post(apiUrl, JSON.stringify(newObj), {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response) navigate("/ssobbi");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  return (
    <Vertical>
      <div style={{ width: "80%" }}>
        <Phrases>{dummy}</Phrases>
        <NoCenterHorizontal style={{ justifyContent: "flex-end" }}>
          <label for="condition1">동의함</label>
          <input
            type="checkbox"
            id="condition1"
            name="condition1"
            onChange={handleCheckboxChange}
            checked={isC1Checked}
          />
        </NoCenterHorizontal>
      </div>
      <div style={{ width: "80%" }}>
        <Phrases>겁나 긴 문장</Phrases>
        <NoCenterHorizontal style={{ justifyContent: "flex-end" }}>
          <label for="condition2">동의함</label>
          <input
            type="checkbox"
            id="condition2"
            name="condition2"
            onChange={handleCheckboxChange}
            checked={isC2Checked}
          />
        </NoCenterHorizontal>
      </div>
      <input value={phoneNum} onChange={handleInputChange}></input>
      <button type="submit" onClick={handleSubmitbtn}>
        제출
      </button>
      {showError && <p id="errorMessage">모든 문장에 동의해주세요</p>}
    </Vertical>
  );
}

export default EnterPhoneNumComponent;
