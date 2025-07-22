import React, { useEffect, useState } from 'react';
import '../styles/Login.css';

interface User {
  email: string;
  password: string;
}

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const mockUser: User[] = [
    {
      email: 'test@test',
      password: '1234',
    },
  ];

  // useEffect를 통해 error 값이 바뀔 때 alert 실행
  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

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

      window.location.href = '/landingpage'; // 로그인 성공 후 랜딩페이지 이동
    } catch (err) {
      setError('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    
    <div className="flex justify-center items-center min-h-screen bg-gray-100 w-full">
      {/* 위의 form을 이 div 안에 넣으세요 */
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-lg shadow-md w-72"
        >
          <h2 className="text-center mb-5 text-2xl text-gray-800">로그인</h2>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-gray-600">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력하세요"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-black"
              autoComplete="username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-bold text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="비밀번호를 입력하세요"
              className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none text-black"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <div className="text-red-500 text-xs mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded text-base hover:bg-blue-800"
          >
            로그인
          </button>
        </form>
      }
    </div>
  );
}

export default Login;