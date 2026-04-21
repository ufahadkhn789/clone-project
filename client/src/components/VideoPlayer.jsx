import React from 'react';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="w-full h-full bg-black flex justify-center items-center">
      <video 
        className="w-full h-full max-h-screen object-contain"
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
