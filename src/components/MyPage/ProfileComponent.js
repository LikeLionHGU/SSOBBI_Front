import React from "react";
import styled from "styled-components";

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
  border: 1px solid black;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > span {
    font-family: "SUITLight";
    font-size: 18px;
  }
  margin-left: 20px;
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
function ProfileComponent() {
  return (
    <Wrapper>
      <div
        style={{ display: "flex", flexDirection: "row", marginLeft: "30px" }}
      >
        <Profile></Profile>
        <InfoWrapper>
          <span>이름</span>
          <span>메일</span>
        </InfoWrapper>
      </div>
      <LogoutBtn>로그아웃</LogoutBtn>
    </Wrapper>
  );
}

export default ProfileComponent;
