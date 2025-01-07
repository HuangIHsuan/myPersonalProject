import { FaDiceOne } from "react-icons/fa"
import DiceRollingBig from "./DiceRollingBig";
import { useRef, useState } from "react";
import SongList from "../pages/SongList";

function Instructions({handleDiceRollEnd, setExitDisc}) {

    const [showDice, setShowDice] = useState(false);
    const handleClickDice = () => {
        setShowDice(!showDice);
        setExitDisc(true);
    }

    const showRef = useRef(null);
    const showRef2 = useRef(null);
    const handleClickPopupClose = () => {
        showRef.current.style.display = 'none';
        showRef2.current.style.display = 'none';
    }

    return (
        <>
            <div id="popup" ref={showRef}>
                <div className="overlay"></div>
                <div className="instruction">
                    <div className="board">
                        <h2 className="title">遊戲規則</h2>
                        <div className="content">
                            <p>1. 每次點擊擲骰子，會隨機獲得 1 至 6 點數，代表移動的格數。</p>
                            <p>2. 每次移動後，停下的格子會放大，顯示該格歌曲的介紹文字。</p>
                            <p>3. 每次擲骰的點數會累加至總步數，例如：<br />第一次骰到 4，走到第 4 格；第二次骰到 5，走到第 9 格。</p>
                            <p>4. 當所有累加的步數<span>超過第 30 格</span>，遊戲結束。</p>
                            <p>5. 結束後，會根據走過的格子<span>生成專屬歌單</span>，讓你回顧！</p>
                        </div>
                        <h2 className="title">--- 點擊骰子開始遊戲，探索你的音樂旅程吧！ ---</h2>
                    </div>
                </div>
            </div>
            {/* 骰子按鈕 */}
            <div className='popup-dice-section' ref={showRef2}>
                <div className="popup-dialog-box">
                    <p>點一下開始遊戲！</p>
                    <img src="./images/triangle.svg" alt="triangle" />
                </div>
                <div className="popup-dice-container"
                    onClick={() => {
                        handleClickPopupClose();
                        handleClickDice();
                    }}>
                    <button className='popup-dice'><FaDiceOne /></button>
                </div>
            </div>
            {
                showDice && <SongList 
                handleDiceRollEnd={handleDiceRollEnd} setExitDisc={setExitDisc}/>
            }
        </>
    )
}

export default Instructions