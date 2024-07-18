import React, { useState, useRef, useEffect } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";
import { priceInputState } from "../../store/atom";
import { useSetRecoilState } from "recoil";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
    border: 1px solid rgba(42, 166, 99, 1);
  }
  width: 115px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
`;

const StyledSelect = styled.select`
  position: absolute;
  top: 65px;
  width: 166px;
  height: 215px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  &:focus {
    outline: none;
  }
  z-index: 1;
`;

const StyledOption = styled.option`
  margin: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid black;
  font-family: "SUITLight";
  font-weight: 400;
  font-size: 12px;
`;

const PriceInput = styled.input`
  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: left;
    padding-left: 24px;
  }
  text-align: center;
  width: 236px;
  height: 60px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  &:focus {
    outline: none;
    border: 1px solid rgba(42, 166, 99, 1);
  }
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-right: 16px;
`;

const optionData = ["식비", "교통비", "의류", "문화", "취미", "악기"];

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
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPriceInput(formattedNumber);
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
    <Horizontal style={{ marginTop: "16px" }}>
      <Vertical>
        <CategoryInput
          id="category"
          ref={categoryRef}
          autocomplete="off"
          placeholder="카테고리"
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
          <StyledSelect id="search" size="4" onChange={handleSelectChange}>
            {!categoryInput && // 포커스 돼있을때만
              optionData.map((itm) => (
                <StyledOption key={itm} value={itm}>
                  {itm}
                </StyledOption>
              ))}
            {categoryInput && // inputValue에 어떤 값이 들어있을 때
              optionData
                .filter((itm) =>
                  itm.toLowerCase().includes(categoryInput.toLowerCase())
                )
                .map((itm) => (
                  <StyledOption key={itm} value={itm}>
                    {itm}
                  </StyledOption>
                ))}
          </StyledSelect>
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
  );
}

export default ConsumptionIndexComponent;
