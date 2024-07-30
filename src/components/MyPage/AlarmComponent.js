import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 83vh;
  background-color: #f2f6f4;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 300px;
`;

function AlarmComponent() {
  return (
    <Wrapper>
      <p>알람</p>
    </Wrapper>
  );
}

export default AlarmComponent;
