import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Horizontal,
  NoCenterHorizontal,
  NoCenterVertical,
} from "../../styles/CommunalStyle";
import LogoImg from "../../imgs/Logo.png";
import ProfileComponent from "../../components/MobComponent/MobMyPage/ProfileComponent";
import IncomeComponent from "../../components/MobComponent/MobMyPage/IncomeComponent";
import CategoryAmountComponent from "../../components/MobComponent/MobMyPage/CategoryAmountComponent";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { tokenState } from "../../store/atom";
import MobMenuBarComponent from "./MobMenuBarComponent";

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

function MobMyPage() {
  const userToken = useRecoilValue(tokenState);
  const [amount, setAmount] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const apiUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";
    axios
      .get(apiUrl, {
        headers: {
          Authorization: "Bearer " + userToken,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data.responses.map((itm, idx, arr) => ({
          category: itm.category,
          amount: convertStringNum(itm.amount),
          isLast: idx === arr.length - 1,
        }));
        setAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdating]);
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
        <ProfileComponent />
        <IncomeComponent />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {amount.map((itm) => (
            <CategoryAmountComponent
              data={itm}
              isUpdating={isUpdating}
              amount={amount}
              setAmount={setAmount}
              isLast={itm.isLast}
            />
          ))}
        </div>
        <MobMenuBarComponent menu={"profile"} />
      </NoCenterVertical>
    </MobileV>
  );
}

export default MobMyPage;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
