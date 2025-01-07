import { useState } from "react"
import Instructions from "./Instructions";
import Footer from "./Footer";

function GameStart({ handleDiceRollEnd, exitDisc, setExitDisc }) {
    const [showPopup, setShowPopup] = useState(false);
    const handleClickPopup = () => {
        setShowPopup(!showPopup);
    }

    return (
        <div className="gamestart-page">
            <button className={`btn-game${exitDisc ? ' btn-left' : ''}`} onClick={handleClickPopup}>
                <p>開始遊戲</p>
                <img src="./images/next.svg" alt="" />
            </button>
            {
                /* 遊戲規則出現 */
                showPopup && <Instructions handleClickPopup={handleClickPopup} setExitDisc={setExitDisc} />
            }
            <div className={`right-disc${exitDisc ? ' slideout-right' : ''}`}>
                <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
            </div>
            <div className={`left-disc${exitDisc ? ' slideout-left' : ''}`}>
                <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
            </div>
            <Footer/>
        </div>
    )
}

export default GameStart