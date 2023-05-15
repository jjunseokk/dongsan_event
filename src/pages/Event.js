import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import '../style/event.scss';

import tree1 from '../image/tree1.png';
import tree2 from '../image/tree2.png';
import title from '../image/title.png';
import text from '../image/text.png';

const Event = () => {
    const data = [
        { option: '1000', score: 1000, style: { backgroundColor: 'yellowgreen' } },
        { option: '500', score: 500, style: { backgroundColor: 'green' } },
        { option: '100', score: 100, style: { backgroundColor: 'yellowgreen' } },
        { option: '300', score: 300, style: { backgroundColor: 'green' } },
        { option: '700', score: 700, style: { backgroundColor: 'yellowgreen' } },
        { option: '1500', score: 1500, style: { backgroundColor: 'green' } },
        { option: '0', score: 0, style: { backgroundColor: 'yellowgreen' } },
        { option: '600', score: 600, style: { backgroundColor: 'green' } },
        { option: '200', score: 200, style: { backgroundColor: 'yellowgreen' } },
        { option: '450', score: 450, style: { backgroundColor: 'green' } },
    ];

    const [mustSpin, setMustSpin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);
    const [points, setPoints] = useState(0);
    const [result, setResult] = useState('');
    const [users, setUsers] = useState({});

    // useEffect(() => {
    //     // 이벤트 결과를 서버에 저장하는 요청
    //     axios.post('/points', { points })
    //         .then(response => {
    //             setUsers(response.data.success);
    //         })
    //         .catch(error => console.error(error));

    // }, [points]);

    // const handleSpinClick = () => {
    //     if (!mustSpin) {
    //         const newPrizeNumber = Math.floor(Math.random() * data.length);
    //         setPrizeNumber(newPrizeNumber);
    //         setMustSpin(true);
    //     }
    // };

    // const handleStopSpinning = () => {
    //     const selectedOption = data[prizeNumber];
    //     const pointToAdd = selectedOption.score;
    //     setPoints(pointToAdd);
    //     setResult(`축하합니다! ${pointToAdd} 포인트를 획득하셨습니다.`);
    //     setMustSpin(false);
    // };

    return (
        <div className="event-container">
            {/* <div className="event-rullet">
                <img className="tree1" src={tree1} alt="tree1" />
                <img className="tree2" src={tree2} alt="tree2" />
                <img src={title} style={{ margin: '0 20px' }} alt="title" />
                <img src={text} alt="text" style={{ zIndex: 1 }} />
                {result && <p style={{ color: '#0FBA21' }}>{result}</p>}
                <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={data}
                    onStopSpinning={handleStopSpinning}
                />
                <button onClick={handleSpinClick}>SPIN</button>
            </div>
            <div className="event-result">
                <p>반갑습니다. {users && users.name} 님 </p>
                <p>{users.point + points}P</p> */}

                <button>뒤로가기</button>
            {/* </div> */}
        </div>
    )
}

export default Event;
