import React, { useState } from "react";
import { BiArrowBack, BiEdit } from "react-icons/bi";
import NewVideoFormModel from "./NewVideoFormModal";
import { useDispatch } from "react-redux";
import { setFormData } from "../slices/videoSlice";

const SingleVideoView = ({ video, onClose }) => {
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const toggleEditMode = () => {
    dispatch(setFormData(video));
    setEditMode(!editMode);
  };

  return (
    <div className="p-4 bg-[#1f1f1f] text-yt-white rounded-lg shadow-lg">
      <div className="flex items-center mb-4 justify-between">
        <button
          onClick={onClose}
          className="flex items-center text-yt-blue hover:text-yt-light-blue transition-colors duration-300"
        >
          <BiArrowBack className="mr-2" size={25} />
          Back
        </button>
        <button
          onClick={toggleEditMode}
          className="flex items-center text-yt-blue hover:text-yt-light-blue transition-colors duration-300"
        >
          <BiEdit className="mr-2" size={20} />
          Edit
        </button>
        {editMode && (
          <NewVideoFormModel togglePopup={toggleEditMode} isNew={false} />
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center">
          <img
            src={video.thumbnail}
            alt=""
            className="h-72 w-auto object-contain rounded-lg shadow-md mb-4"
          />
          <img
            src={video.logo}
            alt=""
            className="h-16 w-16 object-cover rounded-full shadow-md mt-12"
          />
          <p className="text-lg font-bold mb-2 text-yt-blue">Channel Logo</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xl mb-2  text-[#ff4e45] font-bold ml-auto">
            {video.name}
          </p>
          <p className="text-lg font-bold text-yt-blue mb-2">Description</p>
          <p className="text-sm  mb-4">{video.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-lg font-bold text-yt-blue">Category</p>
            <p className="text-lg">{video.category}</p>
            <p className="text-lg font-bold text-yt-blue">IFrame Link</p>
            <p className="text-lg">{video.link}</p>
            <p className="text-lg font-bold text-yt-blue">Channel</p>
            <p className="text-lg">{video.channel}</p>
            <p className="text-lg font-bold text-yt-blue">Duration</p>
            <p className="text-lg">{video.duration}</p>
            <p className="text-lg font-bold text-yt-blue">Subscribers</p>
            <p className="text-lg">{video.subscribers}</p>
            <p className="text-lg font-bold text-yt-blue">Upload Time</p>
            <p className="text-lg">{video.uploadTime}</p>
            <p className="text-lg font-bold text-yt-blue">Views</p>
            <p className="text-lg">{video.views}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleVideoView;
