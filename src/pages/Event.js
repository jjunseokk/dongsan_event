import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette';
import axios from "axios";
import '../style/event.scss';
import man from '../image/man.png';
import girl from '../image/girl.png';
import { useNavigate } from "react-router-dom";

import title from '../image/title.png';

const Event = () => {
    const navigate = useNavigate();

    const data = [
        {
            option: '1000',
            score: 1000, style: { backgroundColor: 'white' }
        },
        { option: '500', score: 500, style: { backgroundColor: 'skyblue' } },
        { option: '100', score: 100, style: { backgroundColor: 'white' } },
        { option: '300', score: 300, style: { backgroundColor: 'skyblue' } },
        { option: '700', score: 700, style: { backgroundColor: 'white' } },
        { option: '1500', score: 1500, style: { backgroundColor: 'skyblue' } },
        { option: '0', score: 0, style: { backgroundColor: 'white' } },
        { option: '600', score: 600, style: { backgroundColor: 'skyblue' } },
        { option: '200', score: 200, style: { backgroundColor: 'white' } },
        { option: '450', score: 450, style: { backgroundColor: 'skyblue' } },
    ];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [points, setPoints] = useState(0);
    const [result, setResult] = useState('');
    const [users, setUsers] = useState({});

    useEffect(() => {
        // 이벤트 결과를 서버에 저장하는 요청
        axios.post('/points', { points })
            .then(response => {
                setUsers(response.data.success);
            })
            .catch(error => console.error(error));

    }, [points]);

    const handleSpinClick = () => {
        if (!mustSpin) {
            const newPrizeNumber = Math.floor(Math.random() * data.length);
            setPrizeNumber(newPrizeNumber);
            setMustSpin(true);
        }
    };

    const handleStopSpinning = () => {
        const selectedOption = data[prizeNumber];
        const pointToAdd = selectedOption.score;
        setPoints(pointToAdd);
        setResult(`축하합니다! ${pointToAdd} 포인트를 획득하셨습니다.`);
        setMustSpin(false);
    };

    return (
        <div className="event-container">
            <div className="event-rullet">
                <img src={title} className="title" style={{ margin: '0 20px' }} alt="title" />
                {result && <p style={{ color: '#0FBA21' }}>{result}</p>}
                <Wheel
                    mustStartSpinning={mustSpin}
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
                <p className="talk2">내포인트 : {users && users.point + points}P</p>

                <button style={{ cursor: 'pointer' }} onClick={() => {
                    navigate('/')
                }}>뒤로가기</button>
            </div>

        </div>
    )
}

export default Event;
