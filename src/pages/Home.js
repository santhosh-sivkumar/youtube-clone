// src/pages/Home.js
import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { CategoryItems } from "../static/Data";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { fetchVideos, setVideos, filterByCategory } from "../slices/videoSlice";
import { onAuthStateChanged } from "firebase/auth";
import VideoSection from "../components/VideoSection";

const Home = () => {
  const dispatch = useDispatch();
  const { status, videos, error, allVideos } = useSelector(
    (state) => state.videos
  );

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

  const handleFilter = (item) => {
    if (item !== "All") {
      item = item === "Movies" ? "Movie" : item;
      dispatch(filterByCategory(item));
    } else {
      dispatch(setVideos(allVideos));
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-[83%]  h-[calc(100%-53px)] pt-[4.5rem] bg-yt-black left-60 relative max-1054:left-0 max-1054:w-full">
        <div className="flex flex-row px-3 overflow-x-scroll  relative scrollbar-hide">
          {CategoryItems.map((item, i) => (
            <h2
              className="text-yt-white font-normal text-sm py-2 px-4 break-keep whitespace-nowrap bg-yt-light mr-3 cursor-pointer rounded-lg hover:bg-yt-light-1"
              key={i}
              onClick={() => handleFilter(item)}
            >
              {item}
            </h2>
          ))}
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
