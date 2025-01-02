import { useEffect, useState } from 'react';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";


function DiceRollingBig({ handleDiceRollEnd }) {

    const diceSides = [
        { value: 1, icon: <FaDiceOne /> },
        { value: 2, icon: <FaDiceTwo /> },
        { value: 3, icon: <FaDiceThree /> },
        { value: 4, icon: <FaDiceFour /> },
        { value: 5, icon: <FaDiceFive /> },
        { value: 6, icon: <FaDiceSix /> },
    ]

    const [dice1, setDice1] = useState(diceSides[0].icon);
    const [isRolling, setIsRolling] = useState(false);
    const [hasRolled, setHasRolled] = useState(false); // 骰子是否完成縮小移位
    const [showOverlay, setShowOverlay] = useState(true);

    useEffect(() => {
        setHasRolled(false); // 初始化時重置 hasRolled
        setIsRolling(false); // 初始化時重置 isRolling
    }, []);

    const roll = () => {
        console.log('Rolling started. isRolling:', isRolling, 'hasRolled:', hasRolled);
        if (isRolling) return; // 防止多次點擊
        setIsRolling(true);

        setTimeout(() => {
            setIsRolling(false);
            const result = Math.floor(Math.random() * 6) + 1;
            const selectedDice = diceSides.find(dice => dice.value === result);
            setDice1(selectedDice.icon); // 更新骰子點數
            setHasRolled(true);

            if (handleDiceRollEnd) {
                setShowOverlay(false); // 關閉 overlay
                handleDiceRollEnd(result); // 通知父組件骰子結果
            }

        }, 1000);
    }

    return (
        <div className={`big-dice ${hasRolled ? ' small-dice' : ''}`}>
            {showOverlay && <div className="overlay"></div>}
            <div className='dice-section'>
                <div className="dialog-box">
                    <p>點一下來擲骰子吧！</p>
                    <img src="./images/triangle.svg" alt="triangle" />
                </div>
                <div className="dice-container">
                    <button
                        disabled={isRolling}
                        onClick={roll}
                        className={`dice ${isRolling ? 'dice-shaking' : ''}`} >{dice1}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DiceRollingBig