import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette';
import axios from "axios";
import '../style/event.scss'

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
    const [totalPoint, setTotalPoint] = useState(0);
    const [users, setUsers] = useState();

    useEffect(() => {
        // 이벤트 결과를 서버에 저장하는 요청
        if (points > 0) {
            axios.post('/points', { points })
                .then(response => {
                    console.log(response.success);
                })
                .catch(error => console.error(error));
        }
    }, [points]);

    // useEffect(() => {
    //     //get request를 서버에 보내는 것
    //     axios.get('/api/login') //엔드 포인트
    //         //서버에서 보내오는 것을 콘솔창 출력
    //         .then((data) => {
    //             setUsers(data.success)
    //             console.log(users)
    //         })
    // }, [])

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
        setTotalPoint(prevTotalPoint => prevTotalPoint + pointToAdd);
        setResult(`축하합니다! ${pointToAdd} 포인트를 획득하셨습니다.`);
        setMustSpin(false);
    };

    return (
        <div className="event-container">
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={handleStopSpinning}
            />
            <button onClick={handleSpinClick}>SPIN</button>
            {result && <p>{result}</p>}
            <p>현재 보유 포인트: {totalPoint}</p>
        </div>
    )
}

export default Event;
