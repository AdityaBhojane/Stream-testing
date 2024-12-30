/* eslint-disable react/prop-types */
import  { useState } from 'react';


const Controls = ({ localStream }) => {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoDisabled, setIsVideoDisabled] = useState(false);

  const toggleAudio = () => {
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !isAudioMuted;
    });
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !isVideoDisabled;
    });
    setIsVideoDisabled(!isVideoDisabled);
  };

  const endCall = () => {
    localStream.getTracks().forEach((track) => track.stop());
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={toggleAudio}
        className={`px-4 py-2 rounded ${isAudioMuted ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
      </button>
      <button
        onClick={toggleVideo}
        className={`px-4 py-2 rounded ${isVideoDisabled ? 'bg-red-500' : 'bg-green-500'} text-white`}
      >
        {isVideoDisabled ? 'Enable Video' : 'Disable Video'}
      </button>
      <button
        onClick={endCall}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        End Call
      </button>
    </div>
  );
};

export default Controls;
