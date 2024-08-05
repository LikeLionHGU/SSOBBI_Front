import React, { useEffect, useState } from "react";
import { Vertical } from "../../styles/CommunalStyle";
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
import { useNavigate } from "react-router-dom";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
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

const SubmitBtn = styled.button`
  position: fixed;
  display: flex;
  width: 94px;
  height: 40px;
  padding: 12px 14px;
  justify-content: center;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
  right: -5%;
  bottom: 90px;
  background-color: #2aa663;
  border-radius: 24px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  transform: translateX(-50%);
  color: white;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 0 1px transparent, 0 0 0 4px transparent,
      0 6px 16px rgba(0, 0, 0, 0.12) !important; /*그림자가 세개지만 마지막것만 표시된다.*/
    transform: translateX(-50%) scale(1.04);
  }
`;

const ErrorMessage = styled.p`
  font-family: "SUITMedium";
  font-size: 16px;
  color: red;
`;

function MobCreatePage() {
  const userToken = useRecoilValue(tokenState);
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [updateWording, setUpdateWording] = useState(null);
  const [targetAmount, setTargetAmount] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [happinessRate, setHappinessRate] = useRecoilState(happinessRateState);
  const [content, setContent] = useRecoilState(contentState);
  const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const date = new Date();
  const today = moment(date).format("YYYY-MM-DD");

  function writeBtnClick() {
    let dataLength = consumptions.filter(
      (itm) => itm.category !== "" && itm.amount !== 0
    ).length;

    if (dataLength === 0 && showErrorMessage === false) {
      setShowErrorMessage(true);
      return;
    }

    if (dataLength !== 0) {
      setConsumptions((prev) =>
        prev
          .filter((itm) => itm.category !== "" && itm.amount !== "0")
          .map((itm) => {
            const target = targetAmount.find(
              (t) => t.category === itm.category
            );
            if (target) {
              return {
                category: itm.category,
                targetAmount: target.amount,
                amount:
                  typeof itm.amount === "string"
                    ? convertToInt(itm.amount)
                    : itm.amount,
              };
            }
            return itm;
          })
      );
      if (id !== null) {
        navigate(`/ssobbi/create/check?id=${id}`, {
          state: { date: today },
        });
      } else {
        navigate("/ssobbi/create/check", {
          state: { date: today },
        });
      }
    } else {
      const apiUrl = process.env.REACT_APP_BASE_URL + "/records";
      const newArr = {
        happinessRate: happinessRate,
        content: content,
        date: today,
        consumptions: [],
      };
      axios
        .post(apiUrl, newArr, {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_BASE_URL + `/records/daily/${today}`;
    setConsumptions([]);
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data;
        let newArr;
        if (data.isRecorded) {
          setHappinessRate(data.happinessRate);
          setContent(data.content);
          setUpdateWording("수정하기");
          if (data.consumptions.length > 0) {
            newArr = data.consumptions.map((itm, idx, arr) => ({
              key: idx,
              id: idx,
              category: itm.category,
              amount: itm.amount,
              focus: false,
              isLast: idx === arr.length - 1,
            }));
          } else {
            newArr = dummy;
          }
          setId(data.id);
        } else {
          setHappinessRate(0);
          setContent("");
          newArr = dummy;
          setId(null);
          setUpdateWording("기록하기");
        }
        setConsumptions(newArr);
        console.log(newArr);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userToken, setHappinessRate, setContent, setConsumptions, today]);
  return (
    <MobileV>
      <Vertical
        style={{
          justifyContent: "flex-start",
          marginTop: "40px",
          width: "375px",
          position: "relative",
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
        <ConsumptionComponent
          setTargetAmount={setTargetAmount}
          consumptions={consumptions}
          setConsumptions={setConsumptions}
        />
        {showErrorMessage && (
          <ErrorMessage>소비항목이 정말 없나요?</ErrorMessage>
        )}
        <SubmitBtn onClick={writeBtnClick}>{updateWording}</SubmitBtn>
        <MobMenuBarComponent menu={"note"} />
      </Vertical>
    </MobileV>
  );
}

export default MobCreatePage;

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}

const dummy = [
  {
    key: 1,
    id: 1,
    category: "",
    amount: 0,
    focus: false,
    isLast: true,
  },
];
