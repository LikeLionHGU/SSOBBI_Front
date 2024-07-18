import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { UserTokenState } from "../store/atom";

const KakaoLoginRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setUserToken = useSetRecoilState(UserTokenState);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/auth/kakao-login?code=${code}`;

      axios
        .get(apiUrl)
        .then((response) => {
          // 성공 시 처리
          console.log(response.data);
          if (response.data.accessToken) {
            setUserToken(response.data.accessToken);
            setUserToken({ isLoggedIn: true });
            navigate("/ssobbi");
          }
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
