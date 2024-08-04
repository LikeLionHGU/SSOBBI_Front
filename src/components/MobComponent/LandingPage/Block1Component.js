import styled from "styled-components";
import { Vertical, Horizontal } from "../../../styles/CommunalStyle";

const Text1 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 14px;
  margin: 0;
  margin-bottom: 10px;
`;
const Text2 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 18px;
  margin: 0;
  margin-top: 30px;
`;
const Text3 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 14px;
  margin: 0;
  width: 170px;
  margin-top: 20px;
`;
const Block = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 30px;
  background-color: aliceblue;
`;

export default function Block1Component() {
  return (
    <Vertical style={{ marginTop: "40px" }}>
      <Text1>하루종일 기분이 안 좋은 날, </Text1>
      <Text1>나도 모르게 FLEX 한 경험이 있나요?</Text1>
      <Text2>쏘삐는 원인을 분석하고 해결책을 제시합니다</Text2>

      <Block />
      <Text3>쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??</Text3>

      <Block />
      <Text3>쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??</Text3>

      <Block />
      <Text3>쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??</Text3>
    </Vertical>
  );
}
