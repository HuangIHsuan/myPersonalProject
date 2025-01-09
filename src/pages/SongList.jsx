import { useEffect, useRef, useState } from "react";
import DiceRollingBig from "../components/DiceRollingBig"
import $ from "jquery";
import axios from 'axios';
import Disc from "../components/Disc";
import ExportLoading from "../components/ExportLoading";
import ExportSongList from "../components/ExportSongList";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function SongList() {
    const navigate = useNavigate();
    const location = useLocation(); // 使用 useLocation 來獲取當前路徑
    const [showSongList, setShowSongList] = useState(true); // 控制 SongList 頁面顯示
    const [showLoading, setShowLoading] = useState(false); // 控制 ExportLoading 頁面顯示
    const [showExporting, setShowExporting] = useState(false); // 控制 ExportSongList 頁面顯示
    const [showOverlay, setShowOverlay] = useState(false);
    const [songIn, setSongIn] = useState(false); // 開頭滑進來
    const [diceResult, setDiceResult] = useState(0); // 保存骰子結果
    const [diceTotal, setDiceTotal] = useState(0); // 骰子結果相加
    const [isFirstAngleUpdate, setIsFirstAngleUpdate] = useState(true); // 紀錄是否是第一次執行
    const [angle, setAngle] = useState(-264); // 記錄旋轉角度
    const [songList, setSongList] = useState([]); // 歌曲json清單
    const [activeDiscIndex, setActiveDiscIndex] = useState(null); // 記錄需要放大的 disc 索引值
    const introListRef = useRef(0);
    const [count, setCount] = useState(0); // 計算歌單歌曲數目
    const [exportList, setExportList] = useState([]);
    const [showGameOverPopup, setShowGameOverPopup] = useState(false);
    const [popupIn, setPopupIn] = useState(false);
    const [remindIn, setRemindIn] = useState(false);

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
            // 如果總和超過 30，停止更新 count、旋轉和 activeDiscIndex
            if (newTotal >= 20) {
                setRemindIn(true);
            }

            if (newTotal > 30) {
                setShowGameOverPopup(true); // 顯示彈跳視窗
                setTimeout(() => {
                    setPopupIn(true);
                }, 10)
                return prevTotal; // 停止更新 total
            }

            const nextDiscIndex = newTotal % 31; // 確保索引值不超過 31

            setTimeout(() => {
                if (songIn && introListRef.current) {
                    introListRef.current.style.transform = `translateY(-${(50 * newTotal) - 50}vh)`;
                }
            }, 500)

            // 延遲更新 activeDiscIndex，與旋轉動畫同步
            setTimeout(() => {
                setActiveDiscIndex(nextDiscIndex);

                // 新增被選中的 Disc 到 exportList
                if (songList[nextDiscIndex - 1]) {
                    setExportList((prevExportList) => {
                        // 避免重複添加
                        const isDuplicate = prevExportList.some(
                            (song) => song.key === songList[nextDiscIndex - 1].key
                        );
                        if (!isDuplicate) {
                            setCount((prevCount) => prevCount + 1); // 僅在未超過 30 且不重複時更新 count
                            return [...prevExportList, songList[nextDiscIndex - 1]];
                        }
                        return prevExportList;
                    });
                }
            }, 1500); // 延遲 1.5 秒，與旋轉動畫配合

            return newTotal; // 更新 total
        });

        // 延遲執行 setAngle
        setTimeout(() => {
            if (isFirstAngleUpdate) {
                setAngle((prevAngle) => (prevAngle + (12 * result)) - 12);
                setIsFirstAngleUpdate(false);
            } else {
                setAngle((prevAngle) => (prevAngle + (12 * result)));
            }
        }, 500); // 延遲 0.5 秒
    };

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

    const handlePopupClose = () => {
        setShowGameOverPopup(false); // 關閉彈跳視窗
        setSongIn(false);
        setRemindIn(false);
        introListRef.current.style.transform = "translateX(-240%)";
        introListRef.current.style.transition = "2s ease";

        setTimeout(() => {
            setShowSongList(false);
            setShowLoading(true);
        }, 2000);

        setTimeout(() => {
            setShowLoading(false);
            setShowExporting(true);
        }, 4000);
    };

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            navigate(0); // 如果在 Home 頁面，重新整理
        } else {
            navigate("/"); // 如果不在 Home 頁面，跳轉到 Home
        }
    }

    return (
        <>
            {showOverlay && <div className="overlay"></div>}
            <img className={`logo${songIn ? ' logo-in' : ''}`} src="./images/logo.svg" alt="logo" onClick={handleLogoClick} />
            {showSongList &&
                <div className="songlist-page">
                    <p className={`count-area${songIn ? ' count-in' : ''}`}>你的歌單增加了<span>{count}</span>首歌</p>
                    <p className={`remind ${remindIn ? 'remind-in' : ''}`}>\ 歌單已經快要跑完啦！/</p>
                    <div className="bg-circle">
                        <img className={`rotate circle1${songIn ? ' slidein-circle' : ''}`} src="./images/circle-line-1.svg" alt="circle" />
                    </div>

                    <div className={`linear-overlay${songIn ? ' overlay-appear' : ''}`}></div>
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

            {showGameOverPopup &&
                <div className="gameover-popup">
                    <div className="overlay" onClick={handlePopupClose}></div>
                    <div className={`popup-content ${popupIn ? 'pop-in' : ''}`}>
                        <p>提示</p>
                        <h3>已經超過 30 格囉！</h3>
                        <button onClick={handlePopupClose}>確定</button>
                    </div>
                </div>
            }

            {showLoading && <ExportLoading setShowLoading={setShowLoading} />}
            {showExporting && <ExportSongList exportList={exportList} count={count} />}

            <Footer />
        </>
    )
}

export default SongList