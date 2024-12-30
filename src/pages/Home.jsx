import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = crypto.randomUUID(); // Generate a unique room ID
    navigate(`/room/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigate(`/room/${roomId}`);
    } else {
      alert('Please enter a valid Room ID');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Video Call App</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleCreateRoom}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Create New Room
        </button>
        <div className="flex flex-col items-center gap-2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="px-4 py-2 border rounded"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
