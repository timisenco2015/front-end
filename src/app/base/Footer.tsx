import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0D0D0D",
        color: "white",
        padding: "16px 32px",
        textAlign: "center",
      }}
    >
      © {new Date().getFullYear()} My App. All rights reserved.
    </footer>
  );
}
