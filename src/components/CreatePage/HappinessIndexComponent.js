import React, { useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  -webkit-appearance: none; /* Remove default styling */
  appearance: none;
  width: 100%; /* Full width */
  height: 10px; /* Height of the slider */
  background: #e0e0e0; /* Background color of the slider */
  border-radius: 5px; /* Rounded corners */
  outline: none; /* Remove outline */
  opacity: 0.7; /* Transparency */
  transition: opacity 0.2s; /* Transition for hover effect */

  &::hover {
    opacity: 1; /* Full opacity on hover */
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none; /* Remove default styling */
    appearance: none;
    width: 20px; /* Thumb width */
    height: 20px; /* Thumb height */
    border-radius: 50%; /* Circular thumb */
    background: #4caf50; /* Thumb color */
    cursor: pointer; /* Pointer cursor on hover */
    box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.5); /* Thumb shadow */
  }

  &::-moz-range-thumb {
    width: 20px; /* Thumb width */
    height: 20px; /* Thumb height */
    border-radius: 50%; /* Circular thumb */
    background: #4caf50; /* Thumb color */
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
    <>
      <div>
        <p>
          OO님의 <strong>오늘 행복 지수를 알고 싶어요</strong>
        </p>
        <StyledInput
          type="range"
          min="0"
          max="100"
          onChange={handleInputChange}
          value={happiness}
        />
      </div>
    </>
  );
}

export default HappinessIndexComponent;
