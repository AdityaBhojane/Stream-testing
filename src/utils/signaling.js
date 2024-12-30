import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000'); // Replace with your backend URL

export const initializeSocket = () => {
  socket.on('connect', () => console.log('Socket connected!'));
};
