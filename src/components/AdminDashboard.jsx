import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const socket = useContext(SocketContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_USER_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();

    const handleNewUser = (newUser) => {
      setUsers((prevUsers) => [...prevUsers, newUser]);
    };

    socket.on('new-user', handleNewUser);

    return () => {
      socket.off('new-user', handleNewUser);
    };
  }, [socket]);

  const closeModal = () => setSelectedUser(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600 mb-4">
                Social Media: {user.socialMediaHandle}
              </p>
              {user.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {user.images.slice(0, 4).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt=""
                      className="w-full h-24 object-contain rounded-md"
                    />
                  ))}
                </div>
              )}
              {user.images.length > 4 && (
                <p className="text-sm text-gray-500 mt-2">
                  +{user.images.length - 4} more images
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedUser.name}
            </h3>
            <p className="text-gray-600 mb-4">
              Social Media Handle: {selectedUser.socialMediaHandle}
            </p>

            {selectedUser.images.length > 0 ? (
              <Swiper
                navigation
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                className="w-full h-64"
              >
                {selectedUser.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500">No images uploaded by this user.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
