import React, { useEffect, useState } from "react";
import { Wheel } from 'react-custom-roulette'

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

    useEffect(()=>{
        fetch("/points", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ points })
        })
            .then(response => response.json())
            .then((data) => {
                if (data.success) {
                    console.log("성공");
                } else {
                    console.log("실패!");
                }
            })
            .catch(error => console.error(error));
    },[points])

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
        <div>
            <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={prizeNumber}
                data={data}
                onStopSpinning={handleStopSpinning}
            />
            <button onClick={handleSpinClick}>SPIN</button>
            {result && <p>{result}</p>}
            <p>현재 보유 포인트: {points + points}</p>
        </div>
    )
}

export default Event;
