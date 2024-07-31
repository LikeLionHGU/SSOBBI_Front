import styled from "styled-components";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";

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
const Block = styled.div`
  width: 210px;
  height: 210px;
  margin-top: 80px;
  background-color: aliceblue;
`;

export default function Block1Component() {
  return (
    <Horizontal style={{ marginTop: "60px" }}>
      <Vertical>
        <Text1>
          하루종일 기분이 안 좋은 날, 나도 모르게 FLEX 한 경험이 있나요?
        </Text1>
        <Text2>쏘삐는 원인을 분석하고 해결책을 제시합니다</Text2>
        <Horizontal>
          <Vertical>
            <Block />
            <Text3>
              쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??
            </Text3>
          </Vertical>
          <Vertical>
            <Block />
            <Text3>
              쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??
            </Text3>
          </Vertical>
          <Vertical>
            <Block />
            <Text3>
              쏘삐는 이게 좋다 이게 짱이다 정말 놀라워 다들 써봐 알지??
            </Text3>
          </Vertical>
        </Horizontal>
      </Vertical>
    </Horizontal>
  );
}
