import React from "react";

const BlackHole = ({ children }) => {
  return (
    <div className="relative h-screen w-full">
      <video
        autoPlay
        muted
        loop
        className="absolute z-[-2] w-full h-full object-cover"
      >
        <source src="/videos/blackhole.webm" type="video/webm"></source>
      </video>
      <div className="absolute z-[-1] inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-0 h-full">{children}</div>
    </div>
  );
};

export default BlackHole;