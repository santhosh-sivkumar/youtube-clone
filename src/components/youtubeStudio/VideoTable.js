import React, { useState } from "react";
import VideoDetails from "./VideoDetails";
import { db } from "../../firebase";
import { doc, deleteDoc } from "firebase/firestore";
import LoadingComponent from "../helper/LoadingComponent";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDispatch } from "react-redux";
import { setFormData } from "../../slices/videoSlice";
import AddVideo from "./AddVideo";
import { useSelector } from "react-redux";
import RecommendVideoWithButtons from "./RecommendVideoWithButtons";
import TableRows from "./TableRows";
import { selectSidebarState } from "../../slices/sidebarSlice";

const VideoTable = ({ errorMsg }) => {
  const { status, error, userUploadedVideos } = useSelector(
    (state) => state.videos
  );
  const sidebarState = useSelector(selectSidebarState);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = (video) => {
    dispatch(setFormData(video));
    setEditMode(!editMode);
  };

  const handleViewClick = (video) => setSelectedVideo(video);
  const handleDeleteClick = (video) => setVideoToDelete(video);

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
    <div
      className={`pt-4 h-[100%] px-5 pb-12 overflow-x-auto scrollbar-hide 
        ${!sidebarState.isStudioSidebarOpen && " pr-9"}`}
    >
      {userUploadedVideos?.length === 0 ? (
        <div className="h-[86vh]">
          <LoadingComponent status={status} errorMsg={errorMsg} error={error} />
        </div>
      ) : (
        !selectedVideo && (
          <>
            <div className="hidden lg:block">
              <table className="table-auto text-xs min-w-full bg-[#1f1f1f] text-yt-white border-separate border-spacing-0">
                <thead>
                  <tr className="bg-[#3e3e3e]">
                    {[
                      "Thumbnail",
                      "Name",
                      "Description",
                      "Category",
                      "Iframe Link",
                      "Logo",
                      "Channel",
                      "Duration",
                      "Subscribers",
                      "Upload Time",
                      "Views",
                      "View",
                      "Delete",
                    ].map((header, index) => (
                      <th key={index} className="p-3 w-24 text-center">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="">
                  <TableRows
                    handleViewClick={handleViewClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                </tbody>
              </table>
            </div>
            <div className="block lg:hidden">
              {userUploadedVideos.map((video, index) => (
                <RecommendVideoWithButtons
                  key={index}
                  video={video}
                  onViewClick={handleViewClick}
                  onEditClick={toggleEditMode}
                  onDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </>
        )
      )}
      {selectedVideo && (
        <VideoDetails
          video={selectedVideo}
          handleEditClick={toggleEditMode}
          onClose={() => setSelectedVideo(null)}
        />
      )}
      {videoToDelete && (
        <ConfirmDeleteModal
          handleConfirmDelete={handleConfirmDelete}
          setVideoToDelete={setVideoToDelete}
        />
      )}
      {editMode && <AddVideo togglePopup={toggleEditMode} isNew={false} />}
    </div>
  );
};

export default VideoTable;
