import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  width: 60vw;
  height: 10px;
  border-radius: 5px;
  background-color: #eee;
  overflow: hidden;
`;

// const ProgressPoint = styled.div`
//   width: 17px;
//   height: 17px;
//   border-radius: 50%;
//   background-color: #2aa663;
//   position: absolute;
//   z-index: 3;
//   top: 5px;
//   left: ${(props) => props.location};
//   transform: translate(-50%, -50%);
// `;

export default function ProgressBarComponent({ isRunning, handleProgress }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (handleProgress.direction === "go") {
      if (filled < handleProgress.point && isRunning) {
        setTimeout(() => setFilled((prev) => (prev += 11.1)), 50);
      }
    } else if (handleProgress.direction === "back") {
      if (filled > handleProgress.point && isRunning) {
        setTimeout(() => setFilled((prev) => (prev -= 11.1)), 50);
      }
    }
  }, [filled, isRunning, handleProgress]);
  return (
    <div style={{ position: "relative" }}>
      <ProgressBar className="progressBar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#2aa663",
            transition: "width 0.5s",
          }}
        ></div>
        {/* <ProgressPoint location="33.3%" />
        <ProgressPoint location="66.6%" /> */}
      </ProgressBar>
    </div>
  );
}
