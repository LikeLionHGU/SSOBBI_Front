import React, { useState, useRef, useEffect, useCallback } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";
import { priceInputState, consumptionIndexState } from "../../store/atom";
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
  const [categoryInput, setCategoryInput] = useState(props.category); // 카테고리 inputValue useState
  const [priceInput, setPriceInput] = useState(props.consumption); // 가격 inputValue useState
  const [isFocus, setIsFocus] = useState(false); // 카테고리 focus 관리
  const setIsPriceEnter = useSetRecoilState(priceInputState); // 가격 입력 유무 관리 recoil
  const categoryRef = useRef("");
  const priceRef = useRef("");
  const setConsumptionIndex = useSetRecoilState(consumptionIndexState);

  function handleSelectChange(e) {
    setCategoryInput(e.target.value);
    setIsFocus(false);
    priceRef.current.focus();
  }

  const handleInputsChange = useCallback(() => {
    const id = props.id;

    setConsumptionIndex((prev) => {
      const updatedConsumption = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            category: categoryInput,
            consumption: priceInput,
          };
        }
        return item;
      });

      // id에 해당하는 객체가 없을 경우 새 객체를 추가
      const exists = prev.some((item) => item.id === id);
      if (!exists) {
        updatedConsumption.push({
          id: id,
          category: categoryInput,
          consumption: priceInput,
        });
      }

      return updatedConsumption;
    });
  }, [categoryInput, priceInput, props.id, setConsumptionIndex]);

  function handlePriceInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPriceInput(formattedNumber === "0" ? "" : formattedNumber);
    setIsPriceEnter(onlyNumber ? true : false);
  }
  function activeEnter(e) {
    if (e.key === "Enter") {
      props.handleAddBtnClick();
    }
  }

  useEffect(() => {
    setIsPriceEnter(props.consumption ? true : false);
    if (props.focus === true) categoryRef.current.focus();
  }, [props.focus, props.consumption, setIsPriceEnter]);
  // 맨 처음 렌더링될때 포커스 맞추기 + 소비 이미 있으면 + 버튼 띄우기

  useEffect(() => {
    handleInputsChange();
  }, [categoryInput, priceInput, handleInputsChange]);

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
      {props.isLast === false && <button>빼기</button>}
    </Horizontal>
  );
}

export default ConsumptionIndexComponent;
