import React, { useState } from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
  width: 200px;
  height: 100px;
  resize: none;
  border: 1px solid ${(props) => (props.isOver ? "red" : "black")};
  &:focus {
    outline: none;
    border: 1px solid black;
  }
`;

function EmotionIndexComponent() {
  const [content, setContent] = useState("");
  const [isOver, setIsOver] = useState(false);
  const handleInputChange = (e) => {
    if (e.target.value.length <= "50") {
      setContent(e.target.value);
      setIsOver(false);
    } else {
      setIsOver(true);
      // 글자 수 초과 색 변경 기능 작동 안함
    }
  };
  return (
    <div>
      <p>오늘의 감정을 입력해주시오</p>
      <p className="textCount">{content.length}자</p>
      <p className="textTotal">/50자</p>
      <StyledTextarea
        id="content"
        maxLength="50"
        onChange={handleInputChange}
        value={content}
        isOver={isOver}
      ></StyledTextarea>
    </div>
  );
}

export default EmotionIndexComponent;
