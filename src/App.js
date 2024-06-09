import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Home/Navbar";
import YoutubeStudioPage from "./pages/YoutubeStudioPage";
import Sidebar from "./components/Home/Sidebar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/YoutubeStudio" element={<YoutubeStudioPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
