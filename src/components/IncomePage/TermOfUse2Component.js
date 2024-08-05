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
  height: 400px;
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
function TermOfUse2Component() {
  return (
    <Vertical>
      <Title>SSOBBI 이용약관</Title>
      <InfoWrapper>
        <p>{info1}</p>
        <p>{info2}</p>
        <p>{info3}</p>
        <p>{info4}</p>
        <p>{info5}</p>
        <p>{info6}</p>
        <p>{info7}</p>
        <p>{info8}</p>
        <p>{info9}</p>
        <p>{info10}</p>
        <p>{info11}</p>
        <p>{info12}</p>
        <p>{info13}</p>
        <p>{info14}</p>
        <p>{info15}</p>
        <p>{info16}</p>
      </InfoWrapper>
    </Vertical>
  );
}

export default TermOfUse2Component;

const info1 = "1. **개인정보의 수집 및 이용 목적**";
const info2 = " - 알림톡 서비스 제공 및 관리";
const info3 = "2. **수집하는 개인정보의 항목**";
const info4 = "- 필수항목: 전화번호, 서비스 이용기록";
const info5 = "**개인정보의 보유 및 이용 기간**";
const info6 =
  " - 이용자의 개인정보는 서비스 제공 기간 동안 보유하며, 이용자가 동의를 철회하거나 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.";
const info7 =
  " - 단, 법령에 따라 보관해야 하는 경우 해당 기간 동안 보관합니다.";
const info8 = "4. **개인정보의 제3자 제공**.";
const info9 =
  "- 회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.";
const info10 = "- 다만, 법령에 따라 요구되는 경우는 예외로 합니다.";
const info11 = "5. **개인정보의 파기 절차 및 방법**";
const info12 =
  "- 이용자의 개인정보는 보유 기간이 경과하거나 처리 목적이 달성된 후 지체 없이 파기됩니다.";
const info13 =
  " - 전자적 파일 형태의 정보는 기술적 방법을 사용하여 복구할 수 없도록 영구 삭제합니다.";
const info14 = "6. **이용자의 권리와 의무**";
const info15 =
  "- 이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 수집 및 이용에 대한 동의를 철회할 수 있습니다.";
const info16 =
  " - 이용자는 자신의 개인정보를 최신 상태로 유지해야 하며, 부정확한 정보 제공으로 발생하는 문제에 대해 회사는 책임을 지지 않습니다.";
