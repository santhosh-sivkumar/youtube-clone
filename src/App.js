import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Video from "./pages/Video";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Channel from "./pages/Channel";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/Channel" element={<Channel />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
