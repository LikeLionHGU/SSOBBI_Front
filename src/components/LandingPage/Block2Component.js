import styled from "styled-components";
import {
  NoCenterHorizontal,
  Vertical,
  NoCenterVertical,
} from "../../styles/CommunalStyle";

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
  margin-left: 100px;
  margin-bottom: 40px;
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
        </NoCenterVertical>
      </NoCenterHorizontal>
    </Box>
  );
}
