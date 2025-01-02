import { useEffect, useState } from "react";
import ExportSongList from "./ExportSongList";

function ExportLoading({ setShowLoading }) {
    // const [inDisc, setInDisc] = useState(false);

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 2000)

        return () => clearTimeout(timer);
    }, []) */

    return (
        <>
            <div className="loading-page">
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

                <div className='right-disc'>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
                <div className='left-disc'>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>
        </>
    )
}

export default ExportLoading