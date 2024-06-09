// src/pages/Home.js
import React, { useEffect } from "react";
import Sidebar from "../components/Home/Sidebar";
import { CategoryItems } from "../static/Data";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { fetchVideos } from "../slices/videoSlice";
import { onAuthStateChanged } from "firebase/auth";
import VideoSection from "../components/Home/VideoSection";
import HorizontalBar from "../components/video/HorizontalFilterBar";

const Home = () => {
  const dispatch = useDispatch();
  const { status, videos, error } = useSelector((state) => state.videos);
  const { isOpen } = useSelector((state) => state.sidebar);

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Sidebar />
      <div
        className={`z-1 bg-yt-black top-14 left-0 pt-4 absolute transition-all duration-700 ease-in-out 
          ${
            isOpen
              ? "w-full left-0 lg:ml-1/5 lg:md:w-[85%] lg:md:left-[15%] md:ml-0 sm:w-full sm:ml-0"
              : "w-[96.3%] left-[3.7%]"
          }
        h-full lg:max-1054:left-[1.7%]`}
      >
        {" "}
        <div className="flex flex-row px-3 overflow-x-scroll  relative scrollbar-hide">
          <HorizontalBar CategoryItems={CategoryItems} />
        </div>
        <VideoSection
          status={status}
          videos={videos}
          error={error}
          errorMsg={"No videos found in this category."}
        />
      </div>
    </>
  );
};

export default Home;
