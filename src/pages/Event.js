import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette';
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import '../style/event.scss';
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper";

import title from '../image/title.png';
import man from '../image/man.png';
import girl from '../image/girl.png';

const Event = () => {
    const navigate = useNavigate();
    const redux_data = useSelector((state) => state) || {};

    const data = [
        { option: '1000', score: 1000, style: { backgroundColor: 'white' } },
        { option: '500', score: 500, style: { backgroundColor: 'skyblue' } },
        { option: '100', score: 100, style: { backgroundColor: 'white' } },
        { option: '300', score: 300, style: { backgroundColor: 'skyblue' } },
        { option: '700', score: 700, style: { backgroundColor: 'white' } },
        { option: '1500', score: 1500, style: { backgroundColor: 'skyblue' } },
        { option: '꽝', score: 0, style: { backgroundColor: 'white' } },
        { option: '600', score: 600, style: { backgroundColor: 'skyblue' } },
        { option: '200', score: 200, style: { backgroundColor: 'white' } },
        { option: '450', score: 450, style: { backgroundColor: 'skyblue' } },
    ];

    const [prizeNumber, setPrizeNumber] = useState(null);
    const [points, setPoints] = useState();
    const [result, setResult] = useState('');
    const [users, setUsers] = useState({});
    const [reduxData, setReduxData] = useState(redux_data.data.data);
    const [showModal, setShowModal] = useState(true);
    const [isVideoPlaying, setVideoPlaying] = useState(true);

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const [date, setDate] = useState(formattedDate);

    useEffect(() => {
        axios.post('/Event', reduxData)
            .then(response => {
                setUsers(response.data.data[0]);
            })
            .catch(error => console.error(error));
    }, [points]);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        const point = (data[newPrizeNumber].score);
        // console.log(point);
        axios.post('/points', { point: point, date, reduxData })
            .then(response => {
                // console.log("data", response);
                setResult(response.data);
                setPoints(point);
            })
            .catch(error => console.error(error));
    };
    const handleStopSpinning = () => {
        setPrizeNumber(null);
    };

    const handleCloseModal = () => {
        setVideoPlaying(false); // 동영상 소리 끄기
        setShowModal(false); // 모달 닫기
    };
    
    // const src = "https://www.youtube.com/embed/oQTLIlgOsnA?loop=1&autoplay=1&mute=0&playlist=oQTLIlgOsnA"
    // const src1 = "https://www.youtube.com/embed/0SS-MA1Yj8g?loop=1&autoplay=1&mute=0&playlist=0SS-MA1Yj8g"
    // const src2 = "https://www.youtube.com/embed/YXfzapAgLSo?loop=1&autoplay=1&mute=0&playlist=YXfzapAgLSo"

  
    return (
        <div className="event-container">
            <div className="event-rullet">
                <img src={title} className="title" style={{ margin: '0 20px' }} alt="title" />
                {result && <p style={{ color: 'white' }}>{result}</p>}
                <Wheel
                    mustStartSpinning={prizeNumber !== null}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={handleStopSpinning}
                    outerBorderColor="white"
                    outerBorderWidth="10"
                    radiusLineWidth="2"
                    spinDuration="0.5"
                />
                <button onClick={handleSpinClick}>SPIN</button>
                <img className="man" src={man} alt="" />
                <img className="girl" src={girl} alt="" />
            </div>
            <div className="event-result">
                <p className="talk1">반갑습니다. {users && users.name} 님 </p>
                <p className="talk2">내포인트: {users && (users.point)}P</p>

                <button style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/')
                }}>뒤로가기</button>
            </div>

            {/* <div className={showModal ? "modal" : "modal modal-active"}>
                <Swiper slidesPerView={1} navigation={true} modules={[Navigation]} className="mySwiper">
                    <SwiperSlide><iframe width="100%" height="500" src={isVideoPlaying? src : ""} title="돌아가고 싶은 그때 그 시절 2013~2016년도에 들었던 감성 힙합 &amp; 알앤비 노래 모음ㅣPLAYLISTㅣ플레이리스트 광고없음" /></SwiperSlide>
                    <SwiperSlide><iframe width="100%" height="500" src={isVideoPlaying? src1 : ""} title="수치 플레이" ></iframe></SwiperSlide>
                    <SwiperSlide><iframe width="100%" height="500" src={isVideoPlaying? src2 : ""} title="내가 듣고 싶어서 올리는 감성 팝송 5대장 𝗣𝗹𝗮𝘆𝗹𝗶𝘀𝘁 (𝗳𝗲𝗮𝘁. 𝗟𝗔𝗡𝗬, 𝗟𝗮𝘂𝘃, 𝗣𝗲𝗱𝗲𝗿 𝗘𝗹𝗶𝗮𝘀, 𝗖𝗵𝗮𝗿𝗹𝗶𝗲 𝗣𝘂𝘁𝗵, 𝗧𝗿𝗼𝘆𝗲 𝗦𝗶𝘃𝗮𝗻)"></iframe></SwiperSlide>
                    <SwiperSlide>Slide 4</SwiperSlide>
                    <SwiperSlide>Slide 5</SwiperSlide>
                    <SwiperSlide>Slide 6</SwiperSlide>
                    <SwiperSlide>Slide 7</SwiperSlide>
                    <SwiperSlide>Slide 8</SwiperSlide>
                    <SwiperSlide>Slide 9</SwiperSlide>
                </Swiper>
                <button onClick={() => { handleCloseModal() }}>닫기</button>
            </div> */}
        </div>
    )
}

export default Event;
