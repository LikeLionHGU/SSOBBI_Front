import React, { useState } from "react";

function HappinessIndexComponent() {
  const [happiness, setHappiness] = useState(null);
  const handleInputChange = (e) => {
    setHappiness(e.target.value);
  };
  return (
    <>
      <div>
        <p>오늘의 '행복 지수'는 몇 점인가요? : {happiness}</p>
        <input type="range" min="0" max="100" onChange={handleInputChange} />
      </div>
    </>
  );
}

export default HappinessIndexComponent;
