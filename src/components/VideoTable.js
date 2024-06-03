import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import SingleVideoView from "./SingleVideoView";
import { db } from "../firebase"; // Import your Firebase config
import { doc, deleteDoc } from "firebase/firestore"; // Import Firestore functions

const VideoTable = ({ status, videos, error, errorMsg }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const handleViewClick = (video) => {
    setSelectedVideo(video);
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
  };

  const handleConfirmDelete = () => {
    try {
      deleteDoc(doc(db, "videos", videoToDelete.id));
      setVideoToDelete(null);
      // Optionally, refresh the video list here or update the local state
    } catch (error) {
      console.error("Error deleting video: ", error);
    }
  };

  return (
    <div className="pt-4 px-5 pb-12 overflow-x-auto ">
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-yt-black backdrop-filter backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-[#1f1f1f]  rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <SingleVideoView
              video={selectedVideo}
              onClose={() => setSelectedVideo(null)}
            />
          </div>
        </div>
      )}

      {!selectedVideo && (
        <>
          {videos?.length === 0 ? (
            <div className="h-[86vh]">
              <div className="h-full flex items-center justify-center">
                {status !== "loading" ? (
                  <p className="p-3 text-yt-white absolute top-[24rem]">
                    {errorMsg}
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
            <table className="text-xs min-w-full bg-[#1f1f1f] text-yt-white border-separate border-spacing-0">
              <thead>
                <tr className="bg-[#3e3e3e]">
                  <th className="p-3 w-24 text-center">Thumbnail</th>
                  <th className="p-3 w-36 text-center">Name</th>
                  <th className="p-3 w-64 text-center">Description</th>
                  <th className="p-3 w-24 text-center">Category</th>
                  <th className="p-3 w-48 text-center">Video Link</th>
                  <th className="p-3 w-24 text-center">Logo</th>
                  <th className="p-3 w-36 text-center">Channel</th>
                  <th className="p-3 w-24 text-center">Duration</th>
                  <th className="p-3 w-24 text-center">Subscribers</th>
                  <th className="p-3 w-36 text-center">Upload Time</th>
                  <th className="p-3 w-24 text-center">Views</th>
                  <th className="p-3 w-24 text-center">Actions</th>
                  <th className="p-3 w-24 text-center">Delete</th>{" "}
                  {/* New Column */}
                </tr>
              </thead>
              <tbody>
                {videos.map((video, index) => (
                  <tr
                    key={index}
                    className="border-b-[1px] border-[#3e3e3e] hover:bg-[#2e2e2e]"
                  >
                    <td className="p-3 w-24 text-center">
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="h-20 w-20 object-cover mx-auto"
                      />
                    </td>
                    <td className="p-3 w-36 text-center">
                      {video?.name && video?.name.length <= 25
                        ? video?.name
                        : `${video?.name && video?.name.substr(0, 25)}...`}
                    </td>
                    <td className="p-3 w-64 text-center">
                      {video?.description && video?.description.length <= 25
                        ? video?.description
                        : `${
                            video?.description &&
                            video?.description.substr(0, 25)
                          }...`}
                    </td>
                    <td className="p-3 w-24 text-center">{video.category}</td>
                    <td className="p-3 w-48 text-center">{video.link}</td>
                    <td className="p-3 w-24 text-center">
                      <img
                        src={video.logo}
                        alt=""
                        className="h-9 w-9 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3 w-36 text-center">{video.channel}</td>
                    <td className="p-3 w-24 text-center">{video.duration}</td>
                    <td className="p-3 w-24 text-center">
                      {video.subscribers}
                    </td>
                    <td className="p-3 w-36 text-center">{video.uploadTime}</td>
                    <td className="p-3 w-24 text-center">{video.views}</td>
                    <td className="p-3 w-24 text-center">
                      <button
                        onClick={() => handleViewClick(video)}
                        className="text-yt-blue hover:text-yt-light-blue transition-colors duration-300"
                      >
                        View
                      </button>
                    </td>
                    <td className="p-3 w-24 text-center">
                      <button
                        onClick={() => handleDeleteClick(video)}
                        className="text-yt-red hover:text-yt-light-red transition-colors duration-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {videoToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-yt-black backdrop-filter backdrop-blur-sm bg-opacity-50 z-50">
          <div className="bg-[#1f1f1f] p-4 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this video?</p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setVideoToDelete(null)}
                className="mr-4 px-4 py-2 bg-yt-gray rounded hover:bg-gyt-gray  transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-yt-red text-white rounded hover:bg-yt-red transition-colors duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoTable;
