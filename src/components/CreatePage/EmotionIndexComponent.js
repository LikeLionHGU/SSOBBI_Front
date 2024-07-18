import React, { useState } from "react";
import styled from "styled-components";

const TextCount = styled.p`
  position: absolute;
  right: 10px;
  bottom: 0;
  color: gray;
`;
const StyledTextarea = styled.textarea`
  width: 700px;
  height: 100px;
  resize: none;
  &:focus {
    outline: none;
  }
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  border-radius: 10px;
`;

function EmotionIndexComponent() {
  const [content, setContent] = useState("");
  const [isOver, setIsOver] = useState(false);
  const handleInputChange = (e) => {
    if (e.target.value.length <= "200") {
      setContent(e.target.value);
      setIsOver(false);
    } else {
      setIsOver(true);
      // 글자 수 초과 색 변경 기능 작동 안함
    }
  };
  return (
    <div>
      <p>
        OO님의 <strong>행복 지수에 가장 큰 영향을 준 사건은 무엇인가요</strong>
        (그 순간을 구체적으로 작성해주세요)
      </p>
      <div style={{ position: "relative" }}>
        <StyledTextarea
          id="content"
          maxLength="200"
          onChange={handleInputChange}
          value={content}
          isOver={isOver}
        ></StyledTextarea>
        <TextCount className="textCount">{content.length}/200</TextCount>
      </div>
    </div>
  );
}

export default EmotionIndexComponent;
