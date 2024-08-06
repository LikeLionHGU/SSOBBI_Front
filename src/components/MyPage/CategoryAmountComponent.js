import React, { useEffect, useState } from "react";
import { Horizontal } from "../../styles/CommunalStyle";
import styled from "styled-components";
import AddBtnImg from "../../imgs/AddBtnImg.svg";
import RmvBtnImg from "../../imgs/RemoveBtnImg.svg";

const CategoryInput = styled.input`
  width: 115px;
  height: 59px;
  border-radius: 20px;
  border: none;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  font-family: "SUITLight";
  font-size: 17px;
  &:focus {
    outline: 1px solid #3fc87e;
  }
  text-align: center;
`;

const PriceInput = styled.input`
  width: 242px;
  height: 59px;
  border-radius: 20px;
  box-shadow: 0px 12px 34px 0px rgba(0, 0, 0, 0.08),
    0px 1.503px 32.312px 0px rgba(0, 0, 0, 0.01);
  border: none;
  margin-left: 16px;
  font-family: "SUITLight";
  font-size: 17px;
  &:focus {
    outline: 1px solid #3fc87e;
  }
  padding-left: 28px;
`;

const Unit = styled.span`
  font-family: "SUITLight";
  font-size: 17px;
  position: absolute;
  right: 20px;
  top: 20px;
`;

const ManageBtn = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 20px;
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

function CategoryAmountComponent({
  data,
  isUpdating,
  amount,
  setAmount,
  setIsMinimumCategory,
  isLast,
  handleAddBtnClick,
  monthIncome,
  setIsIncludeEtcCategory,
}) {
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState(convertStringNum(null));
  function removeBtnClick() {
    if (data.category === "기타") {
      setIsIncludeEtcCategory(true);
      return;
    } else {
      setIsIncludeEtcCategory(false);
    }

    if (amount.length > 2) {
      const arr = amount.filter((itm) => itm.id !== data.id);
      const updatedArr = arr.map((itm, idx, arr) => ({
        ...itm,
        isLast: idx === arr.length - 1,
      }));
      // setAmount((prev) => prev.filter((itm) => itm.id !== data.id));
      setAmount(updatedArr);
      setIsMinimumCategory(false);
    } else {
      setIsMinimumCategory(true);
    }
  }
  function handleCategoryChange(e) {
    if (data.category === "기타") {
      setIsIncludeEtcCategory(true);
      return;
    } else {
      setIsIncludeEtcCategory(false);
    }

    const newCategory = e.target.value;
    setCategory(newCategory);

    setAmount((prev) => {
      // Update the existing category if found
      let categoryExists = false;
      const updatedAmount = prev.map((itm) => {
        if (itm.category === category) {
          categoryExists = true;
          return {
            ...itm,
            category: newCategory,
          };
        }
        return itm;
      });

      if (!categoryExists) {
        updatedAmount.push({
          category: newCategory,
          amount: 0,
        });
      }

      return updatedAmount;
    });
  }

  function handlePriceChange(e) {
    setIsIncludeEtcCategory(false);
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setPrice(formattedNumber);

    const arr = amount.map((itm) =>
      itm.category === category ? { ...itm, amount: formattedNumber } : itm
    );
    const sum = arr.reduce(
      (acc, itm) =>
        itm.category === "기타" ? acc : acc + convertToInt(itm.amount),
      0
    );

    const newArr = arr.map((itm) =>
      itm.category === "기타"
        ? {
            ...itm,
            amount: convertStringNum(monthIncome - sum),
          }
        : itm
    );

    setAmount(newArr);

    // setAmount((prev) =>
    //   prev.map((itm) =>
    //     itm.category === data.category
    //       ? { ...itm, amount: formattedNumber }
    //       : itm
    //   )
    // );
  }
  useEffect(() => {
    setCategory(data.category);
    setPrice(data.amount);
  }, [data]);
  return (
    <Horizontal style={{ marginTop: "14px", justifyContent: "flex-start" }}>
      <CategoryInput
        readOnly={!isUpdating}
        value={category}
        onChange={handleCategoryChange}
      />
      <div style={{ position: "relative" }}>
        <PriceInput
          readOnly={!isUpdating}
          value={price}
          onChange={handlePriceChange}
        />
        <Unit>원</Unit>
      </div>
      {isLast === false && isUpdating === true && (
        <ManageBtn onClick={removeBtnClick} id="rmvBtn">
          <img src={RmvBtnImg} alt="removeImg" id="rmvBtn" />
        </ManageBtn>
      )}
      {isLast === true && isUpdating === true && (
        <>
          <ManageBtn onClick={removeBtnClick} id="rmvBtn">
            <img src={RmvBtnImg} alt="removeImg" id="rmvBtn" />
          </ManageBtn>
          <ManageBtn onClick={handleAddBtnClick} id="addBtn">
            <img src={AddBtnImg} alt="addImg" id="addBtn" />
          </ManageBtn>
        </>
      )}
    </Horizontal>
  );
}

export default CategoryAmountComponent;

function convertStringNum(onlyNumber) {
  const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
  return formattedNumber;
}

function convertToInt(numberString) {
  const numberWithoutCommas = numberString.replace(/,/g, "");
  const number = parseInt(numberWithoutCommas, 10);
  return number;
}
