import React, { useEffect, useState } from 'react';
import { useNavigate}   from 'react-router-dom';
import '../styles/Login.css';

interface User {
  email: string;
  password: string;
}
const mockUser: User[] = [
    {
      email: 'test@test',
      password: '1234',
    },
  ];
function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  

  // useEffect를 통해 error 값이 바뀔 때 alert 실행
  // useEffect(() => {
  //   if (error) {
  //     alert(error);
  //   }
  // }, [error]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      // 실제 로그인 API 호출 부분은 주석 처리
      // const response = await fetch('/mockup-api/login', { ... });

      const user = mockUser.find(
        (user) => email === user.email && password === user.password
      );
      if (!user) {
        throw new Error('로그인 실패');
      }

      navigate('/landingpage'); // 로그인 성공 후 랜딩페이지 이동
    } catch (err) {
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">로그인</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="이메일을 입력하세요"
            className="form-input"
            autoComplete="username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
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
        <button
          type="button"
          className="signup-button"
          onClick={() => navigate('/signup')}
        >
          회원가입
        </button>
      </form>

    </div>

  );
}

export default Login;