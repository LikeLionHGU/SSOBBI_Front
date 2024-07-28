import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { tokenState } from "../store/atom";

const AuthWrapper = ({ children }) => {
  const token = useRecoilValue(tokenState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("토큰이 만료되어 접근할 수 없습니다.");
      navigate("/");
    }
  }, [token, navigate]);

  return children;
};

export default AuthWrapper;
