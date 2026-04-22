import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[100] flex justify-center items-center">
      <video 
        className="w-full h-full object-contain"
        controls 
        autoPlay
        muted
        src={videoUrl}
        type="video/mp4"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
