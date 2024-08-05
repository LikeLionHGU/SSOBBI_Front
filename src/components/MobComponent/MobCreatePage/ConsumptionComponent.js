import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { tokenState, userData } from "../../../store/atom";
import ConsumptionInputComponent from "./ConsumptionInputComponent";
import axios from "axios";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
`;

function ConsumptionComponent(props) {
  const userInfo = useRecoilValue(userData);
  // const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const userToken = useRecoilValue(tokenState);
  const [options, setOptions] = useState(null);
  const [keyCounter, setKeyCounter] = useState(1); // id 1씩 증가시키기 위한 useState

  function handleAddBtnClick() {
    props.setConsumptions((prev) => [
      ...prev.map((itm) => ({ ...itm, focus: false, isLast: false })),
      {
        key: keyCounter + 1,
        id: keyCounter + 1,
        focus: true,
        isLast: true,
        category: "",
        amount: "0",
      },
    ]);
    setKeyCounter((prev) => prev + 1);
  }

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
        console.log(response);
        const data = response.data.responses;
        setOptions(data.map((itm) => itm.category));
        props.setTargetAmount(data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);
  return (
    <div>
      <Title>{userInfo.name}님의 소비를 입력해주세요</Title>
      {props.consumptions.map((itm) => (
        <>
          <ConsumptionInputComponent
            key={itm.id}
            id={itm.id}
            category={itm.category}
            amount={itm.amount}
            handleAddBtnClick={handleAddBtnClick}
            focus={itm.focus}
            isLast={itm.isLast}
            options={options}
          />
        </>
      ))}
    </div>
  );
}

export default ConsumptionComponent;
