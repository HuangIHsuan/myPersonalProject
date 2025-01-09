import html2canvas from "html2canvas";
import { useRef, useState } from "react";

function SharePic({ exportList, setShowShare }) {
    const shareCardRef = useRef(null); // 用於定位要轉成圖片的元素
    const [showPrompt, setShowPrompt] = useState(false); // 控制提示框顯示
    const [promptPosition, setPromptPosition] = useState({ x: 0, y: 0 }); // 提示框位置

    const handleDownload = async () => {
        if (shareCardRef.current) {
            const canvas = await html2canvas(shareCardRef.current, { backgroundColor: null });
            const image = canvas.toDataURL("image/png"); // 將 Canvas 轉換為圖片的 Base64
            const link = document.createElement("a");
            link.href = image;
            link.download = "my_playlist.png"; // 圖片下載的檔名
            link.click();
        }
    };

    const handleRightClickDownload = async (e) => {
        e.preventDefault(); // 禁止瀏覽器默認的右鍵菜單
        setPromptPosition({ x: e.clientX, y: e.clientY }); // 設置提示框位置
        setShowPrompt(true); // 顯示提示框
    };

    // 確認提示後執行下載
    const confirmDownload = () => {
        setShowPrompt(false); // 關閉提示框
        handleDownload(); // 執行下載
    };

    const cancelPrompt = () => {
        setShowPrompt(false);
    };

    const handleClose = () => {
        setShowShare(false);
    }

    return (
        <div id="share-body">
            <div onClick={handleClose} className="overlay"></div>
            <div className="share-page" onContextMenu={handleRightClickDownload}>
                <div className="share-card" ref={shareCardRef}>
                    <div className="content-section">
                        <img className="logo-title" src="./images/logo.svg" alt="logo" />
                        <div className="personal-title">
                            <img src="./images/share-arrow-left.svg" alt="" />
                            <h2>我的專屬歌單</h2>
                            <img src="./images/share-arrow-right.svg" alt="" />
                        </div>
                    </div>
                    <div className="share-list">
                        {
                            exportList.map((song, index) => {
                                return (
                                    <div key={index} className="info-card">
                                        <p className="number">{index + 1}.</p>
                                        <div className='disc'>
                                            <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
                                            <img className="playlist center-dot" src={song.img} alt='' />
                                            <img className="line center-dot" src="./images/disc-line.svg" alt="" />
                                        </div>
                                        <div className="song-info-simple">
                                            <p>{song.singer}</p>
                                            <h3>{song.song}</h3>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <button className="save-btn" onClick={handleDownload}>
                    下載圖片
                </button>

                {/* 提示框 */}
                {showPrompt && (
                    <>
                        <div className="overlay-noshow" onClick={cancelPrompt}></div>
                        <button
                            className="prompt"
                            style={{ top: promptPosition.y, left: promptPosition.x }}
                            onClick={confirmDownload}
                        >
                            下載圖片
                        </button>
                    </>
                )}
            </div>

        </div>
    )
}

export default SharePic