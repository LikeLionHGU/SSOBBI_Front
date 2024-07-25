import React, { useState } from "react";
import IncomeInputComponent from "../components/IncomePage/IncomeInputComponent";
import TargetAmountComponent from "../components/IncomePage/TargetAmountComponent";
import { Vertical } from "../styles/CommunalStyle";

function IncomePage() {
  const [targetAmount, setTargetAmount] = useState(null);
  return (
    <>
      <div>
        <p>
          OO님의 <strong>한달 수입을 입력해주세요</strong>
        </p>
        <IncomeInputComponent setTargetAmount={setTargetAmount} />
      </div>
      <Vertical>
        {targetAmount && <TargetAmountComponent targetAmount={targetAmount} />}
      </Vertical>
    </>
  );
}

export default IncomePage;
