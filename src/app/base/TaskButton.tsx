"use client";

import { Button } from "antd";
import React from "react";
import CircleIcon from './CircleIcon';
import {  Space } from "antd";



interface NewTaskButtonProps {
  onClick: () => void;
  label?: string; 
  size?: "small" | "middle" | "large"; 
  alignment?: "left" | "center" | "right"; 
  width?: string; 
  backgroundColor?: string;
  padding?:string;
  isViewMode?:boolean
}

const TaskButton: React.FC<NewTaskButtonProps> = ({
  onClick,
  label = "Create Task",
  size = "large",
  alignment = "center",
  width = "30vw",
  backgroundColor = "#1E6F9F",
  padding= "1% 0",
  isViewMode = false
}) => {
  // map alignment to flex alignSelf
  const alignSelf =
    alignment === "left"
      ? "flex-start"
      : alignment === "right"
      ? "flex-end"
      : "center";

  return (
    <Button
      size={size}
      onClick={onClick}
      style={{
        width,
        alignSelf,
        backgroundColor,
        color: "#ffffff",
        padding,
        borderRadius:"10px",
        
      }}
    >
      <Space><p className="text-base">{label} </p> <CircleIcon isViewMode={isViewMode}/></Space>
    </Button>
  );
};

export default TaskButton;
