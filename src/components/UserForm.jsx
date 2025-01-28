import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', socialMediaHandle: '', images: [] });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files });
  };

  const handleAdminClick = () => {
    navigate("/admin");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('socialMediaHandle', formData.socialMediaHandle);
    Array.from(formData.images).forEach(file => data.append('images', file));

    try {
      await axios.post(import.meta.env.VITE_USER_URL, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(data);
      alert('Submission successful!');
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
        <h1 className='text-[2.5rem] font-semibold'>Welcome User</h1>
        <h2 className="text-2xl font-light mb-4">Create a post!</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <input
          type="text"
          name="socialMediaHandle"
          placeholder="Social Media Handle"
          value={formData.socialMediaHandle}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full border rounded-lg p-2 mb-4"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg hover:cursor-pointer">Submit</button>
        <p className='w-full text-center mt-4'>OR</p>
        <p className='w-full text-center mt-2 font-light'>Go to <span className='text-blue-600 hover:cursor-pointer' onClick={() => handleAdminClick()}>Admin Dashboard</span> to see all posts</p>
      </form>
    </div>
    </div>
  );
}

export default UserForm;