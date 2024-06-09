import React from "react";
import { Link } from "react-router-dom";
import RecommendVideo from "./RecommendVideo";

const RecommendedVideos = ({ videos, id }) => {
  return (
    <div className="lg:block pt-8">
      {videos?.map((video, i) => {
        return video.id !== id ? (
          <Link key={i} to={`/video/${video.id}`}>
            <RecommendVideo {...video} />
          </Link>
        ) : (
          ""
        );
      })}
    </div>
  );
};

export default RecommendedVideos;
