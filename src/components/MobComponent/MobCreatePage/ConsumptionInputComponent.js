import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../../styles/CommunalStyle";
import { useSetRecoilState } from "recoil";
import { consumptionIndexState } from "../../../store/atom";
import AddBtnImg from "../../../imgs/AddBtnImg.svg";
import RmvBtnImg from "../../../imgs/RemoveBtnImg.svg";

const ManageBtn = styled.button`
  width: 44px;
  height: 42px;
  border-radius: 16px;
  border: 1px solid
    ${(props) => (props.id === "addBtn" ? "#2AA663" : "#939393")};
  background: #fff;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  cursor: pointer;
  margin-left: 16px;
  &:hover {
  }

  > img {
    width: 16px;
  }
`;

const StyledSelect = styled.div`
  position: absolute;
  top: 48px;
  width: 100px;
  height: 150px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  &:focus {
    outline: none;
  }
  z-index: 1;
  left: 0px;
  background-color: white;
  overflow: scroll;
`;

const CategoryInput = styled.input`
  width: 93px;
  height: 42px;
  text-align: center;
  border-radius: 16px;
  background: var(--White, #fcfffe);
  font-family: "SUITLight";
  font-size: 12px;
  border: none;
  &:focus {
    outline: 1px solid rgba(42, 166, 99, 1);
  }
`;

const StyledOption = styled.div`
  margin: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid black;
  font-family: "SUITLight";
  font-weight: 400;
  font-size: 12px;
`;

const AmountInput = styled.input`
  display: inline-flex;
  width: 126px;
  height: 16px;
  padding: 14px 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 88px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--White, #fcfffe);
  border: none;
  font-family: "SUITLight";
  font-size: 12px;
  &:focus {
    outline: 1px solid rgba(42, 166, 99, 1);
  }
  margin-left: 6px;
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

function ConsumptionInputComponent(props) {
  const setConsumptions = useSetRecoilState(consumptionIndexState);
  const [categoryInput, setCategoryInput] = useState(props.category);
  const [amountInput, setAmountInput] = useState(
    Number.isInteger(props.amount)
      ? convertStringNum(props.amount)
      : props.amount
  );
  const [isFocus, setIsFocus] = useState(false);
  const categoryRef = useRef("");
  const priceRef = useRef("");

  const handleInputsChange = useCallback(() => {
    const id = props.id;

    setConsumptions((prev) => {
      const updatedConsumption = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            category: categoryInput,
            amount: amountInput,
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
          amount: amountInput,
        });
      }

      return updatedConsumption;
    });
  }, [categoryInput, amountInput, props.id, setConsumptions]);

  function handleSelectChange(e, itm) {
    e.stopPropagation(); // 이벤트 전파 막기
    setCategoryInput(itm);
    setIsFocus(false);
    priceRef.current.focus();
  }

  function handleAmountInputChange(e) {
    const { value } = e.target;
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setAmountInput(formattedNumber === "0" ? "" : formattedNumber);
  }

  function handleRmvBtnClick() {
    setConsumptions((prev) => prev.filter((item) => item.id !== props.id));
  }

  useEffect(() => {
    handleInputsChange();
  }, [categoryInput, amountInput, handleInputsChange]);
  return (
    <Horizontal style={{ marginBottom: "12px", justifyContent: "flex-start" }}>
      <Vertical style={{ position: "relative" }}>
        <CategoryInput
          placeholder="카테고리"
          id="category"
          autoComplete="off"
          ref={categoryRef}
          value={categoryInput}
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
              // eslint-disable-next-line array-callback-return
              props.options.map((itm) => {
                if (categoryInput === itm) isOptionData = true;
              });
              if (!isOptionData) setCategoryInput("");
            }
          }}
        />
        {isFocus && (
          <StyledSelect id="search" size="4">
            {!categoryInput && // 포커스 돼있을때만
              props.options.map((itm) => (
                <StyledOption
                  key={itm}
                  value={itm}
                  onClick={(e) => handleSelectChange(e, itm)}
                >
                  {itm}
                </StyledOption>
              ))}
            {categoryInput && // inputValue에 어떤 값이 들어있을 때
              props.options
                .filter((itm) =>
                  itm.toLowerCase().includes(categoryInput.toLowerCase())
                )
                .map((itm) => (
                  <StyledOption
                    key={itm}
                    value={itm}
                    onClick={(e) => handleSelectChange(e, itm)}
                  >
                    {itm}
                  </StyledOption>
                ))}
          </StyledSelect>
        )}
      </Vertical>
      <AmountInput
        placeholder="금액"
        value={amountInput}
        onChange={handleAmountInputChange}
        ref={priceRef}
      />
      {props.isLast === false && (
        <ManageBtn id="rmvBtn" onClick={handleRmvBtnClick}>
          <img src={RmvBtnImg} alt="removeImg" id="rmvBtn" />
        </ManageBtn>
      )}
      {props.isLast === true && (
        <ManageBtn id="addBtn" onClick={props.handleAddBtnClick}>
          <img src={AddBtnImg} alt="addImg" id="addBtn" />
        </ManageBtn>
      )}
    </Horizontal>
  );
}

export default ConsumptionInputComponent;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
