import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function ExportLoading({ setShowLoading }) {
    // const [inDisc, setInDisc] = useState(false);
    // const [outDisc, setOutDisc] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         console.log('Setting inDisc to true');
    //         setShowLoading(false);
    //         setInDisc(true);
    //     }, 1500)
    //     return () => clearTimeout(timer);
    // }, [setShowLoading])

    // // 監聽 inDisc 的變化
    // useEffect(() => {
    //     console.log('inDisc changed to true, setting outDisc to true after 1.5s');
    //     if (inDisc) {
    //         // 1.5 秒後設置 outDisc 為 true
    //         const timer = setTimeout(() => {
    //             setOutDisc(true);
    //         }, 1500);

    //         return () => clearTimeout(timer);
    //     }
    // }, [inDisc]);

    // console.log('inDisc', inDisc);
    // console.log('outDisc', outDisc);

    return (
        <>
            <div className="loading-page">
                <img className='logo' src="./images/logo.svg" alt="logo" onClick={()=>{
                window.location="/" }}/>
                <div className='loading-words'>
                    <div className="dialog-box">
                        <p>遊戲結束！</p>
                        <img src="./images/triangle.svg" alt="triangle" />
                    </div>
                    <div className="words">
                        <p>正在匯出你的專屬歌單</p>
                        <div className="little-dot dot-one"></div>
                        <div className="little-dot dot-two"></div>
                        <div className="little-dot dot-three"></div>
                        <div className="little-dot dot-four"></div>
                    </div>
                </div>

                {/* <div className={`right-disc ${inDisc ? 'right-disc-in' : ''} ${outDisc ? 'right-disc-out' : ''}`}> */}
                <div className='right-disc'>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
                <div className='left-disc'>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>
        </>
    )
}

export default ExportLoading