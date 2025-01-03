import { useEffect, useRef, useState } from "react";
import DiceRollingBig from "./DiceRollingBig"
import $ from "jquery";
import axios from 'axios';
import Disc from "./Disc";
import ExportLoading from "./ExportLoading";
import ExportSongList from "./ExportSongList";

function SongList() {
    const [showSongList, setShowSongList] = useState(true); // 控制 SongList 頁面顯示
    const [showLoading, setShowLoading] = useState(false); // 控制 ExportLoading 頁面顯示
    const [showExporting, setShowExporting] = useState(false); // 控制 ExportSongList 頁面顯示
    const [showOverlay, setShowOverlay] = useState(false);
    const [songIn, setSongIn] = useState(false); // 開頭滑進來
    const [diceResult, setDiceResult] = useState(0); // 保存骰子結果
    const [diceTotal, setDiceTotal] = useState(0); // 骰子結果相加
    const [angle, setAngle] = useState(-264); // 記錄旋轉角度
    const [songList, setSongList] = useState([]); // 歌曲json清單
    const [activeDiscIndex, setActiveDiscIndex] = useState(null); // 記錄需要放大的 disc 索引值
    const introListRef = useRef(0);

    useEffect(() => {
        // 延遲執行 setSongIn
        const timer = setTimeout(() => {
            setSongIn(true); // 開頭讓元素滑入
        }, 1000); // 延遲 1 秒

        (async () => {
            // const data = await axios.get('/json/songlist.json');
            const data = await axios.get('https://huangihsuan.github.io/myPersonalProject/json/songlist.json');

            const { songinfo } = data.data.songdata;
            setSongList(songinfo);
        })()

        // 清除定時器
        return () => clearTimeout(timer);
    }, [])

    const handleDiceRoll = (result) => {
        setShowOverlay(false); // 關閉 overlay
        setDiceResult(result); // 更新骰子點數

        // 使用函數式更新計算下一個索引
        setDiceTotal((prevTotal) => {
            const newTotal = prevTotal + result;
            const nextDiscIndex = newTotal % 30; // 確保索引值不超過 30

            setTimeout(() => {
                if (songIn && introListRef.current) {
                    introListRef.current.style.transform = `translateY(-${(50 * newTotal) - 50}vh)`;
                }
            }, 500)

            // 延遲更新 activeDiscIndex，與旋轉動畫同步
            setTimeout(() => {
                setActiveDiscIndex(nextDiscIndex);
            }, 2000); // 延遲 2 秒，與旋轉動畫同步

            if (newTotal > 29) {
                alert('已經超過30格囉！');
                setSongIn(false);

                setTimeout(() => {
                    setShowSongList(false);
                    setShowLoading(true);
                }, 2000);

                setTimeout(() => {
                    setShowLoading(false);
                    setShowExporting(true);
                }, 4000)
            }

            return newTotal;
        });

        // 延遲執行 setAngle
        setTimeout(() => {
            if (angle === -264) {
                setAngle((prevAngle) => (prevAngle + (12 * result)) - 12);
            } else {
                setAngle((prevAngle) => (prevAngle + (12 * result)));
            }
        }, 500); // 延遲 0.5 秒
    };

    console.log('骰子總格：' + diceTotal);

    /* 唱片跟著圓形路徑轉 */
    const [coordinates, setCoordinates] = useState([]); // 記錄每個 disc 的座標
    const totalDiscs = 30; // 圓周上的 disc 數量
    const radius = 620; // 半徑

    useEffect(() => {
        if (songList.length > 0) {
            const updateDiscPositions = () => {
                const dotLeft = ($('.disc-list').width() - $('.dot').width()) / 2; // 圓心水平坐標
                const dotTop = ($('.disc-list').height() - $('.dot').height()) / 2; // 圓心垂直坐標
                let avd = 12; // 每個disc對應的角度(360/30)

                let newCoordinates = [];
                for (let index = 0; index < totalDiscs; index++) {
                    const currentAngle = (index * avd) % 360; // 初始角度
                    const radian = (currentAngle * Math.PI) / 180;
                    const x = Math.sin(radian) * radius + dotLeft - 12.5;
                    const y = Math.cos(radian) * radius + dotTop - 12.5;
                    newCoordinates.push({ x, y });
                }
                setCoordinates(newCoordinates); // 更新座標
            };
            updateDiscPositions();
        }
    }, [songList]);

    return (
        <>
            {showOverlay && <div className="overlay"></div>}
            {showSongList &&
                <div className="songlistpage">
                    <div className="bg-circle">
                        <img className={`rotate circle1${songIn ? ' slidein-circle' : ''}`} src="./images/circle-line-1.svg" alt="circle" />
                    </div>

                    <div className={`intro-list${songIn ? ' slidein-intro' : ''}`} ref={introListRef}>
                        <div className="song-intro">
                            <h4>Loopy, OSUN, JP</h4>
                            <h3>30. OTL(OFF THE LEASH)</h3>
                            <p>作詞：Loopy、OSUN、JP</p>
                            <p>作曲：Loopy、OSUN、JP、Hukky Shibaseki</p>
                        </div>
                        {
                            songList.map((song) => {
                                return (
                                    <div key={song.key} className="song-intro">
                                        <h4>{song.singer}</h4>
                                        <h3>{song.key}. {song.song}</h3>
                                        <p>{song.maker1}</p>
                                        <p>{song.maker2}</p>
                                    </div>
                                )
                            })
                        }
                        {
                            songList.map((song) => {
                                return (
                                    <div key={song.key} className="song-intro">
                                        <h4>{song.singer}</h4>
                                        <h3>{song.key}. {song.song}</h3>
                                        <p>{song.maker1}</p>
                                        <p>{song.maker2}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`disc-position${songIn ? ' slidein-disc' : ''}`}>
                        <div className="disc-list"
                            style={{
                                transform: `rotate(${angle - 6}deg)`, // 旋轉角度
                            }}>
                            <div className="dot"></div>

                            {
                                coordinates.map((coord, index) => (
                                    <Disc coord={coord}
                                        key={index}
                                        index={index}
                                        song={songList[index]}
                                        activeDiscIndex={activeDiscIndex} />
                                ))
                            }

                        </div>
                    </div>
                    <div className={`circle-path${songIn ? ' slidein-disc' : ''}`}></div>

                    {/* 傳遞 handleDiceRoll 作為回調函數 */}
                    <DiceRollingBig handleDiceRollEnd={handleDiceRoll} />
                </div>
            }

            {showLoading && <ExportLoading setShowLoading={setShowLoading} />}
            {showExporting && <ExportSongList />}
        </>
    )
}

export default SongList