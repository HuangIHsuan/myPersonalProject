import { useState } from "react"
import GameStart from "./components/GameStart"
import './css/style.min.css'
import SongList from "./components/SongList";
import ExportLoading from "./components/ExportLoading";
import ExportSongList from "./components/ExportSongList";
import Footer from "./components/Footer";

function App() {
  const [showGameStart, setShowGameStart] = useState(true); // 控制 GameStart 頁面顯示
  const [showSongList, setShowSongList] = useState(false); // 控制 SongList 頁面顯示
  // const [showLoading, setShowLoading] = useState(false); // 控制 ExportLoading 頁面顯示
  // const [showExportList, setShowExportList] = useState(false); // 控制 ExportSongList 頁面顯示
  const [exitDisc, setExitDisc] = useState(false); // 當骰子按鈕被觸發時，兩邊的disc滑出視窗外

  const handleDiceRollEnd = () => {
    setExitDisc(true);
    setShowGameStart(false);
    setShowSongList(true);
  }

  return (
    <>
      {showGameStart &&
        <GameStart handleDiceRollEnd={handleDiceRollEnd}
          setExitDisc={setExitDisc} exitDisc={exitDisc}
        />}
      {showSongList &&
        <SongList handleLoadingPage={handleLoadingPage} handleDiceRollEnd={handleDiceRollEnd}/>}
    </>
  )
}

export default App
