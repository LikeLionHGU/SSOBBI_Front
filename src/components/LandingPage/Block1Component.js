import styled from "styled-components";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";
import Landing1Img from "../../imgs/Landing1.png";
import Landing2Img from "../../imgs/Landing2.png";
import Landing3Img from "../../imgs/Landing3.png";

const Text1 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 20px;
  margin: 0;
  margin-bottom: 50px;
`;
const Text2 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 32px;
  margin: 0;
`;
const Text3 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  margin: 0;
`;
const IMG = styled.img`
  width: 250px;
  height: 250px;
  margin-top: 40px;
`;

export default function Block1Component() {
  return (
    <Horizontal style={{ marginTop: "50px" }}>
      <Vertical>
        <Text1>
          하루종일 기분이 안 좋은 날, 나도 모르게 FLEX 한 경험이 있나요?
        </Text1>
        <Text2>쏘삐는 원인을 분석하고 해결책을 제시합니다</Text2>
        <Horizontal>
          <Vertical>
            <IMG src={Landing1Img} />
            <Text3>행복지수별 과소비 분석</Text3>
          </Vertical>
          <Vertical>
            <IMG src={Landing2Img} />
            <Text3>오늘의 일기로 정확한 감정 기록</Text3>
          </Vertical>
          <Vertical>
            <IMG src={Landing3Img} />
            <Text3>소비 기록 알림</Text3>
          </Vertical>
        </Horizontal>
      </Vertical>
    </Horizontal>
  );
}
