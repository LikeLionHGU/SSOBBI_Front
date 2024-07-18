import React, { useState, useRef, useEffect } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";
import { priceInputState } from "../../store/atom";
import { useSetRecoilState } from "recoil";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
  }
  width: 100px;
  height: 50px;
  text-align: center;
  border-radius: 10px;
  border: 1bx solid black;
`;

const PriceInput = styled.input`
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: left;
  }
  text-align: center;
  width: 250px;
  height: 50px;
  border-radius: 10px;
  border: 1bx solid black;
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const optionData = ["식비", "교통비", "의류"];

function ConsumptionIndexComponent(props) {
  const [categoryInput, setCategoryInput] = useState(null); // 카테고리 inputValue useState
  const [priceInput, setPriceInput] = useState(null); // 가격 inputValue useState
  const [isFocus, setIsFocus] = useState(false); // 카테고리 focus 관리
  const setIsPriceEnter = useSetRecoilState(priceInputState); // 가격 입력 유무 관리 recoil
  const categoryRef = useRef("");
  const priceRef = useRef("");
  function handleSelectChange(e) {
    setCategoryInput(e.target.value);
    setIsFocus(false);
    priceRef.current.focus();
  }
  function handlePriceInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setPriceInput(onlyNumber);
    setIsPriceEnter(onlyNumber ? true : false);
  }
  function activeEnter(e) {
    if (e.key === "Enter") {
      props.handleBtnChange();
    }
  }

  useEffect(() => {
    if (props.focus === true) categoryRef.current.focus();
  }, []);

  return (
    <div>
      <Horizontal>
        <Vertical>
          <CategoryInput
            id="category"
            ref={categoryRef}
            autocomplete="off"
            onChange={(e) => setCategoryInput(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={(e) => {
              const categorySelects = document.querySelectorAll("select");
              var isSelectTag = false;

              for (const select of categorySelects) {
                if (e.relatedTarget === select) isSelectTag = true;
              }

              if (e.relatedTarget === null || !isSelectTag) {
                setIsFocus(false);

                var isOptionData = false;
                optionData.map((itm) => {
                  if (categoryInput === itm) isOptionData = true;
                });
                if (!isOptionData) setCategoryInput("");
              }
            }}
            value={categoryInput}
          ></CategoryInput>
          {isFocus && (
            <select id="search" size="4" onChange={handleSelectChange}>
              {isFocus &&
                !categoryInput && // 포커스 돼있을때만
                optionData.map((itm) => (
                  <option key={itm} value={itm}>
                    {itm}
                  </option>
                ))}
              {categoryInput && // inputValue에 어떤 값이 들어있을 때
                optionData
                  .filter((itm) =>
                    itm.toLowerCase().includes(categoryInput.toLowerCase())
                  )
                  .map((itm) => (
                    <option key={itm} value={itm}>
                      {itm}
                    </option>
                  ))}
            </select>
          )}
        </Vertical>
        <PriceInput
          id="priceInput"
          ref={priceRef}
          onChange={handlePriceInputChange}
          value={priceInput}
          autocomplete="off"
          onKeyDown={activeEnter}
          placeholder="금액"
        ></PriceInput>
      </Horizontal>
    </div>
  );
}

export default ConsumptionIndexComponent;
