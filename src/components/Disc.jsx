import { useRef, useState } from "react"

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

    return (
        <div className={`disc ${index === activeDiscIndex ? 'active' : ''}`}
            style={{
                left: `${coord.x}px`,
                top: `${coord.y}px`,
            }}>
            <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
            <img className="playlist center-dot" src={song.img} alt={song.song} />
            <img className="line center-dot" src="./images/disc-line.svg" alt="" />
            <div className="disc-center center-dot"></div>
            <button onClick={togglePlay}
            className={`center-dot ${isPlaying ? 'pause-btn' : 'play-btn'}`}></button>
            <audio ref={audioRef} src={song.audio}></audio>
            {console.log(song.audio)}
        </div>
    )
}

export default Disc