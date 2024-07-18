import React, { useState } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  width: 100%;
  height: 40px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledSpan = styled.span`
  font-size: "55px";
  font-family: "SUITLight";
  font-weight: 400;
  font-size: 12px;
  color: rgba(131, 131, 131, 1);
`;

const StyledInput = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  width: 90%; /* Full width */
  height: 5px; /* Height of the slider */
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

function HappinessIndexComponent() {
  const [happiness, setHappiness] = useState(null);
  const handleInputChange = (e) => {
    setHappiness(e.target.value);
  };
  return (
    <div>
      <p>
        OO님의 <strong>오늘 행복 지수를 알고 싶어요</strong>
      </p>
      <InputWrapper>
        <StyledInput
          type="range"
          min="0"
          max="100"
          onChange={handleInputChange}
          value={happiness}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <StyledSpan>0</StyledSpan>
          <StyledSpan>100</StyledSpan>
        </div>
      </InputWrapper>
    </div>
  );
}

export default HappinessIndexComponent;
