import "./assets/styles/custom.scss";
import "./App.css";
import Navbar from "./components/Navbar";
import FtpGames from "./services/FtpGames";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    FtpGames.getHighlightedGames();
  }, []);

  return <Navbar />;
}

export default App;
