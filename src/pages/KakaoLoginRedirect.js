import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const KakaoLoginRedirect = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("useEffect triggered");
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    console.log("code check : ", code);

    if (code) {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/kakao-login?code=${code}`;

      axios
        .get(apiUrl)
        .then((response) => {
          // 성공 시 처리
          console.log(response.data);
          // 예: JWT 토큰 저장, 사용자 정보 저장 등
        })
        .catch((error) => {
          // 오류 시 처리
          console.error("Error during Kakao login:", error);
        });
    }
  }, [location.search]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginRedirect;
