import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import "../styles/Login.css";
type LoginResponse = { accessToken: string; [key: string]: unknown };

async function loginApi(
    email: string,
    password: string,
  ): Promise<LoginResponse> {
    const response = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("로그인 실패");
    return (await response.json()) as LoginResponse;
  }

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginApi(email, password);
      if (typeof data.accessToken === "string") {
        localStorage.setItem("accessToken", data.accessToken);
      }
      void navigate(ROUTES.LANDING);
    } catch {
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          void handleSubmit(e);
        }}
        className="login-form"
      >
        <h2 className="login-title">GreenMate</h2>
        <div className="welcome">
          환경 운동가들을 위한 커뮤니티에 오신 것을 환영합니다.
        </div>
        <div className="form-group">
          <div className="letter">이메일</div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            className="form-input"
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <div className="letter">비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="비밀번호를 입력하세요"
            className="form-input"
            autoComplete="current-password"
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="login-button">
          로그인
        </button>
        <br></br>
        <div className="sign-in">
          계정이 없으신가요?&nbsp;
          <span
            className="login-link"
            onClick={() => void navigate(ROUTES.SIGNUP)}
          >
            회원가입
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
