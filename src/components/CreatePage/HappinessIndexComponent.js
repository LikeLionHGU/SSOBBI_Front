import React, { useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 200px;
  height: 100px;
  resize: none;
`;

function HappinessIndexComponent() {
  const [happiness, setHappiness] = useState(null);
  const handleInputChange = (e) => {
    setHappiness(e.target.value);
  };
  return (
    <>
      <div>
        <p>오늘의 '행복 지수'는 몇 점인가요? : {happiness}</p>
        <input type="range" min="0" max="100" onChange={handleInputChange} />
      </div>
      <div>
        <p>오늘의 감정을 입력해주시오 (최대 50자)</p>
        <StyledTextarea></StyledTextarea>
      </div>
    </>
  );
}

export default HappinessIndexComponent;
