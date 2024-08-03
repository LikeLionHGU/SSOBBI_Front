import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consumptionIndexState,
  happinessRateState,
  contentState,
  tokenState,
} from "../../store/atom";
import { IoIosArrowBack } from "react-icons/io";
import MenuBarComponent from "../../components/MainPage/MenuBarComponent";
import InfoCircleImg from "../../imgs/InfoCircle.svg";
import {
  Horizontal,
  Vertical,
  NoCenterVertical,
} from "../../styles/CommunalStyle";
import CalenderComponent from "../../components/CreatePage/CalenderComponent";
import CheckComponent from "../../components/OverConsumptionPage/CheckComponent";
import TooltipComponent from "../../components/OverConsumptionPage/TooltipComponent";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import ModalComponent from "../../components/IncomePage/ModalComponent";
import CompleteModalComponent from "../../components/CreatePage/CompleteModalComponent";

const Wrapper = styled.div`
  width: 100%;
  min-height: 700px;
  position: relative;
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
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  bottom: 150px;
  right: 30px;
`;

const BackBtn = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: white;
  margin-right: 20px;
  cursor: pointer;
  margin-bottom: 5px;

  > svg {
    width: 30px;
    height: 30px;
  }
`;

function OverConsumptionPage() {
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
    <Horizontal style={{ height: "100vh", alignItems: "flex-start" }}>
      {showModal && (
        <ModalComponent>
          <CompleteModalComponent closeModal={() => navigate("/ssobbi")} />
        </ModalComponent>
      )}
      <MenuBarComponent menu={"note"} />
      <Vertical
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "33px",
          minWidth: "800px",
        }}
      >
        <div style={{ height: "158px" }} />
        <Wrapper>
          <TitleWrapper>
            <BackBtn onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </BackBtn>
            <p style={{ marginTop: "16px" }}>
              쏘삐가 생각하는 OO님의 <span>과소비 내역</span>이 맞는지
              확인해주세요
            </p>
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
        </Wrapper>
      </Vertical>
      <NoCenterVertical style={{ marginLeft: "56px" }}>
        <div style={{ height: "158px" }} />
        <CalenderComponent />
      </NoCenterVertical>
    </Horizontal>
  );
}

export default OverConsumptionPage;