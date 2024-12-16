import React, { useState, useEffect } from 'react';
import { Edit2, Heart } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
const SettingsPage = () => {
  const [username, setUsername] = useState('rounakag');
  const [email, setEmail] = useState('rounak2860@gmail.com');
  const [appearance, setAppearance] = useState('light');
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedEmail = localStorage.getItem('email');

    if (storedUsername) {
      setUsername(storedUsername);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);
  
  const styles = {
    body: {
      backgroundColor: '#f8f8f8',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      minWidth: '80vw',
      marginLeft: '15vw',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: 0,
    },
    madeWith: {
      fontSize: '14px',
      color: '#666',
      whiteSpace: 'nowrap',
    },
    heart: {
      color: '#0066cc',
      verticalAlign: 'middle',
    },
    section: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    },
    sectionTitle: {
      fontSize: '20px',
      color: '#0066cc',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    inputContainer: {
      marginBottom: '20px',
      position: 'relative',
      maxWidth: '300px',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      color: '#666',
      fontSize: '14px',
    },
    input: {
      width: '100%',
      padding: '10px',
      paddingRight: '30px',
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      fontSize: '14px',
      transition: 'all 0.3s ease',
    },
    inputHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    editIcon: {
      position: 'absolute',
      right: '10px',
      top: '38px',
      color: '#666',
      cursor: 'pointer',
    },
    profileContainer: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    profileInputs: {
      flex: 1,
      marginRight: '40px',
    },
    profilePicture: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      transition: 'transform 1.5s ease',
      transform: isFlipping ? 'perspective(400px) rotateY(360deg)' : 'perspective(400px) rotateY(0deg)',
    },
    toggleContainer: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: '20px',
      padding: '4px',
      width: 'fit-content',
    },
    toggleButton: {
      padding: '6px 16px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    activeToggle: {
      backgroundColor: '#0066cc',
      color: 'white',
    },
    inactiveToggle: {
      backgroundColor: 'transparent',
      color: '#666',
    },
    toggleButtonHover: {
      transform: 'scale(1.05)',
    },
    
  };

  const handleProfilePictureHover = () => {
    setIsFlipping(true);
    setTimeout(() => setIsFlipping(false), 1500);
  };

  return (
    <div className="flex bg-gray-50">
      <Sidebar />
      <div style={styles.body}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1 style={styles.title}>Settings</h1>
            <span style={styles.madeWith}>
              Made with <Heart size={16} style={styles.heart} /> by GDSC - VIT
            </span>
          </header>
          <h2 style={styles.sectionTitle}>Profile</h2>
          <section style={styles.section}>

            <div style={styles.profileContainer}>
              <div style={styles.profileInputs}>
                <div style={styles.inputContainer}>
                  <label style={styles.label}>Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.inputHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.input)}
                  />
                  <Edit2 size={16} style={styles.editIcon} />
                </div>
                <div style={styles.inputContainer}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                    onMouseEnter={(e) => Object.assign(e.target.style, styles.inputHover)}
                    onMouseLeave={(e) => Object.assign(e.target.style, styles.input)}
                  />
                  <Edit2 size={16} style={styles.editIcon} />
                </div>
              </div>
              <div
                style={styles.profilePicture}
                onMouseEnter={handleProfilePictureHover}
              ></div>
            </div>
          </section>
          <h2 style={styles.sectionTitle}>Appearance</h2>
          <section style={styles.section}>

            <div style={styles.toggleContainer}>
              <button
                onClick={() => setAppearance('light')}
                style={{
                  ...styles.toggleButton,
                  ...(appearance === 'light' ? styles.activeToggle : styles.inactiveToggle),
                }}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.toggleButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, appearance === 'light' ? { ...styles.toggleButton, ...styles.activeToggle } : { ...styles.toggleButton, ...styles.inactiveToggle })}
              >
                Light
              </button>
              <button
                onClick={() => setAppearance('dark')}
                style={{
                  ...styles.toggleButton,
                  ...(appearance === 'dark' ? styles.activeToggle : styles.inactiveToggle),
                }}
                onMouseEnter={(e) => Object.assign(e.target.style, styles.toggleButtonHover)}
                onMouseLeave={(e) => Object.assign(e.target.style, appearance === 'dark' ? { ...styles.toggleButton, ...styles.activeToggle } : { ...styles.toggleButton, ...styles.inactiveToggle })}
              >
                Dark
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;