import React, { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { tokenState, userData } from "../../../store/atom";
import {
  Horizontal,
  NoCenterVertical,
  Vertical,
} from "../../../styles/CommunalStyle";
import axios from "axios";
import UpdateImg from "../../../imgs/PencilFill.svg";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
`;

const InfoWrapper = styled.div`
  width: 319px;
  height: 96px;
  border-radius: 20px;
  background: var(--White, #fcfffe);
  display: flex;
  flex-direction: row;

  > div > div > span {
    font-family: "SUITLight";
    font-size: 16px;
  }
`;

const Profile = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 64px;
  margin-left: 28px;

  > img {
    width: 44px;
    height: 44px;
    border-radius: 44px;
  }
`;

const StyledInput = styled.input`
  font-family: "SUITLight";
  font-size: 18px;
  border: none;
  outline: none;
  width: 150px;
  border-bottom: ${(props) =>
    props.readOnly ? "1px solid black" : "2px solid #2AA663"};
`;

function ProfileComponent() {
  const userInfo = useRecoilValue(userData);
  const setUserInfo = useSetRecoilState(userData);
  const [phoneNum, setPhoneNum] = useState(userInfo.phoneNumber);
  const [isUpdating, setIsUpdating] = useState(false);
  const userToken = useRecoilValue(tokenState);
  const phoneNumRef = useRef("");
  const handleBtnClick = () => {
    setIsUpdating(true);
    phoneNumRef.current.focus();
  };

  function handlePhoneNumChange(e) {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length <= 3) {
      setPhoneNum(value);
    } else if (value.length <= 7) {
      setPhoneNum(`${value.slice(0, 3)}-${value.slice(3)}`);
      console.log("22");
    } else if (value.length <= 11) {
      setPhoneNum(
        `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`
      );
    }
  }

  const phoneNumSubmit = () => {
    const onlyNumber = phoneNum.replace(/[^0-9]/g, "");
    const apiUrl = process.env.REACT_APP_BASE_URL + "/user/alarm-message/ok";
    const newArr = { userPhoneNumber: onlyNumber };
    axios
      .post(apiUrl, newArr, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          phoneNumber: response.data.phoneNumber,
        }));
        setIsUpdating(false);
        console.log("전번 수정: ", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activeEnter = (e) => {
    if (e.key === "Enter") {
      phoneNumSubmit();
    }
  };

  return (
    <div>
      <Title>마이페이지</Title>
      <InfoWrapper>
        <Horizontal>
          <Profile>
            <img src={userInfo.profileImageUrl} alt="userImg" />
          </Profile>
          <NoCenterVertical
            style={{ alignItems: "flex-start", marginLeft: "21px" }}
          >
            <span>{userInfo.name}</span>
            {userInfo.phoneNumber ? (
              <div>
                <StyledInput
                  placeholder=""
                  value={phoneNum}
                  onChange={handlePhoneNumChange}
                  readOnly={!isUpdating}
                  ref={phoneNumRef}
                  onKeyDown={activeEnter}
                  onBlur={phoneNumSubmit}
                />
                {phoneNum &&
                  (isUpdating ? (
                    <></>
                  ) : (
                    <button
                      onClick={handleBtnClick}
                      style={{ background: "white", border: "none" }}
                    >
                      <img src={UpdateImg} alt="updateImg" />
                    </button>
                  ))}
              </div>
            ) : (
              <></>
            )}
          </NoCenterVertical>
        </Horizontal>
      </InfoWrapper>
    </div>
  );
}

export default ProfileComponent;