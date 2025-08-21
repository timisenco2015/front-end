"use client";

import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import React from "react";

interface PlusCircleIconProps {
  isViewMode?: boolean;
}

export default function CircleIcon({ isViewMode = false }: PlusCircleIconProps) {
  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        borderRadius: "50%",
        border: "1px solid #ffffff",
        color: "#ffffff",
        fontSize: "5px",
        backgroundColor: isViewMode ? "#666666" : "#1E6F9F",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: isViewMode ? "default" : "pointer",
      }}
    >
      {isViewMode ? <CheckOutlined style={{ color: "white", fontSize: "8px" }} />: <PlusOutlined style={{ color: "white", fontSize: "8px" }} />}
    </div>
  );
}
