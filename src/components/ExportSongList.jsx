import { useEffect, useState } from "react"
import DiscEnd from "./DiscEnd";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

function ExportSongList({ exportList, count }) {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(null);
    const [circleIn, setCircleIn] = useState(false);

    useEffect(() => {
        setCircleIn(true);

        // 設置初始索引為中間索引，或使用 defaultIndex（確保在範圍內）
        const middleIndex = Math.floor(exportList.length / 2);
        setCurrentIndex(middleIndex);
    }, [])

    // 左箭頭點擊事件
    const handleLeftClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? exportList.length - 1 : prevIndex - 1
        );
    };

    // 右箭頭點擊事件
    const handleRightClick = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === exportList.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePlayAgain = () => {
        navigate('/songlist');
    }

    return (
        <div className="exportsong-page">
            <img className='logo' src="./images/logo.svg" alt="logo" onClick={()=>{
                window.location="/" }}/>
            {/* <img className='logo' src="./images/logo.svg" alt="logo"/> */}
            <p className='count-area'>你的歌單有<span>{count}</span>首歌</p>

            <button className="arrow prev-btn" onClick={handleLeftClick}><img src="./images/btn-prev.svg" alt="" /></button>
            <button className="arrow next-btn" onClick={handleRightClick}><img src="./images/btn-next.svg" alt="" /></button>

            <div className="disc-list" style={{transform: `translateX(-${currentIndex * 170 }px)`}}>
            {/* <div className="disc-list"> */}
                {
                    exportList.map((song, index) => (
                        <DiscEnd key={song.key} song={song} index={index} currentIndex={currentIndex} />
                    ))
                }
            </div>

            <button className={`btn-game ${circleIn ? 'btn-in' : ''}`} onClick={()=>{window.location="/songlist"}}>
                <p>再玩一次</p>
                <img src="./images/next.svg" alt="" />
            </button>
            <div className="bg-circle">
                <img className={`rotate circle1 ${circleIn ? 'left-in' : ''}`} src="./images/circle-line-1.svg" alt="circle" />
                <div className={`right-disc ${circleIn ? 'right-in' : ''}`}>
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>

            <Footer />

        </div>
    )
}

export default ExportSongList