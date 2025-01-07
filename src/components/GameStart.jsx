import { useEffect, useState } from "react"
import Instructions from "./Instructions";
import Footer from "./Footer";

function GameStart({ handleDiceRollEnd, exitDisc, setExitDisc }) {
    const [showPopup, setShowPopup] = useState(false);
    const [logoUp, setLogoUp] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLogoUp(true);
        }, 600)
    }, [])

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
            <div className={`logo-run${exitDisc ? ' logo-left' : ''}`}>
                <div className="ani-container1">
                    <div className={`roll-group ${logoUp ? 'logo-up' : ''}`}>
                        <img className="roll" src="./images/roll.svg" alt="roll" />
                        <img className="roll-dice" src="./images/roll-dice.svg" alt="dice" />
                    </div>
                </div>
                <div className="ani-container2">
                    <img className={`the ${logoUp ? 'logo-up' : ''}`} src="./images/the.svg" alt="the" />
                </div>
                <div className="ani-container3">
                    <img className={`rhymes ${logoUp ? 'logo-up' : ''}`} src="./images/Rhymes.svg" alt="rhymes" />
                </div>

            </div>
            <Footer />
        </div>
    )
}

export default GameStart