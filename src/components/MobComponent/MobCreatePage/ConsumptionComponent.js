import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userData } from "../../../store/atom";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 20px;
`;

function ConsumptionComponent() {
  const userInfo = useRecoilValue(userData);

  return (
    <div>
      <Title>{userInfo.name}의 소비를 입력해주세요</Title>
    </div>
  );
}

export default ConsumptionComponent;
