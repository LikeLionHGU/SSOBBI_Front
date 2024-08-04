import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { happinessRateState, userData } from "../../../store/atom";
import { Horizontal } from "../../../styles/CommunalStyle";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
`;

const HappyInputWrapper = styled.div`
  width: 290px;
  height: 71px;
  border-radius: 20px;
  background: var(--White, #fcfffe);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HappinessInput = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  width: 90%; /* Full width */
  height: 7px; /* Height of the slider */
  background: linear-gradient(
    to right,
    rgba(184, 255, 217, 1),
    rgba(42, 166, 99, 1)
  ); /* Background color of the slider */
  border-radius: 5px; /* Rounded corners */
  outline: none; /* Remove outline */
  /* opacity: 0.7; Transparency */
  transition: opacity 0.2s; /* Transition for hover effect */
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default styling */
    appearance: none;
    width: 10px; /* Thumb width */
    height: 10px; /* Thumb height */
    border-radius: 50%; /* Circular thumb */
    border: 1px solid rgba(63, 200, 126, 1);
    background: rgba(240, 255, 247, 1); /* Thumb color */
    cursor: pointer; /* Pointer cursor on hover */
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5); /* Thumb shadow */
  }
`;

const HappyInput2 = styled.input`
  width: 30px;
  height: 50px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  border: none;
  margin-left: 10px;
  font-family: "SUITLight";
  font-size: 15px;
  text-align: center;
  &:focus {
    outline: 1px solid var(--70, #3fc87e);
  }
`;

function HappinessRateComponent() {
  const userInfo = useRecoilValue(userData);
  const [happinessRate, setHappinessRate] = useRecoilState(happinessRateState);

  function handleHappyInputChange(e) {
    const { value } = e.target;
    setHappinessRate(value);
  }
  return (
    <div>
      <Title>{userInfo.name}님의 행복지수를 알려주세요</Title>
      <Horizontal>
        <HappyInputWrapper>
          <HappinessInput
            type="range"
            min="0"
            max="100"
            value={happinessRate}
            onChange={handleHappyInputChange}
          />
        </HappyInputWrapper>
        <HappyInput2 value={happinessRate} onChange={handleHappyInputChange} />
      </Horizontal>
    </div>
  );
}

export default HappinessRateComponent;
