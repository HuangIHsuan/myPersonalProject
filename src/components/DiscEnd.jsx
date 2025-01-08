import { useRef, useState } from "react";

function DiscEnd({ song, index, currentIndex }) {
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

    return (
            <div className={`whole-disc ${index === currentIndex ? 'active' : ''}`} >
                <div className='disc'>
                    <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
                    <img className="playlist center-dot" src={song.img} alt={song.song} />
                    <img className="line center-dot" src="./images/disc-line.svg" alt="" />
                    <button onClick={togglePlay}
                        className={`center-dot ${isPlaying ? 'pause-btn' : 'play-btn'}`}></button>
                    <audio ref={audioRef} src={song.audio} onEnded={handleEnded}></audio>
                </div>
                <div className="song-info-simple">
                    <p>{song.singer}</p>
                    <h3>{song.song}</h3>
                </div>
            </div>
    )
}

export default DiscEnd