import styled from "styled-components";
import {
  NoCenterHorizontal,
  Vertical,
  NoCenterVertical,
  Horizontal,
} from "../../styles/CommunalStyle";
import Saly1 from "../../imgs/Saly1.svg";
import Saly2 from "../../imgs/Saly2.svg";
import Saly3 from "../../imgs/Saly3.svg";

const Box = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 100px;
`;
const Text1 = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "SUITLight";
  font-size: 32px;
  margin: 0;
  margin-left: 150px;
  margin-bottom: 40px;
`;

const Saly1Img = styled.img`
  width: 450px;
  height: 343px;
`;

const Saly2Img = styled.img`
  width: 450px;
  height: 343px;
  margin-left: -150px;
`;

const Saly3Img = styled.img`
  width: 450px;
  height: 343px;
`;

const TextBox = styled.div`
  width: 867px;
  height: 210px;
  border-radius: 0 80px 80px 80px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  padding: 50px;
  font-size: 24px;
  font-family: "SUITLight";
`;

export default function Block2Component() {
  return (
    <Box>
      <NoCenterHorizontal>
        <NoCenterVertical>
          <Text1>
            감정적 소비보다는{" "}
            <span style={{ fontWeight: "bold" }}>합리적 쏘삐</span>를
          </Text1>
          <Horizontal>
            <Saly1Img src={Saly1} />
            <TextBox style={{ marginLeft: "-100px" }}>
              {" "}
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다.
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다.
            </TextBox>
          </Horizontal>
          <Horizontal>
            <TextBox style={{ marginLeft: "250px" }}>
              {" "}
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다.
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다.
            </TextBox>
            <Saly2Img src={Saly2} />
          </Horizontal>
          <Horizontal>
            <Saly3Img src={Saly3} />
            <TextBox style={{ marginLeft: "-100px" }}>
              {" "}
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다.
              쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐 칭찬입니다. 쏘삐
              칭찬입니다. 쏘삐 칭찬입니다.
            </TextBox>
          </Horizontal>
        </NoCenterVertical>
      </NoCenterHorizontal>
    </Box>
  );
}
