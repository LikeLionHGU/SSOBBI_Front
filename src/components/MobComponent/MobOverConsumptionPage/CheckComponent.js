import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../../styles/CommunalStyle";
import CheckOverImg from "../../../imgs/CheckOver.svg";
import NoCheckOverImg from "../../../imgs/NoCheckOver.svg";
import { consumptionIndexState } from "../../../store/atom";
import { useRecoilState } from "recoil";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
  }
  width: 93px;
  height: 42px;
  text-align: center;
  border-radius: 10px;
  border: none;
  outline: ${(props) => (props.checked === true ? "1px solid red" : "none")};
  margin-left: 16px;
  margin-right: 16px;
  font-family: "SUITLight";
  font-size: 20px;
`;

const PriceInput = styled.input`
  &:focus {
    outline: none;
  }
  text-align: center;
  width: 158px;
  height: 42px;
  border-radius: 10px;
  border: none;
  outline: ${(props) => (props.checked === true ? "1px solid red" : "none")};
  font-family: "SUITLight";
  font-size: 20px;
`;

const StyledBtn = styled.button`
  width: 42px;
  height: 42px;
  background: ${(props) => (props.checked === true ? "red" : "#FFFFFF")};
  border: ${(props) => (props.checked === true ? "none" : "1px solid black")};
  border-radius: 14px;
`;

function CheckComponent({ category, consumption, targetAmount }) {
  // eslint-disable-next-line no-unused-vars
  const [consumptions, setConsumptions] = useRecoilState(consumptionIndexState);
  const [inputCheck, setInputCheck] = useState(true);
  function handleCheckBox(e) {
    setInputCheck((prev) => !prev);
    setConsumptions((prev) =>
      prev.map((itm) =>
        itm.category === category
          ? { ...itm, isOverConsumption: !inputCheck }
          : itm
      )
    );
  }
  useEffect(() => {
    consumption > targetAmount ? setInputCheck(true) : setInputCheck(false);
    setConsumptions((prev) =>
      prev.map((itm) => {
        if (itm.category === category) {
          if (consumption > targetAmount) {
            return { ...itm, isOverConsumption: true };
          } else {
            return { ...itm, isOverConsumption: false };
          }
        }
        return itm;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Horizontal style={{ justifyContent: "flex-start", marginTop: "12px" }}>
      <StyledBtn id={category} onClick={handleCheckBox} checked={inputCheck}>
        <img
          src={inputCheck === true ? CheckOverImg : NoCheckOverImg}
          alt="check"
        />
      </StyledBtn>
      <CategoryInput value={category} checked={inputCheck} readOnly />
      <PriceInput
        value={convertStringNum(consumption)}
        checked={inputCheck}
        readOnly
      />
    </Horizontal>
  );
}

export default CheckComponent;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}
