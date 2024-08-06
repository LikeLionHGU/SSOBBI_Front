import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consumptionIndexState,
  happinessRateState,
  contentState,
  tokenState,
} from "../../store/atom";
import { IoIosArrowBack } from "react-icons/io";
import InfoCircleImg from "../../imgs/InfoCircle.svg";
import {
  Horizontal,
  NoCenterHorizontal,
  Vertical,
} from "../../styles/CommunalStyle";
import TooltipComponent from "../../components/OverConsumptionPage/TooltipComponent";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import MobMenuBarComponent from "./MobMenuBarComponent";
import LogoImg from "../../imgs/Logo.png";
import CheckComponent from "../../components/MobComponent/MobOverConsumptionPage/CheckComponent";
import ModalComponent from "../../components/MobComponent/MobOverConsumptionPage/ModalComponent";
import CompleteModalComponent from "../../components/MobComponent/MobOverConsumptionPage/CompleteModalComponent";

const MobileV = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 70px;
  overflow: hidden;
`;

const TooltipBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "SUITLight";
  font-size: 20px;

  > p > span {
    font-family: "SUITSemiBold";
  }
`;

const StyledBtn = styled.button`
  background: #2aa663;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);
  width: 100px;
  height: 48px;
  border-radius: 20px;
  border: none;
  color: white;
  font-family: "SUITLight";
  font-size: 17px;
  cursor: pointer;
  position: fixed;
  bottom: 90px;
  transform: translateX(120%);
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

const BackBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: #f8fcf9;
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 5px;

  > svg {
    width: 30px;
    height: 30px;
  }
`;

function MobOverConsumptionPage() {
  const location = useLocation();
  const selectedDate = location.state.date;
  const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const happinessRate = useRecoilValue(happinessRateState);
  const content = useRecoilValue(contentState);
  const userToken = useRecoilValue(tokenState);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleBtnClick() {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log(id);
    if (id !== null) {
      const apiUrl = process.env.REACT_APP_BASE_URL + `/records/${id}`;
      const newArr = {
        happinessRate: happinessRate,
        content: content,
        consumptions: consumptions,
      };
      axios
        .put(apiUrl, newArr, {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("기록하기 성공", response);
          setShowModal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const apiUrl = process.env.REACT_APP_BASE_URL + "/records";
      const newArr = {
        happinessRate: happinessRate,
        content: content,
        date: selectedDate,
        consumptions: consumptions,
      };
      console.log("기록하기 위해 넘겨질 데이터 확인", newArr);
      axios
        .post(apiUrl, newArr, {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("기록하기 성공", response);
          setShowModal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    setConsumptions((prev) =>
      prev.map(({ id, ...rest }) => ({
        ...rest,
      }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <MobileV>
      {showModal && (
        <ModalComponent closeModal={() => navigate("/ssobbi")}>
          <CompleteModalComponent closeModal={() => navigate("/ssobbi")} />
        </ModalComponent>
      )}
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
        <TitleWrapper>
          <BackBtn onClick={() => navigate(-1)}>
            <IoIosArrowBack />
          </BackBtn>
          <p style={{ marginTop: "16px" }}>과소비 내역이 맞는지 확인해주세요</p>
          <div className="container">
            <TooltipComponent infoText="hello world">
              <TooltipBtn className="btn">
                <img src={InfoCircleImg} alt="infoCircle" />
              </TooltipBtn>
            </TooltipComponent>
          </div>
        </TitleWrapper>
        {consumptions.map((itm) => (
          <CheckComponent
            category={itm.category}
            consumption={itm.amount}
            targetAmount={itm.targetAmount}
          />
        ))}
        <StyledBtn onClick={handleBtnClick}>완료하기</StyledBtn>
        <MobMenuBarComponent menu={"note"} />
      </Vertical>
    </MobileV>
  );
}

export default MobOverConsumptionPage;
