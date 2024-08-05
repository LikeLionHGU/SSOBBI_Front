import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Circle1 from "../../../imgs/Circle1.svg";
import Circle2Check from "../../../imgs/Circle2Check.svg";
import Circle2NoCheck from "../../../imgs/Circle2NoCheck.svg";
import Circle3Check from "../../../imgs/Circle3Check.svg";
import Circle3NoCheck from "../../../imgs/Circle3NoCheck.svg";
import CircleCheck from "../../../imgs/CircleCheck.svg";

const ProgressBar = styled.div`
  width: 240px;
  height: 3px;
  border-radius: 5px;
  background-color: #eee;
  overflow: hidden;
`;

const ProgressPoint = styled.img`
  position: absolute;
  z-index: 3;
  left: ${(props) => props.location};
  transform: translate(-50%, -50%);
  background-color: #f8fcf9;
`;

export default function ProgressBarComponent({ isRunning, handleProgress }) {
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    if (handleProgress.direction === "go") {
      if (filled < handleProgress.point && isRunning) {
        // setTimeout(() => setFilled((prev) => (prev += 10)), 500);
        setFilled((prev) => (prev += 10));
      }
    } else if (handleProgress.direction === "back") {
      if (filled > handleProgress.point && isRunning) {
        setTimeout(() => setFilled((prev) => (prev -= 11.1)), 50);
      }
    }
  }, [filled, isRunning, handleProgress]);
  return (
    <div style={{ marginTop: "54px", position: "relative" }}>
      <ProgressBar className="progressBar">
        <div
          style={{
            height: "100%",
            width: `${filled}%`,
            backgroundColor: "#2aa663",
            transition: "width 0.5s",
          }}
        ></div>
        {filled === 0 ? (
          <>
            <ProgressPoint src={Circle1} alt="circle1" location="0" />
            <ProgressPoint src={Circle2NoCheck} alt="circle1" location="50%" />
            <ProgressPoint src={Circle3NoCheck} alt="circle1" location="100%" />
          </>
        ) : filled < 50 ? (
          <>
            <ProgressPoint src={CircleCheck} alt="circle1" location="0" />
            <ProgressPoint src={Circle2NoCheck} alt="circle1" location="50%" />
            <ProgressPoint src={Circle3NoCheck} alt="circle1" location="100%" />
          </>
        ) : filled === 50 ? (
          <>
            <ProgressPoint src={CircleCheck} alt="circle1" location="0" />
            <ProgressPoint src={Circle2Check} alt="circle1" location="50%" />
            <ProgressPoint src={Circle3NoCheck} alt="circle1" location="100%" />
          </>
        ) : filled < 100 ? (
          <>
            <ProgressPoint src={CircleCheck} alt="circle1" location="0" />
            <ProgressPoint src={CircleCheck} alt="circle1" location="50%" />
            <ProgressPoint src={Circle3NoCheck} alt="circle1" location="100%" />
          </>
        ) : filled === 100 ? (
          <>
            <ProgressPoint src={CircleCheck} alt="circle1" location="0" />
            <ProgressPoint src={CircleCheck} alt="circle1" location="50%" />
            <ProgressPoint src={Circle3Check} alt="circle1" location="100%" />
          </>
        ) : null}
      </ProgressBar>
    </div>
  );
}
