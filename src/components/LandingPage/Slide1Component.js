import styled from "styled-components";
import LandingMoneyImg from "../../imgs/LandingMoney.svg";
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
  background: linear-gradient(to right, #caf8f5, #d5fac8);
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
  color: ${(props) => props.theme.colors.COLOR80};
  border: 1px solid #2aa663;
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
  width: 300px;
  height: 343px;
`;

export default function Slide1Component({ onMoveBox }) {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };
  return (
    <Box>
      <NoCenterHorizontal>
        <NoCenterVertical style={{ marginLeft: "150px" }}>
          <Text>과한 소비는 이제 그만,</Text>
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
        <MoneyImg src={LandingMoneyImg} />
      </NoCenterHorizontal>
    </Box>
  );
}
