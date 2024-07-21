import React from "react";

const LandingPage = () => {
  const handleLoginClick = () => {
    window.location.href = process.env.REACT_APP_KAKAO_URL;
  };

  return (
    <div>
      <h1>SSOBBI 랜딩 페이지</h1>
      <button onClick={handleLoginClick}>카카오톡 로그인</button>
    </div>
  );
};

export default LandingPage;
