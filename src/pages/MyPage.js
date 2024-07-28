import React from "react";
import MenuBarComponent from "../components/MainPage/MenuBarComponent";
import { Horizontal, Vertical } from "../styles/CommunalStyle";
import styled from "styled-components";

const Profile = styled.div`
  width: 640px;
  height: 131px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
`;
function MyPage() {
  return (
    <Horizontal>
      <MenuBarComponent />
      <Vertical>
        <Profile>프로필</Profile>
        <div>한달수입</div>
        <div>목표금액</div>
      </Vertical>
    </Horizontal>
  );
}

export default MyPage;
