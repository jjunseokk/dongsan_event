import React, { useState, useEffect } from "react";
import Logo from '../image/dongsan.png';
import '../style/login.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [name, setUserName] = useState(""); // --------------- 회원가입 name 값 받기------------
    const [password, setPassword] = useState(""); // ---------------회원가입 password 값 받기------------
    const [email, setEmail] = useState('');// ---------------회원가입 email 값 받기------------
    const [loginName, setLoginName] = useState(""); // --------------- 로그인 name 값 받기------------
    const [loginPassword, setLoginPassword] = useState(""); // ---------------로그인 password 값 받기------------
    const [check, setCheck] = useState('');// ---------------비밀번호 확인------------
    const [manager, setManager] = useState('');
    let [changePW, setChangePW] = useState(true); // ----비밀번호와 비밀번호 확인 일치하는지..
    let [showModal, setShowModal] = useState(false) // --------------- 모달창띄우기 ------------
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();


    // -----회원 가입을 눌렀을 때 node로 post를 한 후 DB에 접근한다.-----
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validatePassword(password) && validateEmail(email) && password === check) {
            // 유효한 이메일과 비밀번호인 경우 회원가입 처리
            fetch("/join", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, password, email, manager })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    if (error) {
                        console.log("error", error);
                    }
                });
        } else if (!validatePassword(password) || !validateEmail(email)) {
        
        }
        // 비밀번호가 일치한지 확인 후 state 변경
        if (password === check) {
            setChangePW(true)
        } else if (password !== check) {
            setChangePW(false);
        }

    }

    // --------로그인 시 DB 접근 후 DB에 일치하는 아이디와 비밀번호가 있다면 로그인 성공-----------
    const goLogin = (event) => {
        event.preventDefault();

        fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ loginName, loginPassword })
        })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    // 로그인 성공
                    console.log("성공");
                    // 로그인한 사용자 정보를 저장하고, 다른 페이지에서 사용할 수 있도록 처리할 수 있습니다.
                    navigate(`/Event`)
                } else {
                    // 로그인 실패
                    console.log("실패!");
                    alert("아이디와 비밀번호를 확인하세요.")
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(()=>{
        axios.get('http://localhost:3000/join')
        .then((res)=>{
            setUsers(...users,...res.data);
            console.log(res.data);
        }).catch(() => {
            console.log("실패");
          });
    },[]);

    // 이메일 정규식
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    // 비밀번호 유효성 검사 함수
    const validatePassword = (password) => {
        // 비밀번호는 최소 8자 이상, 대문자와 소문자, 특수문자를 포함해야 함
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return re.test(password);
    };

    return (
        <div className="login-container">
            <img src={Logo} alt="logo" />
            {/* ------------로그인 영역-------------------------------- */}
            <div className="login-area">
                <form onSubmit={goLogin} className="form-area">
                    <div className="input-area">
                        <label>
                            <span>이름</span>
                            <input type="text" name="name" value={loginName} onChange={(e) => setLoginName(e.target.value)} />
                        </label>
                        <label>
                            <span>비밀번호</span>
                            <input type="password" name="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                        </label>
                        <button className="learn-more" type="submit">로그인</button>
                        <p><span style={{ fontSize: '2px' }} onClick={() => {
                            setShowModal(!showModal);
                        }}>회원가입</span></p>
                    </div>
                </form>
            </div>


            <div className={showModal ? "join-modal join-modal-action" : "join-modal"}>
                <FontAwesomeIcon className="closeBtn" icon={faXmark} onClick={() => {
                    setShowModal(!showModal);
                }} />
                <form onSubmit={handleSubmit}>
                    <label>
                        <p>이름</p>
                        <input type="text" value={name} placeholder="실명만 입력하세요." onChange={(e) => setUserName(e.target.value)} required />
                    </label>
                    <label>
                        <p>이메일</p>
                        <input type="text" value={email} placeholder="이메일을 입력하세요." onChange={(e) => setEmail(e.target.value)} required />
                    </label>
                    <label>
                        <p>비밀번호</p>
                        <input type="password" value={password} placeholder="비밀번호를 입력하세요." onChange={(e) => setPassword(e.target.value)} required />
                    </label>
                    <label>
                        <p>비밀번호확인</p>
                        <input type="password" value={check} placeholder="비밀번호를 입력하세요." onChange={(e) => setCheck(e.target.value)} required />

                        {changePW ? <span style={{ fontSize: '5px' }}>비밀번호는 최소 8자 이상, 대소문자와 특수문자를 포함해야 합니다.</span> : <span style={{ color: 'red' }}>비밀번호가 일치 하지 않습니다.</span>}
                    </label>
                    <label>
                        <p>관리자 번호</p>
                        <input type="text" value={manager} placeholder="부여받은 관리자 번호를 입력하세요." onChange={(e) => setManager(e.target.value)} />
                        <span style={{ fontSize: '5px' }}>부여 받은 관리자 번호가 없다면 입력하지 않으셔도 됩니다.</span>
                    </label>
                    <button type="submit">회원가입</button>
                </form>
            </div>
        </div>
    )
}


export default Login;
