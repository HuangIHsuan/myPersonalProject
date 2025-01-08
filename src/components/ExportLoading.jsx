import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"

function ExportLoading({ setShowLoading }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [outDisc, setOutDisc] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setOutDisc(true);
        }, 500)
    }, [setShowLoading])

    const handleLogoClick = () => {
        if (location.pathname === "/") {
            navigate(0); // 如果在 Home 頁面，重新整理
        } else {
            navigate("/"); // 如果不在 Home 頁面，跳轉到 Home
        }
    }

    return (
        <>
            <div className="loading-page">
                <img className='logo' src="./images/logo.svg" alt="logo" onClick={handleLogoClick}/>
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

                <div className={`right-disc ${outDisc ? 'right-disc-out' : ''}`}>
                    {/* <div className='right-disc'> */}
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle1" src="./images/circle-line-1.svg" alt="circle" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
                <div className={`left-disc ${outDisc ? 'left-disc-out' : ''}`}>
                    <img className="rotate disc-big" src="./images/disc.svg" alt="disc" />
                    <img className="rotate circle2" src="./images/circle-line-2.svg" alt="circle" />
                    <img className="rotate circle3" src="./images/circle-line-3.svg" alt="circle" />
                </div>
            </div>
        </>
    )
}

export default ExportLoading