import styled from "styled-components";
import LogoImg from "../../imgs/Logo.png";
import {
  Horizontal,
  NoCenterVertical,
  NoCenterHorizontal,
} from "../../styles/CommunalStyle";
import SliderComponent from "../../components/MobComponent/LandingPage/SliderComponent";
import Block1Component from "../../components/MobComponent/LandingPage/Block1Component";
import Footer from "../../components/MobComponent/LandingPage/Footer";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  margin: 0;
`;
const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;
const LogIn = styled.button`
  color: ${(props) => props.theme.colors.COLORDark};
  font-family: "SUITLight";
  font-size: 12px;
  border: none;
  background-color: #fcfffe;
  width: 150px;
  cursor: pointer;
`;

const MobLandingPage = () => {
  const handleMoveBox = () => {
    console.log("클릭함 이동버튼");
    const element = document.getElementById("block2");
    console.log(element, "클릭함 이동버튼");
    if (element) {
      console.log("클릭함 이동버튼!!!");
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };

  return (
    <MobileV>
      <NoCenterVertical
        style={{
          justifyContent: "flex-start",
          marginTop: "30px",
          width: "375px",
        }}
      >
        <Horizontal
          style={{
            width: "100%",
            marginTop: "30px",
            marginBottom: "50px",
          }}
        >
          <NoCenterHorizontal>
            <Horizontal
              style={{
                justifyContent: "flex-start",
                marginLeft: "25px",
              }}
            >
              <Logo src={LogoImg} />
              <Title>SSOBBI</Title>
            </Horizontal>
          </NoCenterHorizontal>
          <LogIn onClick={handleLoginClick}>카카오톡 로그인</LogIn>
        </Horizontal>

        <SliderComponent onMoveBox={handleMoveBox} />
        <Block1Component />
        {/* <Block2Component id={"block2"} /> */}
        <Footer />
      </NoCenterVertical>
    </MobileV>
  );
};

export default MobLandingPage;
