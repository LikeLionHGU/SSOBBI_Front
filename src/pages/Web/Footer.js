import styled from "styled-components";
import {
  NoCenterHorizontal,
  NoCenterVertical,
  Horizontal,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import { BsInstagram } from "react-icons/bs";

const Title = styled.p`
  color: white;
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 28px;
  margin: 0;
  margin-top: 10px;
`;
const Logo = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 15px;
`;
const Box = styled.div`
  width: 100%;
  height: 480px;
  margin-top: 100px;
  background-color: black;
`;
const Text = styled.p`
  color: white;
  font-family: "RowdiesLight";
  font-style: normal;
  font-size: 18px;
  margin: 0;
  margin-top: 20px;
  width: 340px;
`;
const Insta = styled.p`
  color: white;
  font-family: "RowdiesLight";
  font-style: normal;
  font-size: 18px;
`;

export default function Footer() {
  return (
    <Box>
      <NoCenterHorizontal>
        <NoCenterVertical style={{ marginTop: "110px", marginLeft: "90px" }}>
          <Horizontal
            style={{
              justifyContent: "flex-start",
              marginTop: "30px",
            }}
          >
            <Logo src={LogoImg} />
            <Title>SSOBBI</Title>
          </Horizontal>
          <Text>
            감정적 소비를 넘어 합리적 쏘삐를 지향합니다. 대한민국 소비의 지향점,
            쏘삐
          </Text>
          <a
            href="https://www.instagram.com/sspbbi_official?igsh=ZnBpcjUwcTJqNHVq&utm_source=qr"
            style={{ textDecoration: "none", width: "100px" }}
          >
            <Horizontal
              style={{
                justifyContent: "flex-start",
                marginTop: "100px",
              }}
            >
              <BsInstagram
                style={{
                  color: "white",
                  marginRight: "15px",
                }}
              />
              <Insta>@SSOBBI</Insta>
            </Horizontal>
          </a>
        </NoCenterVertical>
      </NoCenterHorizontal>
    </Box>
  );
}
