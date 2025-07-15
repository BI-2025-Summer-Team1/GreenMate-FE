import React, { useEffect, useState } from 'react';

function Login(){
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    
    const mockUser = [
      {
        email:"test@test",
        password:"1234"
      }
    ];
    //useState는 비동기 함수라서 함수 실행후에 값이 업데이트가 되지 않을수 있다.
    //그래서 useEffect를 통해 값이 바뀔때 실행되게 만든다!
    useEffect(() => {
    if (error) {
      alert(error);
    }
    }, [error]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
       

        try{
            // 로그인 api call 
            // 로그인 개발 시에는 로그인 api가 개발되지 않아
            // mockup API 서버로 호출 하는 방법도 잇다!
            // const response = await fetch('/mockup-api/login',{
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({email,password})

            // });
            // if(!response.ok){
            //     throw new Error('로그인 실패');
            // }
            // const data = await response.json();
            // localStroage.setItem('token', data.token);
            // jwt 토큰을 받아와서 로그인 유효기간 설정 해야한다. 추후 업데이트 예정

            const user = mockUser.find((user)=>{
                if(email === user.email && password === user.password)
                  return user;
            })
            if(!user){
              throw new Error("로그인 실패");
            }

            window.location.href = '/landingpage'; // 로그인 성공 후 랜딩페이지 설정
        } catch(err){
            setError('이메일 또는 비밀번호가 잘못되었습니다.');
            // console.log(err);
            // alert(err);
            
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
            {/* {error && <div style={{color: 'red'}}>{error}</div>} */}
            <button type="submit">로그인</button>


        </form>
    );
}

export default Login;

