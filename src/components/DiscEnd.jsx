import { useEffect, useRef, useState } from "react";

function DiscEnd({ exportList, currentIndex, setCurrentIndex }) {
    const audioRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    }
    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    }
    const togglePlay = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    }
    const handleEnded = () => {
        setIsPlaying(false); // 在歌曲結束時更新狀態
    };

    // 當 `currentIndex` 發生變化且該元素被選中時，執行播放
    useEffect(() => {
        if (audioRef.current && currentIndex !== null) {
            handlePlay(); // 播放新選中的歌曲
        }
    }, [currentIndex]);

    return (
        <>
            {/* 主區域 - 顯示 currentIndex 的 disc */}
            <div className="disc-current">
                {
                    exportList.map((song, index) => {
                        if (index === currentIndex) {
                            return (
                                <div
                                    key={index}
                                    className='whole-disc'>
                                    <div className="disc active">
                                        <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
                                        <img className="playlist center-dot" src={song.img} alt={song.song} />
                                        <img className="line center-dot" src="./images/disc-line.svg" alt="" />
                                        <button
                                            onClick={togglePlay}
                                            className={`center-dot ${isPlaying ? "pause-btn" : "play-btn"}`}
                                        ></button>
                                        <audio ref={audioRef} src={song.audio} onEnded={handleEnded} ></audio>
                                    </div>
                                    <div className="song-info-simple">
                                        <p>{song.singer}</p>
                                        <h3>{song.song}</h3>
                                    </div>
                                </div>
                            );
                        }
                        return null; // 只渲染 activeIndex 對應的元素
                    })
                }

            </div>

            {/* 縮小的列表 */}
            <div className="disc-list-small">
                {
                    exportList.map((song, index) => {
                        return (
                            <div key={index}
                                className={`whole-disc ${index === currentIndex ? "active" : ""}`}
                                onClick={() => setCurrentIndex(index)} >
                                <div className='disc'>
                                    <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
                                    <img className="playlist center-dot" src={song.img} alt={song.song} />
                                    <img className="line center-dot" src="./images/disc-line.svg" alt="" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default DiscEnd