import styled from "styled-components";
import {
  NoCenterHorizontal,
  Vertical,
  Horizontal,
} from "../styles/CommunalStyle";

const Box = styled.div`
  width: 100%;
  height: 480px;
  margin-top: 100px;
  background-color: #d3dce7;
`;

export default function Footer() {
  return (
    <Box>
      <NoCenterHorizontal>
        <Vertical>Footer</Vertical>
      </NoCenterHorizontal>
    </Box>
  );
}
