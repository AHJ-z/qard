import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { QRCodeCanvas } from 'qrcode.react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { motion } from 'framer-motion';

function Profile() {
  const { username } = useParams();
  const [data, setData] = useState(null);
  const [scans, setScans] = useState(0);

  useEffect(() => {
    const loadProfile = async () => {
      const ref = doc(db, 'users', username);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();
        setData(data);
        setScans(data.scans || 0);
        await updateDoc(ref, { scans: increment(1) });
      } else {
        setData(false);
      }
    };
    loadProfile();
  }, [username]);

  if (data === null) return <h2 style={{ textAlign: 'center' }}>Loading Qard...</h2>;
  if (data === false) return <h2 style={{ textAlign: 'center' }}>Qard not found 🚫</h2>;

  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
      color: '#fff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <motion.div
       key={username} // Ensure the profile updates on username change
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '2rem',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}
      >
        <img
          src={data.photo || 'https://i.pinimg.com/736x/0f/78/5d/0f785d55cea2a407ac8c1d0c6ef19292.jpg'}
          alt="profile"
          style={{ borderRadius: '50%', width: '120px', marginBottom: '1rem' }}
        />
        <h1>{data.name || 'Unknown'}</h1>
        <h3 style={{ fontWeight: 'normal', color: '#aaa' }}>{data.title || ''}</h3>
        <p style={{ maxWidth: '300px', textAlign: 'center', marginTop: '1rem' }}>{data.bio}</p>

        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: '#888' }}>
          👀 Scanned {scans} times
        </p>

        <QRCodeCanvas
          value={window.location.href}
          size={128}
          style={{ marginTop: '1.5rem' }}
        />

        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert("🔗 Qard link copied!");
          }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            background: '#fff',
            color: '#111',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          📎 Share Qard
        </button>

        <div style={{ marginTop: '1.5rem' }}>
          {data.instagram && (
            <a href={`https://instagram.com/${data.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="30" style={{ marginRight: '15px' }} />
            </a>
          )}
          {data.linkedin && (
            <a href={`https://linkedin.com${data.linkedin}`} target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="30" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
