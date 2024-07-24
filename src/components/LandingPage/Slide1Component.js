import styled from "styled-components";
import LandingMoneyImg from "../../imgs/LandingMoney.png";
import {
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";

const Box = styled.div`
  width: 100%;
  height: 100%;
`;
const SSOBBI = styled.span`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  margin-left: 10px;
  margin-right: 10px;
`;
const Text = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 38px;
  width: 500px;
  margin-left: 150px;
  margin: 0;
`;
const SSOBBIBT = styled.button`
  color: white;
  background-color: ${(props) => props.theme.colors.COLOR70};
  font-family: "SUITLight";
  font-size: 24px;
  border: none;
  border-radius: 40px;
  width: 256px;
  height: 62px;
  margin-top: 50px;
  cursor: pointer;
`;
const IntroBT = styled.button`
  color: ${(props) => props.theme.colors.COLOR80};
  border: none;
  background-color: white;
  font-family: "SUITLight";
  font-size: 24px;
  border-radius: 40px;
  width: 256px;
  height: 62px;
  margin-top: 24px;
  cursor: pointer;
`;
const MoneyImg = styled.img`
  width: 450px;
  height: 343px;
  margin-left: 150px;
`;

export default function Slide1Component() {
  return (
    <Box>
      <NoCenterHorizontal>
        <NoCenterVertical>
          <Text>과한 소비는 이제 그만,</Text>
          <Text>
            나는 이제
            <SSOBBI>SSOBBI</SSOBBI>로 관리해
          </Text>
          <SSOBBIBT>쏘삐로 저장하기</SSOBBIBT>
          <IntroBT>서비스 더 알아보기</IntroBT>
        </NoCenterVertical>
        <MoneyImg src={LandingMoneyImg} />
      </NoCenterHorizontal>
    </Box>
  );
}
