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
`;

const Tooltip = styled.div`
  width: 257px;
  height: 81.284px;
  background-color: #19844a;
  text-align: center;
  border-radius: 20px;
  position: absolute;
  bottom: -90px;
  right: -35px;
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
function TooltipComponent({ infoText, children }) {
  const [showTooltip, setShowTooltip] = useState(false); // 툴팁 상태 관리 state
  return (
    <TooltipContainer
      className="tooltip_container"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {children}

      <Tooltip showTooltip={showTooltip}>
        {/* {infoText} */}
        {/* 일반적 텍스트일경우 */}
        <p>과소비가 맞는 항목에만 </p>
        <p style={{ display: "flex", justifyContent: "center" }}>
          <img src={CheckImg} alt="check" /> 체크표시를 남겨주세요
        </p>
        <div className="arrow" />
      </Tooltip>
    </TooltipContainer>
  );
}

export default TooltipComponent;
