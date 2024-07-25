import React, { useState } from "react";

const dummyData = [
  {
    category: "식비",
    money: "30000",
  },
  {
    category: "교통비",
    money: "40000",
  },
];
function IncomeInputComponent(props) {
  const [monthIncome, setMonthIncome] = useState("");
  function handleInputChange(e) {
    const { value } = e.target;
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    const formattedNumber = new Intl.NumberFormat().format(onlyNumber);
    setMonthIncome(formattedNumber);
  }
  function activeEnter(e) {
    if (e.key === "Enter") {
      handleBtnClick();
    }
  }
  function handleBtnClick() {
    // 백엔드로 한달 수입 보내기
    // 정보 불러와서 targetAmount에 저장
    props.setTargetAmount(dummyData);
  }
  return (
    <>
      <input
        onChange={handleInputChange}
        value={monthIncome}
        onKeyDown={activeEnter}
      />
      <button onClick={handleBtnClick}>입력하기</button>
    </>
  );
}

export default IncomeInputComponent;
