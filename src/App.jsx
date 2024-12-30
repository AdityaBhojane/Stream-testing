
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CallRoom from './pages/CallRoom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<CallRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
