function DiscEnd({song}) {
    return (
        <div className='disc'>
            <img className="black-circle center-dot" src="./images/disc-circle.svg" alt="" />
            <img className="playlist center-dot" src={song.img} alt={song.song} />
            <img className="line center-dot" src="./images/disc-line.svg" alt="" />
            <button className="play-btn center-dot"><img src="./images/play-btn.svg" alt="" /></button>
            
        </div>
    )
}

export default DiscEnd