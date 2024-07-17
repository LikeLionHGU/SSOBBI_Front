import React, { useState } from "react";
import { Vertical, Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";

const StyledInput = styled.input`
  &:focus {
    outline: none;
  }
`;

const optionData = ["식비", "교통비", "의류"];

function ConsumptionIndexComponent() {
  const [inputValue, setInputValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const handleSelectChange = (e) => {
    setInputValue(e.target.value);
    setIsFocus(false);
  };
  return (
    <div>
      <Horizontal>
        <Vertical>
          <StyledInput
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => {
              const categorySelects = document.querySelectorAll("select");
              var isSelectTag = false;

              for (const select of categorySelects) {
                if (e.relatedTarget === select) isSelectTag = true;
              }

              if (e.relatedTarget === null || !isSelectTag) {
                setIsFocus(false);
                setInputValue("");
              }
            }}
            value={inputValue}
          ></StyledInput>
          {isFocus && (
            <select id="search" size="4" onChange={handleSelectChange}>
              {isFocus &&
                !inputValue && // 포커스 돼있을때만
                optionData.map((itm) => (
                  <option key={itm} value={itm}>
                    {itm}
                  </option>
                ))}
              {inputValue && // inputValue에 어떤 값이 들어있을 때
                optionData
                  .filter((itm) =>
                    itm.toLowerCase().includes(inputValue.toLowerCase())
                  )
                  .map((itm) => (
                    <option key={itm} value={itm}>
                      {itm}
                    </option>
                  ))}
            </select>
          )}
        </Vertical>
        <StyledInput></StyledInput>
      </Horizontal>
    </div>
  );
}

export default ConsumptionIndexComponent;
