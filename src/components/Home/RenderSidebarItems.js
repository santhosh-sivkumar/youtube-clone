import React from "react";
import { useSelector } from "react-redux";

const RenderSidebarItems = ({
  items,
  active,
  onItemClick,
  activeColor,
  backgroundColor,
  className,
}) => {
  const { isOpen } = useSelector((state) => state.sidebar);

  return items.map((item, index) => (
    <div
      key={index}
      className={`flex ${
        isOpen ? "justify-start " : "justify-center "
      } items-center cursor-pointer ${
        className ? className : ` h-10 rounded-xl hover:bg-${activeColor} my-1 `
      } ${item.name === active ? `bg-${activeColor}` : `bg-${backgroundColor}`}
      `}
      onClick={() => onItemClick(item.name)}
    >
      <span className="px-2">{item.icon}</span>
      <p
        className={`p-2 ml-3 text-sm font-medium ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {item.name}
      </p>
    </div>
  ));
};

export default RenderSidebarItems;
