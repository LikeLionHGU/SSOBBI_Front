import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: 350px;
  height: 35px;
  border-radius: 5px;
  background-color: #eee;
  position: relative;
  overflow: hidden;
`;

const ProgressPoint = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
  position: absolute;
  z-index: 3;
  top: 15px;
  left: ${(props) => props.location};
  transform: translate(-50%, -50%);
`;

export default function ProgressBarComponent() {
  const [filled, setFilled] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    if (filled > 0 && isRunning) {
      setTimeout(() => setFilled((prev) => (prev -= 2)), 50);
    }
  }, [filled, isRunning]);
  return (
    <div>
      <ProgressBar className="progressBar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#a66cff",
            transition: "width 0.5s",
          }}
        ></div>
        <ProgressPoint location="33.3%" />
        <ProgressPoint location="66.6%" />
      </ProgressBar>
      <button className="btn" onClick={() => setIsRunning(true)}>
        Run
      </button>
    </div>
  );
}
