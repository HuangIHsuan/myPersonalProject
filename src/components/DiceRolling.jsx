import { useState } from 'react';
import { FaDiceOne, FaDiceTwo, FaDiceThree, FaDiceFour, FaDiceFive, FaDiceSix } from "react-icons/fa";


function DiceRolling({ handleClickPopup }) {

    const diceSides = [
        <FaDiceOne />,
        <FaDiceTwo />,
        <FaDiceThree />,
        <FaDiceFour />,
        <FaDiceFive />,
        <FaDiceSix />
    ]

    const [dice1, setDice1] = useState(diceSides[0]);
    const [isRolling, setIsRolling] = useState(false);

    const roll = () => {
        setIsRolling(true);

        setTimeout(() => {
            setIsRolling(false);
            setDice1(diceSides[(Math.floor(Math.random() * diceSides.length))]);

        }, 1000);

    }

    return (
        <div id='dice-section'>
            <div className="dialog-box">
                <p>點一下開始遊戲！</p>
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
    )
}

export default DiceRolling