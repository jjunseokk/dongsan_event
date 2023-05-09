import React, { useState } from "react";
import Logo from '../image/dongsan.png';
import '../style/login.scss';

const Login = () => {
    const [name, setUserName] = useState(""); // --------------- name 값 받기------------
    const [password, setPassword] = useState(""); // --------------- password 값 받기------------
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/event", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, password, email })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    let [showModal, setShowModal] = useState(false)
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
                    <button className="learn-more" type="submit">로그인</button>
                </form>
            </div>
            <p style={{ cursor: 'pointer' }} onClick={() => {
                setShowModal(!showModal);
            }}>회원가입</p>

            <div className={showModal ? "join-modal join-modal-action" : "join-modal"}>
                <form onSubmit={handleSubmit}>
                    <label>
                        이름
                        <input type="text" value={name} onChange={(e) => setUserName(e.target.value)} />
                    </label>
                    <label>
                        이메일
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label>
                        비밀번호
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    )
}


export default Login;
