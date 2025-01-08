import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function ExportLoading({ setShowLoading }) {
    const [outDisc, setOutDisc] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOutDisc(true);
        }, 500)
    }, [setShowLoading])

    return (
        <>
            <div className="loading-page">
                <img className='logo' src="./images/logo.svg" alt="logo" />
                <div className='loading-words'>
                    <div className="dialog-box">
                        <p>遊戲結束！</p>
                        <img src="./images/triangle.svg" alt="triangle" />
                    </div>
                    <div className="words">
                        <p>正在匯出你的專屬歌單</p>
                        <div className="little-dot dot-one"></div>
                        <div className="little-dot dot-two"></div>
                        <div className="little-dot dot-three"></div>
                        <div className="little-dot dot-four"></div>
                    </div>
                </div>

                <div className={`right-disc ${outDisc ? 'right-disc-out' : ''}`}>
                    {/* <div className='right-disc'> */}
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
                <div className={`left-disc ${outDisc ? 'left-disc-out' : ''}`}>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>
        </>
    )
}

export default ExportLoading