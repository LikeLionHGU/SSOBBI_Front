import React, { useState } from "react";
import styled from "styled-components";
import CheckImg from "../../imgs/CheckImg.svg";
const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 5;
`;

const Tooltip = styled.div`
  width: 257px;
  height: 81.284px;
  background-color: #19844a;
  text-align: center;
  border-radius: 20px;
  position: absolute;
  bottom: -90px;
  right: -30px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.showTooltip === true ? 1 : 0)};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "SUITLight";
  font-size: 16px;

  .arrow {
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #19844a;
    position: absolute;
    top: -8px;
    right: calc(20% - 10px);
  }

  > p {
    margin: 2px;
    > img {
      margin-right: 5px;
    }
  }
`;
function TooltipComponent({ children, show }) {
  return (
    <TooltipContainer className="tooltip_container">
      {children}

      <Tooltip showTooltip={show}>
        <p>행복지수에 따른</p>
        <p> 소비패턴을 확인해보세요 🤑 </p>
        <div className="arrow" />
      </Tooltip>
    </TooltipContainer>
  );
}

export default TooltipComponent;
