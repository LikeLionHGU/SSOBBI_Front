import styled from "styled-components";
import LandingMoneyImg2 from "../../../imgs/LandingMoney2.png";
import { Horizontal, Vertical } from "../../../styles/CommunalStyle";
import { BsChatFill } from "react-icons/bs";

const Box = styled.div`
  background: linear-gradient(to right, #5fb185, #3f3188);
`;
const SSOBBI = styled.span`
  color: white;
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  margin-left: 6px;
  margin-right: 6px;
  font-size: 14px;
`;
const Text = styled.p`
  color: white;
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
  color: white;
  border: 1px solid white;
  background-color: rgba(255, 255, 255, 0.1);
  font-family: "SUITLight";
  font-size: 12px;
  border-radius: 40px;
  width: 161px;
  height: 39px;
  margin-top: 16px;
  cursor: pointer;
`;
const MoneyImg = styled.img`
  width: 290px;
  height: 210px;
  margin-left: 30px;
`;

export default function Slide2Component({ onMoveBox }) {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };
  return (
    <Box>
      <Horizontal>
        <Vertical>
          <Text style={{ marginTop: "32px" }}>소중한 나의 자산,</Text>
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
            <MoneyImg src={LandingMoneyImg2} />
          </div>
        </Vertical>
      </Horizontal>
    </Box>
  );
}
