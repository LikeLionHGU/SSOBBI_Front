import React, { useState } from "react";
import styled from "styled-components";

const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Tooltip = styled.div`
  width: 200px;
  font-size: 12px;
  font-weight: 400;
  background-color: #fff;
  text-align: center;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid black;
  position: absolute;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.showTooltip === true ? 1 : 0)};

  .arrow {
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid #fff;
    position: absolute;
    bottom: -12px;
    left: calc(50% - 12px);
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
        {infoText}

        <div className="arrow" />
      </Tooltip>
    </TooltipContainer>
  );
}

export default TooltipComponent;
