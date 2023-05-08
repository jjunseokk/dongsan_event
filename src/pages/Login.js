import React from "react";
import Logo from '../image/dongsan.png';
import '../style/login.scss';


const Login = () => {
    return (
        <div className="login-container">
            <img src={Logo} alt="logo" />

            {/* ------------로그인 영역-------------------------------- */}
            <div className="login-area">
                <form className="form-area">
                    <div className="input-area">
                        <div style={{ width: '100%' }}>
                            <span className="label">이름</span>
                            <input type="text" name="name" />
                        </div>
                        <div style={{ width: '100%' }}>
                            <span className="label">비밀번호</span>
                            <input type="password" name="password" />
                        </div>
                    </div>
                    <button class="learn-more" type="submit">로그인</button>
                </form>
            </div>
            <p>회원가입</p>
        </div>
    )
}


export default Login;