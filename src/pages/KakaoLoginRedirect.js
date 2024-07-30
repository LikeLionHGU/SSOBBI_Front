import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserTokenState, tokenState, userData } from "../store/atom";
import axios from "axios";

const KakaoLoginRedirect = () => {
  const setUserToken = useSetRecoilState(UserTokenState);
  const setToken = useSetRecoilState(tokenState);
  const setUserData = useSetRecoilState(userData);
  const location = useLocation();
  const navigate = useNavigate();

  // api 요청에 필요한 토큰 저장

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    const secondUrl =
      process.env.REACT_APP_BASE_URL + "/category/monthly/TargetAmount";

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
            setToken(response.data.accessToken); // token 저장
            setUserData(response.data);
            axios
              .get(secondUrl, {
                headers: {
                  Authorization: "Bearer " + response.data.accessToken,
                },
              })
              .then((response) => {
                // 성공 시 처리
                console.log(response.data);
                if (response.data.length === 0) {
                  navigate(`/ssobbi/income?isNew=${true}`);
                } else {
                  navigate("/ssobbi");
                }
              })
              .catch((error) => {
                // 오류 시 처리
                console.error("Error during Kakao login:", error);
              });
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
