import { useEffect, useState } from "react"
import DiscEnd from "./DiscEnd";
import axios from 'axios';

function ExportSongList() {
    const [songList, setSongList] = useState([]); // 歌曲json清單

    useEffect(() => {
        (async () => {
            // const data = await axios.get('/json/songlist.json'); 
            const data = await axios.get('https://huangihsuan.github.io/myPersonalProject/json/songlist.json');

            const { songinfo } = data.data.songdata;
            setSongList(songinfo);
        })()
    }, [])

    return (
        <div className="exportsong-page">
            
            <div className="disc-list">
                {
                    songList.slice(0,10).map((song) => (
                        <DiscEnd key={song.key} song={song} />
                    ))
                }
            </div>

            <button className='btn-game'>
                <p>再玩一次</p>
                <img src="./images/next.svg" alt="" />
            </button>
            <div className="bg-circle">
                <img className='rotate circle1' src="./images/circle-line-1.svg" alt="circle" />
                <div className='right-disc'>
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>


        </div>
    )
}

export default ExportSongList