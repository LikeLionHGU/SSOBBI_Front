import React from "react";
import styled from "styled-components";
import { contentState } from "../../../store/atom";
import { useRecoilState } from "recoil";

const Title = styled.p`
  font-family: "SUITLight";
  font-size: 18px;
`;

const StyledTextarea = styled.textarea`
  width: 273px;
  height: 60px;
  resize: none;
  &:focus {
    outline: none;
  }
  border: none;
  border-radius: 10px;
  font-family: "SUITLight";
  font-size: 14px;
  padding: 24px;
`;

function ContentComponent() {
  const [content, setContent] = useRecoilState(contentState);
  function handleInputChange(e) {
    const { value } = e.target;
    if (value.length <= "200") {
      setContent(value);
    }
  }
  return (
    <div>
      <Title>오늘의 행복한 일을 알려주세요</Title>
      <StyledTextarea
        id="content"
        maxLength="200"
        value={content}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default ContentComponent;
