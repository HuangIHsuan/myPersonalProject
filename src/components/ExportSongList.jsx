import { useEffect, useState } from "react"
import DiscEnd from "./DiscEnd";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import SharePic from "./SharePic";

function ExportSongList({ exportList, count }) {
    const navigate = useNavigate();
    const location = useLocation(); // 使用 useLocation 來獲取當前路徑
    const [currentIndex, setCurrentIndex] = useState(null);
    const [circleIn, setCircleIn] = useState(false);
    const [showShare, setShowShare] = useState(false);

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
        if (location.pathname === "/songlist") {
            navigate(0); // 如果在 Home 頁面，重新整理
        } else {
            navigate('/songlist');
        }
        
    }

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            navigate(0); // 如果在 Home 頁面，重新整理
        } else {
            navigate("/"); // 如果不在 Home 頁面，跳轉到 Home
        }
    }

    const handleClickSharePage = () => {
        setShowShare(true);
    }

    return (
        <div className="exportsong-page">
            <img className='logo' src="./images/logo.svg" alt="logo" onClick={handleLogoClick} />
            <p className='count-area'>你的歌單有<span>{count}</span>首歌</p>

            <button className="arrow prev-btn" onClick={handleLeftClick}><img src="./images/btn-prev.svg" alt="" /></button>
            <button className="arrow next-btn" onClick={handleRightClick}><img src="./images/btn-next.svg" alt="" /></button>

            <div className="disc-list">
                <DiscEnd exportList={exportList} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
            </div>

            <div className={`btns ${circleIn ? 'btn-in' : ''}`} >
                <button className='btn-game-f' onClick={handlePlayAgain}>
                    <p>再玩一次</p>
                    <img src="./images/next.svg" alt="" />
                </button>
                <button onClick={handleClickSharePage} className='btn-game-f'>
                    <p>分享給朋友</p>
                    <img src="./images/next.svg" alt="" />
                </button>
            </div>

            {showShare && <SharePic exportList={exportList} setShowShare={setShowShare} />}

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