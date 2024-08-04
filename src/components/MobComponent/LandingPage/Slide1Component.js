import styled from "styled-components";
import LandingMoneyImg from "../../../imgs/LandingMoney.png";
import { Horizontal, Vertical } from "../../../styles/CommunalStyle";
import { BsChatFill } from "react-icons/bs";

const Box = styled.div`
  background: linear-gradient(to right, #caf8f5, #d5fac8);
`;
const SSOBBI = styled.span`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  margin-left: 6px;
  margin-right: 6px;
  font-size: 14px;
`;
const Text = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  width: 290px;
  margin: 0;
`;
const SSOBBIBT = styled.button`
  background-color: #fee500;
  color: black;
  font-family: "SUITLight";
  font-size: 12px;
  border: none;
  border-radius: 40px;
  width: 161px;
  height: 39px;
  margin-top: 30px;
  cursor: pointer;
`;
const IntroBT = styled.button`
  color: ${(props) => props.theme.colors.COLOR80};
  border: 1px solid #2aa663;
  background-color: white;
  font-family: "SUITLight";
  font-size: 12px;
  border-radius: 40px;
  width: 161px;
  height: 39px;
  margin-top: 16px;
  cursor: pointer;
`;
const MoneyImg = styled.img`
  width: 250px;
  height: 210px;
`;

export default function Slide1Component({ onMoveBox }) {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };
  return (
    <Box>
      <Horizontal>
        <Vertical>
          <Text style={{ marginTop: "32px" }}>과한 소비는 이제 그만,</Text>
          <Text>
            나는 이제
            <SSOBBI>SSOBBI</SSOBBI>로 관리해
          </Text>
          <div style={{ width: "290px" }}>
            <SSOBBIBT onClick={handleLoginClick}>
              <BsChatFill style={{ marginRight: "10px" }} />
              카카오로 시작하기
            </SSOBBIBT>
            <IntroBT onClick={onMoveBox}>서비스 더 알아보기</IntroBT>
            <MoneyImg src={LandingMoneyImg} />
          </div>
        </Vertical>
      </Horizontal>
    </Box>
  );
}
