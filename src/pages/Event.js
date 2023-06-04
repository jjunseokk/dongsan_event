import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette';
import axios from "axios";
import '../style/event.scss';
import man from '../image/man.png';
import girl from '../image/girl.png';
import { useNavigate } from "react-router-dom";

import title from '../image/title.png';
import { useSelector } from "react-redux";

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


    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const [date, setDate] = useState(formattedDate);


    // useEffect(() => {
    //     // Retrieve users data from localStorage if available
    //     const storedUsers = localStorage.getItem('users');
    //     if (storedUsers) {
    //         setUsers(JSON.parse(storedUsers));
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('users', JSON.stringify(users));
    // }, [users]);


    useEffect(() => {
        axios.post('/Event')
            .then(response => {
                console.log(response.data.data[0]);
                setUsers(response.data.data[0]);
            })
            .catch(error => console.error(error));
    }, [points]);

    const handleSpinClick = () => {
        const newPrizeNumber = Math.floor(Math.random() * data.length);
        setPrizeNumber(newPrizeNumber);
        const point = (data[newPrizeNumber].score);
        console.log(point);
        axios.post('/points', { point: point, date, reduxData })
            .then(response => {
                console.log("data", response);
                setResult(response.data)
            })
            .catch(error => console.error(error));
    };

    const handleStopSpinning = () => {
        setPrizeNumber(null);
    };

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
        </div>
    )
}

export default Event;
