import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Logo, RecommendationsIcon, NotesIcon, BookmarksIcon, HistoryIcon, SettingsIcon, LogoutIcon } from './Icons';
import './Sidebar.css';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
  onClick: () => void;
  isOpen: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, isActive, onClick, isOpen }) => (
  <motion.div
    className={`icon-wrapper ${isActive ? 'active' : ''}`}
    onClick={onClick}
    whileHover={{ backgroundColor: 'rgba(46, 97, 181, 0.1)' }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
  >
    <div className="icon-container">{icon}</div>
    <motion.span
      className="icon-text"
      variants={{
        open: { opacity: 1, width: 'auto' },
        closed: { opacity: 0, width: 0 }
      }}
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
    <span className="mobile-text">{text}</span>
  </motion.div>
);

interface LogoutModalProps {
  onCancel: () => void;
  onLogout: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onCancel, onLogout }) => (
  <div className="modal-overlay">
    <div className="modal">
      <h2>Attention!</h2>
      <p>Are you sure you want to log out?</p>
      <div className="button-container">
        <button className="cancel-button" onClick={onCancel}>Cancel</button>
        <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    </div>
  </div>
);

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleItemClick = (item: string) => {
    if (item === 'Logout') {
      setShowLogoutModal(true);
    } else {
      setActiveItem(item);
      if (item === 'Recommendations') {
        navigate('/dashboard');
      } else {
        navigate(`/${item.toLowerCase()}`);
      }
    }
  };

  const handleLogout = () => {
    console.log('logout');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    navigate('/login');
    setShowLogoutModal(false);
  };

  useEffect(() => {
    const path = location.pathname.slice(1);
    setActiveItem(path === 'dashboard' ? 'Recommendations' : path.charAt(0).toUpperCase() + path.slice(1));
  }, [location]);

  const sidebarVariants = {
    open: { width: '268px' },
    closed: { width: '68px' }
  };

  return (
    <motion.div
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      variants={sidebarVariants}
      animate={isOpen ? 'open' : 'closed'}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="logo">
        <Logo />
        <motion.span
          className="logo-text"
          variants={{
            open: { opacity: 1, width: 'auto' },
            closed: { opacity: 0, width: 0 }
          }}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          transition={{ duration: 0.2 }}
        >
          AO3 Assist
        </motion.span>
      </div>
      <div className="menu-items">
        <SidebarItem
          icon={<RecommendationsIcon />}
          text="Recommendations"
          isActive={activeItem === 'Recommendations'}
          onClick={() => handleItemClick('Recommendations')}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<NotesIcon />}
          text="Notes"
          isActive={activeItem === 'Notes'}
          onClick={() => handleItemClick('Notes')}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<BookmarksIcon />}
          text="Bookmarks"
          isActive={activeItem === 'Bookmarks'}
          onClick={() => handleItemClick('Bookmarks')}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<HistoryIcon />}
          text="History"
          isActive={activeItem === 'History'}
          onClick={() => handleItemClick('History')}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<SettingsIcon />}
          text="Settings"
          isActive={activeItem === 'Settings'}
          onClick={() => handleItemClick('Settings')}
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<LogoutIcon />}
          text="Logout"
          isActive={false}
          onClick={() => handleItemClick('Logout')}
          isOpen={isOpen}
        />
      </div>
      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} onLogout={handleLogout} />
      )}
    </motion.div>
  );
};

export default Sidebar;

