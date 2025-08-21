import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header
  style={{
    backgroundColor: "#0D0D0D",
    color: "white",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "center", // centers the whole group
    alignItems: "center",
    gap: "16px", // space only between image and text group
  }}
>
  {/* Logo or image */}
  <img
  src="/Layer.png"
  alt="Logo"
  style={{ height: "40px" }}
/>

  {/* Text group with no spacing between the two h1s */}
  <div style={{ display: "flex", margin: 0, fontSize: "20px" }}>
    <h1 style={{ margin: 0, color:"#4EA8DE"}}>ToDo</h1>
    <h1 style={{ margin: 0, color:"#5E60CE" }}>App</h1>
  </div>
</header>

  );
}
