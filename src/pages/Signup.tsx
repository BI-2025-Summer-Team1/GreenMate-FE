import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import "../styles/Signup.css";

interface User {
  email: string;
  password: string;
  nickname: string;
  profileImage?: string;
}

const mockUsers: User[] = [
  {
    email: "test",
    password: "1234",
    nickname: "testuser",
  },
];

function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string>("");//preview 기능 확인하기
  const [error, setError] = useState<string>("");
  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);// 중복 확인을 했는지 확인
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean>(false);// 닉네임 사용 가능 여부
  const navigate = useNavigate();

  const handleNicknameCheck = () => {
    if (!nickname.trim()) {
      setError("닉네임을 입력해주세요.");
      return;
    }

    // 실제로는 API 호출로 중복 확인
    const isNicknameExists = mockUsers.some((user) => user.nickname === nickname);
    
    if (isNicknameExists) {
      setError("이미 사용 중인 닉네임입니다.");
      setNicknameAvailable(false);
    } else {
      setError("");
      setNicknameAvailable(true);
      alert("사용 가능한 닉네임입니다.");
    }
    setNicknameChecked(true);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!email || !password || !confirmPassword || !nickname) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (!nicknameChecked || !nicknameAvailable) {
      setError("닉네임 중복 확인을 해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 4) {
      setError("비밀번호는 4자 이상이어야 합니다.");
      return;
    }

    try {
      // 실제 회원가입 API 호출 부분은 주석 처리
      // const response = await fetch('/mockup-api/signup', { ... });

      // 이메일 중복 확인
      const emailExists = mockUsers.some((user) => user.email === email);
      if (emailExists) {
        throw new Error("이미 가입된 이메일입니다.");
      }

      // 회원가입 성공 시뮬레이션
      console.log("Profile image uploaded:", profileImage?.name || "No image");
      alert("회원가입이 완료되었습니다!");
      void navigate(ROUTES.LOGIN);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("회원가입 중 오류가 발생했습니다.");
      }
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">GreenMate</h2>
        <div className="welcome">
          환경 운동가들을 위한 커뮤니티에 가입하세요.
        </div>
        <br />
        <div className="form-group">
          <div className="letter">닉네임</div>
          <div className="nickname-container">
            <input
              type="text"
              value={nickname}
              onChange={(e) => {
                setNickname(e.target.value);
                setNicknameChecked(false);
                setNicknameAvailable(false);
              }}
              required
              placeholder="홍길동"
              className="form-input nickname-input"
            />
            <button
              type="button"
              onClick={handleNicknameCheck}
              className="nickname-check-button"
            >
              중복확인
            </button>
          </div>
          {nicknameChecked && nicknameAvailable && (
            <div className="success-message">사용 가능한 닉네임입니다.</div>
          )}
        </div>
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <div className="letter">이메일</div>
          <input
            type="email"
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
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        <div className="form-group">
          <div className="letter">비밀번호 확인</div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
            autoComplete="new-password"
          />
        </div>

        

        <div className="form-group">
          <div className="letter">프로필 이미지</div>
          <div className="file-upload-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="file-input-hidden"
              id="profileImageInput"
            />
            <button
              type="button"
              onClick={() => document.getElementById('profileImageInput')?.click()}
              className="file-select-button"
            >
             이미지 업로드
            </button>
            <span className="file-name">
              {profileImage ? profileImage.name : "선택된 파일 없음"}
            </span>
          </div>
          {profileImagePreview && (
            <div className="profile-preview">
              <img
                src={profileImagePreview}
                alt="프로필 미리보기"
                className="profile-image-preview"
              />
            </div>
          )}
        </div>

        
        
        <button type="submit" className="signup-button">
          회원가입
        </button>
        
        <br />
        
        <div className="sign-in">
          이미 계정이 있으신가요?&nbsp;
          <span
            style={{ color: "#000000", cursor: "pointer", fontWeight: "bold" }}
            onClick={() => void navigate(ROUTES.LOGIN)}
          >
            로그인
          </span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
