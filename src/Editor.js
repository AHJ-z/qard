import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function Editor() {
const { username } = useParams();
// For local testing, you can replace the above line with a hardcoded username
  const userDocRef = doc(db, "users", username); // local - const userDocRef = doc(db, "users", "abdul-hadi");
    const [lang, setLang] = useState('en');
    const t = {
    en: {
        edit: "Edit Profile",
        name: "Your name",
        title: "Your title",
        bio: "Your bio",
        instagram: "@username",
        linkedin: "/in/yourprofile",
        photo: "Profile Picture URL",
        save: "Save"
    },
    ar: {
        edit: "تعديل الملف",
        name: "اسمك",
        title: "المسمى الوظيفي",
        bio: "نبذة عنك",
        instagram: "@اسم_مستخدم",
        linkedin: "/in/حسابك",
        photo: "رابط الصورة الشخصية",
        save: "حفظ"
    }
    };
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        bio: '',
        instagram: '',
        linkedin: '',
        photo: ''
    });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) setProfile(snap.data());
      setLoading(false);
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    await setDoc(userDocRef, profile);
    alert("Saved ✅");
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      {/* LEFT SIDE: EDITOR */}
      <div style={{ 
          flex: 1, 
          padding: '2rem', 
          direction: lang === 'ar' ? 'rtl' : 'ltr' 
        }}>
        <button
        onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
        style={{
            background: '#fff',
            color: '#000',
            padding: '5px 10px',
            borderRadius: '5px',
            cursor: 'pointer',
            float: 'right'
        }}
        >
        🌐 {lang === 'en' ? 'العربية' : 'English'}
        </button>

        <h1>🛠️ {t[lang].edit}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input name="name" value={profile.name} onChange={handleChange} placeholder={t[lang].name} /><br /><br />
            <input name="title" value={profile.title} onChange={handleChange} placeholder={t[lang].title} /><br /><br />
            <textarea name="bio" value={profile.bio} onChange={handleChange} placeholder={t[lang].bio} /><br /><br />
            <input name="instagram" value={profile.instagram} onChange={handleChange} placeholder={t[lang].instagram} /><br /><br />
            <input name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder={t[lang].linkedin} /><br /><br />
            <input name="photo" value={profile.photo} onChange={handleChange} placeholder={t[lang].profile} /><br /><br />
            <button onClick={saveProfile}>💾 Save</button>
          </>
        )}
      </div>

      {/* RIGHT SIDE: PREVIEW */}
      <div style={{
        flex: 1,
        padding: '2rem',
        background: '#111',
        color: '#fff',
        borderLeft: '1px solid #444',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h1>🔍 Qard Preview</h1>
        <img
          src={profile.photo || 'https://via.placeholder.com/100'}
          alt="Profile"
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }}
        />
        <h2>{profile.name || 'Your Name'}</h2>
        <h4>{profile.title || 'Your Title'}</h4>
        <p style={{ maxWidth: '300px', textAlign: 'center' }}>{profile.bio || 'Your bio goes here'}</p>
        <div style={{ marginTop: '1rem' }}>
          {profile.instagram && (
            <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" width="30" style={{ marginRight: '10px' }} />
            </a>
          )}
          {profile.linkedin && (
            <a href={`https://linkedin.com${profile.linkedin}`} target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" width="30" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;
