import { useEffect, useRef, useState } from "react"

function Disc({ coord, index, song, activeDiscIndex }) {
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

    // 當 `activeDiscIndex` 發生變化且該元素被選中時，執行播放
    useEffect(() => {
        if ((index + 1) === activeDiscIndex) {
            handlePlay(); // 自動播放
        } else {
            handlePause(); // 當元素不再被選中時暫停播放
        }
    }, [activeDiscIndex, index]); // 依賴 activeDiscIndex 和 index 的變化

    console.log('index', index);
    console.log('activeDiscIndex',activeDiscIndex);

    return (
        <div className={`disc ${(index + 1) === activeDiscIndex ? 'active' : ''}`}
            style={{
                left: `${coord.x}px`,
                top: `${coord.y}px`,
            }}>
            <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
            <img className="playlist center-dot" src={song.img} alt={song.song} />
            <img className="line center-dot" src="./images/disc-line.svg" alt="" />
            <button onClick={togglePlay}
            className={`center-dot ${isPlaying ? 'pause-btn' : 'play-btn'}`}></button>
            <audio ref={audioRef} src={song.audio} onEnded={handleEnded}></audio>
        </div>
    )
}

export default Disc