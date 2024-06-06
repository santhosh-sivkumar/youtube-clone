import React from "react";

const RenderSidebarItems = ({
  items,
  active,
  onItemClick,
  activeColor,
  backgroundColor,
  className,
}) => {
  return items.map((item, index) => (
    <div
      key={index}
      className={`flex  justify-items-start items-center cursor-pointer ${
        className ? className : ` h-10 rounded-xl hover:bg-${activeColor} my-1 `
      } ${item.name === active ? `bg-${activeColor}` : `bg-${backgroundColor}`}
      `}
      onClick={() => onItemClick(item.name)}
    >
      <span className="px-2">{item.icon}</span>
      <p className={`p-2 ml-3 text-sm font-medium `}>{item.name}</p>
    </div>
  ));
};

export default RenderSidebarItems;
