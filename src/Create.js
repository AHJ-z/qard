import React, { useState } from 'react';
import { db } from './firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    await setDoc(doc(db, "users", username), {
      name: '',
      title: '',
      bio: '',
      instagram: '',
      linkedin: '',
      photo: ''
    });

    navigate(`/${username}`);
  };

  return (
    <div style={{ padding: '2rem', color: '#fff', textAlign: 'center' }}>
      <h1>🚀 Create Your Qard</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="your-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '5px' }}
        />
        <br /><br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Get My Qard
        </button>
      </form>
    </div>
  );
}

export default Create;
