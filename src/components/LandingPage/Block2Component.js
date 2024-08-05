import styled from "styled-components";
import { NoCenterVertical, Horizontal } from "../../styles/CommunalStyle";
import Saly1 from "../../imgs/Saly1.svg";
import Saly2 from "../../imgs/Saly2.svg";
import Saly3 from "../../imgs/Saly3.svg";

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

export default function Block2Component({ id }) {
  return (
    <NoCenterVertical style={{ marginTop: "140px" }} id={id}>
      <Text1>
        감정적 소비보다는{" "}
        <span style={{ fontWeight: "bold" }}>합리적 쏘삐</span>를
      </Text1>
      <Horizontal>
        <Saly1Img src={Saly1} />
        <TextBox style={{ marginLeft: "-100px" }}>
          <p>
            {" "}
            소비내역과 일기를 <span style={{ fontWeight: "bold" }}>
              한번에
            </span>{" "}
            볼 수 있어서 좋았어요. 카테고리로 선정하게 되면 그 안에 포함시키기
            모호한 것들이 분명 존재하는데, 위의 일기를 통해서 그 소비가
            무엇이었는지 <span style={{ fontWeight: "bold" }}>확실하게</span> 알
            수 있었어요!
          </p>
        </TextBox>
      </Horizontal>
      <Horizontal>
        <TextBox style={{ marginLeft: "250px" }}>
          {" "}
          <p>
            내가 기분 좋을 때 돈을 많이 쓰는 타입인지, 아니면 우울할때 돈을 많이
            쓰는 타입인지 <span style={{ fontWeight: "bold" }}>한눈에</span> 볼
            수 있어서 좋았어요!
          </p>
        </TextBox>
        <Saly2Img src={Saly2} />
      </Horizontal>
      <Horizontal>
        <Saly3Img src={Saly3} />
        <TextBox style={{ marginLeft: "-100px" }}>
          <p>
            {" "}
            돈을 얼마나 쓰는지를 기록하는 것을 넘어서 하루를 기록할 수 있는
            기능을 제공해요. 기록을 통해{" "}
            <span style={{ fontWeight: "bold" }}>유의미한 데이터를</span>{" "}
            보고싶은 분들에게 추천하고 싶어요!
          </p>
        </TextBox>
      </Horizontal>
    </NoCenterVertical>
  );
}
