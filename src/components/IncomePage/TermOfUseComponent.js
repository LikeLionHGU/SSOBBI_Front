import React from "react";
import styled from "styled-components";
import { Vertical } from "../../styles/CommunalStyle";

const Title = styled.p`
  color: var(--Black, #0c0c0c);
  text-align: center;
  font-family: "SUITLight";
  font-size: 30px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: 1.2px;
`;

const InfoWrapper = styled.div`
  width: 90%;
  height: 70%;
  padding: 10px 30px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  font-family: "SUITLight";
  overflow: scroll;
  border-radius: 20px;
  background: #f2f6f4;
  text-align: left;
`;
function TermOfUseComponent() {
  return (
    <Vertical>
      <Title>SSOBBI 이용약관</Title>
      <InfoWrapper>
        <p>{info1}</p>
        <p>{info2}</p>
        <p>{info3}</p>

        <p>{info5}</p>
        <p>{info6}</p>
        <p>{info7}</p>

        <p>{info9}</p>
        <p>{info10}</p>
        <p>{info11}</p>
      </InfoWrapper>
    </Vertical>
  );
}

export default TermOfUseComponent;

const info1 = "1. 목적";
const info2 =
  "이 약관은 SSOBBI(이하 회사)가 제공하는 알림톡 서비스(이하 서비스)의 이용과 관";
const info3 =
  "련하여 회사와 이용자(이하 이용자) 간의 권리, 의무 및 책임 사항을 규정함을 목적으로 합니다";
const info5 = "1. 서비스의 제공 및 변경";
const info6 = "회사는 이용자에게 SSOBBI 알림톡 서비스를 제공합니다.";
const info7 =
  "회사는 필요한 경우 서비스의 내용을 변경할 수 있으며, 변경 사항은 사전에 이용자에게 공지합니다.";
const info9 = "1. 서비스 이용";
const info10 =
  "이용자는 회사가 정한 절차에 따라 서비스에 가입하여 이용할 수 있습니다.";
const info11 =
  "이용자는 서비스 이용 시 관련 법령과 회사의 이용약관을 준수해야 합니다";
