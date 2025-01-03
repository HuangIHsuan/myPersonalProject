function Disc({ coord, index, song, activeDiscIndex }) {
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
            <button className="play-btn center-dot"><img src="./images/btn-play.svg" alt="" /></button>
        </div>
    )
}

export default Disc