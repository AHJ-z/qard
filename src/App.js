import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function App() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const userDocRef = doc(db, "users", "abdul-hadi");

  useEffect(() => {
    const fetchData = async () => {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setName(docSnap.data().name || '');
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const saveName = async () => {
    await setDoc(userDocRef, { name });
    alert("Saved!");
  };

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center', padding: '2rem' }}>
      <h1>🔥 Qard Profile Editor</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name"
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <br /><br />
          <button onClick={saveName} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
            Save to Firebase
          </button>
        </>
      )}
    </div>
  );
}

export default App;
