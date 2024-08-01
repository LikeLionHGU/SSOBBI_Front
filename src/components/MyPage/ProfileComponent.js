import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { tokenState } from "../../store/atom";
import { useRecoilValue } from "recoil";
import UpdateImg from "../../imgs/PencilFill.svg";
import axios from "axios";

const Wrapper = styled.div`
  width: 640px;
  height: 130px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Profile = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 64px;

  > img {
    width: 64px;
    height: 64px;
    border-radius: 64px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  > span {
    font-family: "SUITLight";
    font-size: 18px;
  }
  margin-left: 20px;

  > div {
    display: flex;
    align-items: center;
    > button {
      width: 20px;
      height: 20px;
      cursor: pointer;
      background-color: white;
      border: none;
    }
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

const LogoutBtn = styled.button`
  margin-right: 30px;
  width: 65px;
  height: 21px;
  border: none;
  background-color: white;
  cursor: pointer;
  font-family: "SUITLight";
  font-size: 15px;
  color: #939393;
`;

function ProfileComponent({ userInfo }) {
  const phoneNumRef = useRef("");
  const [phoneNum, setPhoneNum] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const userToken = useRecoilValue(tokenState);

  useEffect(() => {
    if (userInfo.phoneNumber) {
      setPhoneNum(userInfo.phoneNumber);
    }
  }, [userInfo.phoneNumber]);

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
        setIsUpdating(false);
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
    <Wrapper>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "30px" }}
      >
        <Profile>
          <img src={userInfo.profileImageUrl} alt="userImg" />
        </Profile>
        <InfoWrapper>
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
              {phoneNum && (
                <button onClick={handleBtnClick}>
                  <img src={UpdateImg} alt="updateImg" />
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
        </InfoWrapper>
      </div>
      {/* <LogoutBtn>로그아웃</LogoutBtn> */}
    </Wrapper>
  );
}

export default ProfileComponent;
