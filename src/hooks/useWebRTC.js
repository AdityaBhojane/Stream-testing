import { useEffect, useRef, useState } from 'react';

export const useWebRTC = (socket) => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [error, setError] = useState(null);
  const peerConnection = useRef(null);

  useEffect(() => {
    const initWebRTC = async () => {
      try {
        // Check if the video and audio devices are available
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasVideo = devices.some(device => device.kind === 'videoinput');
        const hasAudio = devices.some(device => device.kind === 'audioinput');
    
        if (!hasVideo) {
          setError('No video devices found');
          return;
        }
    
        if (!hasAudio) {
          setError('No audio devices found');
          return;
        }
    
        // Access user media if devices are available
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        console.log('Local Stream:', stream); // Log the stream to check
    
        peerConnection.current = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
          ],
        });
    
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
    
        peerConnection.current.ontrack = (event) => {
          console.log('Remote Stream Event:', event); // Log remote stream event
          setRemoteStream(event.streams[0]);
        };
    
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('ice-candidate', event.candidate);
          }
        };
    
        socket.on('offer', async (offer) => {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          socket.emit('answer', answer);
        });
    
        socket.on('answer', (answer) => {
          peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        });
    
        socket.on('ice-candidate', (candidate) => {
          peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        });
      } catch (err) {
        setError(`Error accessing media devices: ${err.message}`);
        console.error('Error accessing media devices: ', err);
      }
    };
    

    initWebRTC();
  }, [socket]);

  console.log('Local Stream:', localStream);  // Log the localStream in useEffect to check the value
  console.log('Remote Stream:', remoteStream);  // Log remoteStream after it has been set

  return { localStream, remoteStream, error };
};
