import React, { useState } from 'react';

function Login(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try{
            // 로그인 api call // 로그인 개발 시에는 로그인 api가 개발되지 않아 mockup API 서버로 호출
            const response = await fetch('/mockup-api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email,password})

            });
            if(!response.ok){
                throw new Error('로그인 실패');
            }
            const data = await response.json();

            localStroage.setItem('token', data.token);

            window.location.href = '/dashboard'; // 로그인 성공 후 랜딩페이지 설정
        } catch(err){
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <lable>Email</lable>
                <input
                    type="email"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    required
                    placeholder="이메일을 입력하세요"
                ></input>
            </div>
            <div>
                <label>password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    required
                    placeholder="비밀번호를 입력하세요"
                ></input>
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <button type="submit">로그인</button>


        </form>
    );
}

export default Login;

