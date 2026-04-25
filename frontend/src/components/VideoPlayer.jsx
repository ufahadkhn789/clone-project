import React, { useEffect, useRef } from 'react';
import api from '../services/api';

const VideoPlayer = ({ videoUrl, movieId, startTime = 0 }) => {
  const videoRef = useRef(null);
  const lastSavedTime = useRef(startTime);

  useEffect(() => {
    if (videoRef.current && startTime > 0) {
      videoRef.current.currentTime = startTime;
    }
  }, [startTime]);

  const handleTimeUpdate = async () => {
    if (videoRef.current) {
      const currentTime = Math.floor(videoRef.current.currentTime);
      // Save progress every 10 seconds
      if (currentTime - lastSavedTime.current >= 10 || Math.abs(currentTime - lastSavedTime.current) > 10) {
        try {
          await api.post('/users/progress', { movieId, progress: currentTime });
          lastSavedTime.current = currentTime;
        } catch (error) {
          console.error('Error saving progress:', error);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black z-[100] flex justify-center items-center">
      <video 
        ref={videoRef}
        className="w-full h-full object-contain"
        controls 
        autoPlay
        playsInline
        src={videoUrl}
        onTimeUpdate={handleTimeUpdate}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
