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
import HorizontalBar from "../components/video/HorizontalBar";

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
        className={`top-14 pt-4 absolute transition-all duration-100 ease-in-out 
          ${
            isOpen
              ? "w-4/5 ml-1/5 md:w-[85%] md:left-[15%] md:ml-0 sm:w-full sm:ml-0"
              : "w-[96.3%] left-[3.7%]"
          }
          bg-white h-full max-1054:left-[1.7%]`}
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
