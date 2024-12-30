import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import Controls from '../components/Controls';
import { useWebRTC } from '../hooks/useWebRTC';
import { socket } from '../utils/signaling';

const CallRoom = () => {
  const { roomId } = useParams();
  const { localStream, remoteStream } = useWebRTC(socket);

  useEffect(() => {
    console.log('Updated Local Stream:', localStream);
  }, [localStream]);
  
  useEffect(() => {
    console.log('Updated Remote Stream:', remoteStream);
  }, [remoteStream]);
  

  useEffect(() => {
    socket.emit('join-room', roomId);
    return () => {
      socket.emit('leave-room', roomId);
    };
  }, [roomId]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Room ID: {roomId}</h1>
      <div className="flex gap-4">
        <div>
          <h2>Your Video</h2>
          {localStream && <VideoPlayer stream={localStream} />}
        </div>
        <div>
          <h2>Remote Video</h2>
          {remoteStream && <VideoPlayer stream={remoteStream} />}
        </div>
      </div>
      {localStream && <Controls localStream={localStream} />}
    </div>
  );
};

export default CallRoom;
