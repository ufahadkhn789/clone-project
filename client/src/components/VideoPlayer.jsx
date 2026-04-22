import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[100] flex justify-center items-center">
      <video 
        className="w-full h-full object-cover"
        controls 
        autoPlay
        src={videoUrl}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
