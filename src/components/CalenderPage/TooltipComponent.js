import React from "react";
import styled from "styled-components";
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
  width: ${(props) => (props.version === "mobile" ? "180px" : "257px")};
  height: ${(props) => (props.version === "mobile" ? "47px" : "81.284px")};
  background-color: #19844a;
  text-align: center;
  border-radius: 20px;
  position: absolute;
  bottom: ${(props) => (props.version === "mobile" ? "-60px" : "-90px")};
  right: -30px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.showTooltip === true ? 1 : 0)};
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "SUITLight";

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
const Text = styled.p`
  font-size: ${(props) => (props.version === "mobile" ? "12px" : "16px")};
`;
function TooltipComponent({ children, show, version }) {
  return (
    <TooltipContainer className="tooltip_container">
      {children}

      <Tooltip showTooltip={show} version={version}>
        <Text version={version}>행복지수에 따른</Text>
        <Text version={version}> 소비패턴을 확인해보세요 🤑 </Text>
        <div className="arrow" />
      </Tooltip>
    </TooltipContainer>
  );
}

export default TooltipComponent;
