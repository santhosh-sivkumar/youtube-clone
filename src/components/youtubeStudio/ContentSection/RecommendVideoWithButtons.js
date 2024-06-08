import React from "react";
import RecommendVideo from "../../video/RecommendVideo";
import { Link } from "react-router-dom";

const RecommendVideoWithButtons = ({
  video,
  onViewClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="mb-4 flex flex-col p-4 rounded-lg bg-[#202020] md:h-[15rem] h-[10rem]">
      <div className="h-[80%]">
        <Link key={video.key} to={`/video/${video.id}`}>
          <RecommendVideo
            logo={video.logo}
            thumbnail={video.thumbnail}
            name={video.name}
            channel={video.channel}
            views={video.views}
            uploadTime={video.uploadTime}
          />
        </Link>
      </div>
      <div className="flex justify-around  h-[20%]">
        <button
          title="View"
          onClick={() => onViewClick(video)}
          className="text-[rgb(92,231,92)] hover:text-[rgb(59,255,59)] transition-colors duration-300"
        >
          View
        </button>
        <button
          title="Edit"
          onClick={() => onEditClick(video)}
          className="text-[rgb(213,255,59)] hover:text-[rgba(204,255,116,0.85)] transition-colors duration-300"
        >
          Edit
        </button>
        <button
          title="Delete"
          onClick={() => onDeleteClick(video)}
          className="text-[#ff0e0e] hover:text-[#ff0000] transition-colors duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default RecommendVideoWithButtons;
