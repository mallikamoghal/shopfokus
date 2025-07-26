import React from "react";

const BlobDivider = ({ fill = "#ffffff", flip = false, height = "60px" }) => (
  <svg
    viewBox="0 0 1440 320"
    className={`w-full ${flip ? "transform rotate-180" : ""}`}
    style={{ height }}
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill={fill}
      d="M0,96 C80,128 160,32 240,64 C320,96 400,192 480,192 C560,192 640,96 720,64 C800,32 880,96 960,128 C1040,160 1120,160 1200,128 C1280,96 1360,64 1440,96 L1440,320 L0,320 Z"
    />
  </svg>
);

export default BlobDivider;
