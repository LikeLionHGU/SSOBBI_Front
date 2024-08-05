import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Horizontal } from "../../styles/CommunalStyle";
import CheckOverImg from "../../imgs/CheckOver.svg";
import NoCheckOverImg from "../../imgs/NoCheckOver.svg";
import { consumptionIndexState } from "../../store/atom";
import { useSetRecoilState } from "recoil";

const CategoryInput = styled.input`
  &:focus {
    outline: none;
  }
  width: 115px;
  height: 60px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
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
  width: 236px;
  height: 60px;
  border-radius: 10px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: ${(props) => (props.checked === true ? "1px solid red" : "none")};
  font-family: "SUITLight";
  font-size: 20px;
`;

const StyledBtn = styled.button`
  width: 60px;
  height: 60px;
  background: ${(props) => (props.checked === true ? "red" : "#FFFFFF")};
  outline: ${(props) => (props.checked === true ? "none" : "1px solid black")};
  border-radius: 20px;
  border: none;
`;

function CheckComponent({ category, consumption, targetAmount }) {
  const setConsumptions = useSetRecoilState(consumptionIndexState);
  const [inputCheck, setInputCheck] = useState(true);

  function handleCheckBox() {
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
    if (consumption > targetAmount / 30) {
      setInputCheck(true);
    } else {
      setInputCheck(false);
    }
    setConsumptions((prev) =>
      prev.map((itm) => {
        if (itm.category === category) {
          if (consumption > targetAmount / 30) {
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
    <Horizontal style={{ justifyContent: "flex-start", marginBottom: "16px" }}>
      <StyledBtn id={category} onClick={handleCheckBox} checked={inputCheck}>
        <img src={inputCheck ? CheckOverImg : NoCheckOverImg} alt="check" />
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
