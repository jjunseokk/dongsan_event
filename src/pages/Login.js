import React, { useState } from "react";
import Logo from '../image/dongsan.png';
import '../style/login.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dataState } from "../redux/store";
import axios from "axios";

const Login = () => {
    const [name, setUserName] = useState(""); // --------------- 회원가입 name 값 받기------------
    const [password, setPassword] = useState(""); // ---------------회원가입 password 값 받기------------
    const [tel, setTel] = useState('');// ---------------회원가입 email 값 받기------------
    const [loginName, setLoginName] = useState(""); // --------------- 로그인 name 값 받기------------
    const [loginPassword, setLoginPassword] = useState(""); // ---------------로그인 password 값 받기------------
    const [check, setCheck] = useState('');// ---------------비밀번호 확인 값 받기------------
    const [manager, setManager] = useState('');  //--------관리자 코드 값 받기---------
    let [changePW, setChangePW] = useState(true); // ----비밀번호와 비밀번호 확인 일치하는지..
    let [showModal, setShowModal] = useState(false) // --------------- 회원가입 모달창띄우기 ------------
    const [successJoin, setSuccessJoin] = useState(false); //----------회원가입 성공 모달-------
    const dispatch = useDispatch();
    const [showPw, setShowPw] = useState(false); //-------로그인할 때 비밀번호 보이게 하는 눈버튼
    const navigate = useNavigate();

    const [point, setPoint] = useState()

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const [date, setDate] = useState(formattedDate);
    const total_data = { name, password, tel, manager, point, date };

    // -----회원 가입을 눌렀을 때 node로 post를 한 후 DB에 접근한다.-----
    const handleSubmit = (event) => {
        event.preventDefault();

        if (validatePassword(password) && validatePhoneNumber(tel) && password === check) {
            // 유효한 이메일과 비밀번호인 경우 회원가입 처리
            axios.post("/join", total_data)
                .then((data) => {
                    // console.log(data);
                    if (data.status === 200) {
                        alert('회원가입이 완료되었습니다.');
                        setUserName('');
                        setPassword('');
                        setTel('');
                        setManager('');
                        setCheck('');
                        setShowModal(false)
                    }
                })
                .catch((error) => {
                    if (error) {
                        alert(error.response.data.name);
                    }
                });
        } else if (!validatePassword(password)) {
            alert('비밀번호는 최소 8자 이상, 대소문자와 특수문자가 들어가야합니다.');
        } else if (!validatePhoneNumber(tel)) {
            alert("전화번호 형식이 올바르지 않습니다.");
        }

        // 비밀번호가 일치한지 확인 후 state 변경
        if (password === check) {
            setChangePW(true)
        } else if (password !== check) {
            setChangePW(false);
        }

    }

    // --------로그인 시 DB 접근 후 DB에 일치하는 아이디와 비밀번호가 있다면 로그인 성공-----------
    const login_data = { loginName, loginPassword };
    const goLogin = (event) => {
        event.preventDefault();

        axios.post("/login", login_data)
            .then((data) => {
                if (data.data.success) {
                    // 로그인 성공
                    // console.log("성공");
                    // console.log(data.data.success[0]);
                    setPoint(data.data.success[0].point);
                    dispatch(dataState(data.data.success[0]));
                    // 로그인한 사용자 정보를 저장하고, 다른 페이지에서 사용할 수 있도록 처리할 수 있습니다.
                    data.data.success[0].manager === 'dongsan!!' ? navigate('/Manager') : navigate(`/Event`);
                }
            })
            .catch(error => alert('아이디와 비밀번호가 일치하지 않습니다.'));
    }

    // 전화번호 정규식
    const validatePhoneNumber = (phoneNumber) => {
        // 전화번호에 포함된 하이픈 제거
        const number = phoneNumber.replace(/-/g, '');
        console.log(phoneNumber);
        // 전화번호 정규식 패턴
        const re = /^\d{2,3}\d{3,4}\d{4}$/;
      
        return re.test(number);
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
                        <label style={{ position: 'relative' }}>
                            <span>비밀번호</span>
                            <input type={showPw ? 'text' : "password"} name="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            <span style={{ position: 'absolute', top: '15px', right: -40, fontSize: 10, cursor: 'pointer' }} onClick={() => {
                                setShowPw(!showPw);
                            }}>{showPw ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}</span>
                        </label>
                        <button className="learn-more" type="submit">로그인</button>
                        <p><span onClick={() => {
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
                        <p>전화번호</p>
                        <input type="tel" maxLength='13' value={tel} placeholder="전화번호(- 포함)를 입력하세요." onChange={(e) => setTel(e.target.value)} required />
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

            <div className={successJoin ? "success-modal-container success-modal-action" : "success-modal-container"}>
                <div className="success-modal">
                    <h3>회원가입이 완료되었습니다.</h3>
                    <button onClick={() => {
                        setSuccessJoin(false);
                    }}>확인</button>
                </div>
            </div>

        </div>
    )
}


export default Login;
