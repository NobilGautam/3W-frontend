import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import { socket, SocketContext } from './context/SocketContext';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;