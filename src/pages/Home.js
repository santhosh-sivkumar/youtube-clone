import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { CategoryItems } from "../static/Data";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import Video from "../components/Video";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slices/userSlice";
import { fetchVideos } from "../slices/videoSlice";
import { TailSpin } from "react-loader-spinner";
import { setVideos, filterByCategory } from "../slices/videoSlice";
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
      console.log(allVideos, "from home");
      dispatch(setVideos(allVideos));
    }
  };

  return (
    <>
      <Sidebar />
      <div className="w-[calc(100%-240px)]  h-[calc(100%-53px)] top-16 bg-yt-black left-60 relative max-1054:left-0 max-1054:w-full">
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

        <div className="pt-12 px-5 grid grid-cols-yt gap-x-3 gap-y-8">
          {videos?.length === 0 ? (
            <div className="h-[86vh]">
              <div className="h-full flex items-center justify-center">
                {status !== "loading" ? (
                  <p className="p-3 text-yt-white absolute top-72">
                    No videos found.
                  </p>
                ) : (
                  ""
                )}
                {status === "loading" && (
                  <span className="absolute top-72">
                    <TailSpin
                      visible={true}
                      height="40"
                      width="40"
                      color="#fff"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </span>
                )}
                {status === "failed" && <p className="text-yt-red">{error}</p>}
              </div>
            </div>
          ) : (
            videos.map((video, i) => (
              <Link to={`/video/${video.id}`} key={video.id}>
                <Video {...video} />
              </Link>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
