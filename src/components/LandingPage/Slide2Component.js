import styled from "styled-components";
import LandingMoneyImg2 from "../../imgs/LandingMoney2.svg";
import {
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";
import { BsChatFill } from "react-icons/bs";

const Box = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 116px;
  padding-bottom: 117px;
  background: linear-gradient(to right, #5fb185, #3f3188);
`;
const SSOBBI = styled.span`
  color: white;
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  margin-left: 10px;
  margin-right: 10px;
`;
const Text = styled.p`
  color: white;
  font-family: "SUITLight";
  font-size: 38px;
  width: 500px;
  margin: 0;
`;
const SSOBBIBT = styled.button`
  background-color: #fee500;
  color: black;
  font-family: "SUITLight";
  font-size: 20px;
  border: none;
  border-radius: 40px;
  width: 256px;
  height: 62px;
  margin-top: 50px;
  cursor: pointer;
`;
const IntroBT = styled.button`
  color: white;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.1);
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
`;

export default function Slide2Component({ onMoveBox }) {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };
  return (
    <Box>
      <NoCenterHorizontal>
        <NoCenterVertical style={{ marginLeft: "150px" }}>
          <Text>소중한 나의 자산,</Text>
          <Text>
            나는 이제
            <SSOBBI>SSOBBI</SSOBBI>로 관리해
          </Text>
          <SSOBBIBT onClick={handleLoginClick}>
            <BsChatFill style={{ marginRight: "10px" }} />
            카카오로 시작하기
          </SSOBBIBT>
          <IntroBT onClick={onMoveBox}>서비스 더 알아보기</IntroBT>
        </NoCenterVertical>
        <MoneyImg src={LandingMoneyImg2} />
      </NoCenterHorizontal>
    </Box>
  );
}
