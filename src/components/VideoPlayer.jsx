/* eslint-disable react/prop-types */
import  { useRef, useEffect } from 'react';

const VideoPlayer = ({ stream }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />;
};

export default VideoPlayer;
