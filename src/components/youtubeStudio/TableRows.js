import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const TableCell = ({ children, className }) => (
  <td className={`p-3 text-center ${className}`}>{children}</td>
);

const TableRows = ({ handleViewClick, handleDeleteClick }) => {
  const { userUploadedVideos } = useSelector((state) => state.videos);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/video/${id}`);
  };

  const renderVideoName = (video) =>
    video.name.length <= 25 ? video.name : `${video.name.substr(0, 25)}...`;

  const renderVideoDescription = (video) =>
    video.description.length <= 25
      ? video.description
      : `${video.description.substr(0, 25)}...`;

  const renderButton = (label, onClick, className) => (
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent row click event
        onClick();
      }}
      className={`${className} transition-colors duration-300`}
    >
      {label}
    </button>
  );

  return (
    <>
      {userUploadedVideos.map((video, index) => (
        <tr
          key={index}
          className="border-b-[1px] border-[#3e3e3e] hover:bg-[#2e2e2e] cursor-pointer"
          onClick={() => handleRowClick(video.id)}
        >
          <TableCell className="w-24">
            <img
              src={video.thumbnail}
              alt=""
              className="h-18 w-20 object-cover mx-auto rounded-md"
            />
          </TableCell>
          <TableCell className="w-36">{renderVideoName(video)}</TableCell>
          <TableCell className="w-64">
            {renderVideoDescription(video)}
          </TableCell>
          <TableCell className="w-24">{video.category}</TableCell>
          <TableCell className="w-48">{video.link}</TableCell>
          <TableCell className="w-24">
            <img
              src={video.logo}
              alt=""
              className="h-6 w-6 rounded-full mx-auto"
            />
          </TableCell>
          <TableCell className="w-36">{video.channel}</TableCell>
          <TableCell className="w-24">{video.duration}</TableCell>
          <TableCell className="w-24">{video.subscribers}</TableCell>
          <TableCell className="w-36">{video.uploadTime}</TableCell>
          <TableCell className="w-24">{video.views}</TableCell>
          <TableCell className="w-24">
            {renderButton(
              "View",
              () => handleViewClick(video),
              "text-[rgb(92,231,92)] hover:text-[rgb(59,255,59)]"
            )}
          </TableCell>
          <TableCell className="w-24">
            {renderButton(
              "Delete",
              () => handleDeleteClick(video),
              "text-[#ff0e0e] hover:text-[#ff0000]"
            )}
          </TableCell>
        </tr>
      ))}
    </>
  );
};

export default TableRows;
