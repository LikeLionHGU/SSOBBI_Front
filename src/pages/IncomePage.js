import React, { useState } from "react";
import IncomeInputComponent from "../components/IncomePage/IncomeInputComponent";
import TargetAmountComponent from "../components/IncomePage/TargetAmountComponent";
import { Vertical } from "../styles/CommunalStyle";
import { useNavigate } from "react-router-dom";

function IncomePage() {
  const [targetAmount, setTargetAmount] = useState(null);
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate(-1)}>뒤로가기</button>
      <div>
        <p>
          OO님의 <strong>한달 수입을 입력해주세요</strong>
        </p>
        <IncomeInputComponent setTargetAmount={setTargetAmount} />
      </div>
      <Vertical>
        <p>
          카테고리별로 한달에 사용할 <strong>목표금액</strong>을 설정해주세요
        </p>
        {targetAmount &&
          targetAmount.map((itm) => <TargetAmountComponent item={itm} />)}
        <button>확인</button>
      </Vertical>
    </>
  );
}

export default IncomePage;
