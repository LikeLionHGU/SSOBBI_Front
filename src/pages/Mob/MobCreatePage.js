/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { NoCenterVertical } from "../../styles/CommunalStyle";
import HappinessRateComponent from "../../components/MobComponent/MobCreatePage/HappinessRateComponent";
import styled from "styled-components";
import MobMenuBarComponent from "./MobMenuBarComponent";
import { Horizontal, NoCenterHorizontal } from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import ContentComponent from "../../components/MobComponent/MobCreatePage/ContentComponent";
import ConsumptionComponent from "../../components/MobComponent/MobCreatePage/ConsumptionComponent";
import moment from "moment";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consumptionIndexState,
  contentState,
  happinessRateState,
  tokenState,
} from "../../store/atom";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  /* height: 100vh; */
`;

const Logo = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 10px;
`;

const Title = styled.p`
  color: ${(props) => props.theme.colors.COLORBlack};
  font-family: "RowdiesBold";
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  margin: 0;
`;

function MobCreatePage() {
  const userToken = useRecoilValue(tokenState);
  const [happinessRate, setHappinessRate] = useRecoilState(happinessRateState);
  const [content, setContent] = useRecoilState(contentState);
  const [consumptions, setConsumpions] = useRecoilState(consumptionIndexState);
  useEffect(() => {
    const date = new Date();
    const today = moment(date).format("YYYY-MM-DD");
    const apiUrl = process.env.REACT_APP_BASE_URL + `/records/daily/${today}`;
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        // let newArr;

        if (data.isRecorded) {
          setHappinessRate(data.happinessRate);
          setContent(data.content);
          // setUpdateWording("수정하기");

          // if(data.consumptions.legth > 0){
          //   newArr = data.consumpion.map((itm, idx, arr) => ({
          //     key:idx,
          //     id:idx,
          //     category:itm.category,
          //   }))
          // }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MobileV>
      <NoCenterVertical
        style={{
          justifyContent: "flex-start",
          marginTop: "40px",
          width: "375px",
        }}
      >
        <NoCenterHorizontal>
          <Horizontal
            style={{
              justifyContent: "flex-start",
              marginLeft: "25px",
            }}
          >
            <a href="/ssobbi">
              <Logo src={LogoImg} />
            </a>
            <a href="/ssobbi" style={{ textDecoration: "none" }}>
              <Title>SSOBBI</Title>
            </a>
          </Horizontal>
        </NoCenterHorizontal>

        <HappinessRateComponent />
        <ContentComponent />
        <ConsumptionComponent />
        <MobMenuBarComponent menu={"note"} />
      </NoCenterVertical>
    </MobileV>
  );
}

export default MobCreatePage;
