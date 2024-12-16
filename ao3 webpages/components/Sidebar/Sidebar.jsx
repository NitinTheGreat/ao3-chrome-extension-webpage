import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState('');
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const styles = {
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modal: {
          display: 'flex',
          flexDirection: 'column',
          width: '560px',
          height: '320px',
          padding: '57px 84px 56px 84px',
          justifyContent: 'center',
          alignItems: 'center',
          flexShrink: 0,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        title: {
          color: '#2E5FB7',
          fontSize: '36px',
          fontWeight: 'bold',
          marginBottom: '20px',
        },
        message: {
          color: '#333',
          fontSize: '24px',
          textAlign: 'center',
          marginBottom: '40px',
        },
        buttonContainer: {
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
        },
        button: {
          padding: '10px 20px',
          fontSize: '18px',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        },
        cancelButton: {
          backgroundColor: '#F0F0F0',
          color: '#333',
        },
        logoutButton: {
          backgroundColor: '#2E5FB7',
          color: 'white',
        },
      };
    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    const handleClickOutside = (e) => {
        if (!e.target.closest('.sidebar')) {
            setIsOpen(false);
        }
    };

    const handleItemClick = (item) => {
        if (item === 'Logout') {
            setShowLogoutModal(true);
        } 
        else if(item === 'Recommendations') {
            setActiveItem(item);
            navigate('/dashboard');
        }
        else if(item === 'Settings'){
            const Username = async () => {
                try {
                    const accessToken = localStorage.getItem('accessToken');
                    const refreshToken = localStorage.getItem('refreshToken');
                  const response = await fetch('https://ao3-chrome-extension-backend.onrender.com/auth/userdetail', {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'Tokens': JSON.stringify({ accessToken, refreshToken }),
                    },
                  });
        
                  if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('email', data.email);
                    navigate('/settings');
                  } else {
                    // Tokens are invalid
                    console.log('Token validation failed:', response.status);
                    alert('Token validation failed please login');
                  }
                } catch (error) {
                  console.error('Error during token validation:', error);
                }
              };
            Username();
        }
        else {
            setActiveItem(item);
            navigate(`/${item.toLowerCase()}`);
        }
    };
    const handleLogout = () => {
        console.log('logout');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accessToken');
        navigate('/login');
        showLogoutModal(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        const path = location.pathname.slice(1);
        setActiveItem(path.charAt(0).toUpperCase() + path.slice(1));
    }, [location])


    return (
        <div
            className={`sidebar ${isOpen ? 'open' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="logo">
                <svg width="38" height="33" viewBox="0 0 38 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0099 7.81305L18.8808 1L27.106 15.3073C31.2781 22.7614 24.3642 30.8168 17.5695 25.0458L15.1854 27.0897C18.8121 30.8491 25.2483 31.689 29.3136 26.4891C30.3303 25.1886 32.4979 25.0267 33.3497 26.4407L37 32.5H20.7881C10.5364 31.5382 12.4437 20.958 18.2848 19.5153L17.6887 16.5095C12.9337 17.4479 8.53713 22.5451 10.8734 29.2924C11.3811 30.7588 10.4194 32.5 8.86755 32.5H1L8.86755 18.9141C14.351 10.979 24.7219 15.6679 22.6954 22.7614L25.7947 23.7233C26.9922 19.3955 24.0963 12.3715 17.247 11.4678C15.5334 11.2418 14.1561 9.31586 15.0099 7.81305Z" fill="#0C2640" stroke="black" />
                </svg>
                <span>AO3 Assist</span>
            </div>
            <div className="icon-container">
                <div className={`icon-wrapper ${activeItem === 'Recommendations' ? 'active' : ''}`} onClick={() => handleItemClick('Recommendations')}>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_674_478)">
                            <path d="M2.95546 2.02148H5.14989C5.70611 2.02159 6.24175 2.23185 6.6495 2.61016C7.05726 2.98847 7.30701 3.50688 7.34873 4.06153L7.35534 4.22694V24.0761C7.35522 24.6325 7.1448 25.1682 6.76626 25.576C6.38772 25.9838 5.86904 26.2334 5.31419 26.2749L5.14878 26.2815H2.95546C2.39924 26.2814 1.8636 26.0711 1.45584 25.6928C1.04809 25.3145 0.798333 24.7961 0.756617 24.2415L0.75 24.0761V4.22694C0.749824 3.67053 0.959967 3.13462 1.3383 2.72663C1.71664 2.31864 2.2352 2.06873 2.79005 2.027L2.95546 2.02148ZM10.669 2.02148H12.869C13.4252 2.02159 13.9608 2.23185 14.3686 2.61016C14.7764 2.98847 15.0261 3.50688 15.0678 4.06153L15.0744 4.22694V24.0761C15.0743 24.6325 14.8639 25.1682 14.4854 25.576C14.1068 25.9838 13.5881 26.2334 13.0333 26.2749L12.8679 26.2815H10.669C10.1126 26.2817 9.57672 26.0715 9.16873 25.6932C8.76074 25.3149 8.51083 24.7963 8.4691 24.2415L8.46359 24.0761V4.22694C8.46341 3.67053 8.67355 3.13462 9.05189 2.72663C9.43022 2.31864 9.94879 2.06873 10.5036 2.027L10.669 2.02148ZM20.7425 4.25561C21.6732 4.25561 22.5245 4.84888 22.8299 5.75532L22.8807 5.92845L27.1372 23.002C27.2722 23.5419 27.1981 24.1129 26.9298 24.6004C26.6615 25.088 26.2188 25.4561 25.6904 25.6309L25.5316 25.6761L23.367 26.2164C23.1876 26.2606 23.0093 26.2826 22.8321 26.2826C22.3711 26.2822 21.9218 26.1373 21.5474 25.8683C21.1729 25.5993 20.8922 25.2197 20.7447 24.7829L20.694 24.6087L16.4374 7.53513C16.3028 6.99525 16.3771 6.42442 16.6457 5.93709C16.9142 5.44975 17.357 5.08191 17.8853 4.90732L18.043 4.86101L20.2076 4.32178C20.387 4.27767 20.5653 4.25561 20.7425 4.25561ZM5.14989 3.67558H2.95546C2.82641 3.67553 2.70144 3.72076 2.6023 3.80337C2.50316 3.88599 2.43614 4.00076 2.41291 4.1277L2.40409 4.22694V24.0761C2.40409 24.3451 2.60038 24.5723 2.85621 24.6186L2.95546 24.6274H5.14989C5.42006 24.6274 5.64611 24.4311 5.69243 24.1753L5.70125 24.0761V4.22694C5.70129 4.09789 5.65607 3.97292 5.57346 3.87378C5.49084 3.77465 5.37607 3.70763 5.24913 3.6844L5.14989 3.67558ZM12.869 3.67558H10.669C10.54 3.67553 10.415 3.72076 10.3159 3.80337C10.2167 3.88599 10.1497 4.00076 10.1265 4.1277L10.1177 4.22694V24.0761C10.1177 24.3451 10.3129 24.5723 10.5698 24.6186L10.669 24.6274H12.869C13.1392 24.6274 13.3652 24.4311 13.4115 24.1753L13.4204 24.0761V4.22694C13.4204 4.09789 13.3752 3.97292 13.2926 3.87378C13.2099 3.77465 13.0952 3.70763 12.9682 3.6844L12.869 3.67558ZM20.7425 5.9097L20.6752 5.91412L20.6068 5.92625L18.4433 6.46658C18.3181 6.49781 18.2078 6.57197 18.1316 6.67614C18.0554 6.78032 18.0182 6.90791 18.0264 7.03669L18.0419 7.13373L22.2984 24.2084C22.3701 24.4951 22.6259 24.6274 22.8321 24.6274L22.9005 24.6241L22.9667 24.6098L25.1313 24.0705C25.2563 24.0393 25.3665 23.9654 25.4426 23.8614C25.5188 23.7575 25.5561 23.6301 25.5482 23.5015L25.5327 23.4023L21.2762 6.32764C21.2465 6.20849 21.1778 6.10267 21.0811 6.02696C20.9845 5.95125 20.8653 5.90998 20.7425 5.9097Z" fill="#2E61B5" />
                        </g>
                        <defs>
                            <clipPath id="clip0_674_478">
                                <rect width="28" height="28" fill="white" transform="translate(0.150024)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Recommendations</span>
                </div>
                <div className={`icon-wrapper ${activeItem === 'Notes' ? 'active' : ''}`} onClick={() => handleItemClick('Notes')}>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.619 1.91309H20.1432H22.635C23.7396 1.91309 24.635 2.80852 24.635 3.91309V13.4664V23.9131C24.635 25.0177 23.7396 25.9131 22.635 25.9131H6.0636C4.95903 25.9131 4.0636 25.0177 4.0636 23.9131V22.9178V7.52917M10.619 1.91309L4.0636 7.52917M10.619 1.91309V7.02917C10.619 7.30531 10.3951 7.52917 10.119 7.52917H4.0636M8.625 12.4954H13.2847H16.1919M18.6261 15.7865H8.625M8.625 19.3803H14.7731" stroke="#6B7A8F" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                    <span>Notes</span>
                </div>
                <div className={`icon-wrapper ${activeItem === 'Bookmarks' ? 'active' : ''}`} onClick={() => handleItemClick('Bookmarks')}>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.9378 19.0615L21.8688 24.8981C22.5192 25.4458 23.5129 24.9834 23.5129 24.1332V18.5191V4.02148C23.5129 2.91691 22.6175 2.02148 21.5129 2.02148H8.95624H7.07446C5.96989 2.02148 5.07446 2.91692 5.07446 4.02149V24.1332C5.07446 24.9834 6.06823 25.4458 6.7186 24.8981L13.6496 19.0615C14.0218 18.748 14.5656 18.748 14.9378 19.0615Z" stroke="#6B7A8F" strokeWidth="1.8" />
                    </svg>
                    <span>Bookmarks</span>
                </div>
                <div className={`icon-wrapper ${activeItem === 'History' ? 'active' : ''}`} onClick={() => handleItemClick('History')}>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_674_491)">
                            <path d="M26.826 12.7186L27.725 12.6758L27.7239 12.6538L27.7218 12.6319L26.826 12.7186ZM8.51069 21.6765C8.11585 21.3746 7.551 21.4499 7.24906 21.8447C6.94713 22.2396 7.02244 22.8044 7.41728 23.1064L8.51069 21.6765ZM4.99442 14.1414C4.88054 10.4974 6.07148 7.77926 7.88086 5.93562C9.70206 4.07993 12.2027 3.05693 14.7838 2.91665C19.9301 2.63698 25.2573 5.85207 25.9302 12.8053L27.7218 12.6319C26.9438 4.59221 20.6636 0.79446 14.6861 1.11931C11.7054 1.2813 8.76503 2.4649 6.59619 4.67482C4.41552 6.89678 3.06735 10.1033 3.19529 14.1976L4.99442 14.1414ZM25.927 12.7614C26.3734 22.1354 16.1388 27.5098 8.51069 21.6765L7.41728 23.1064C16.233 29.8478 28.2459 23.6147 27.725 12.6758L25.927 12.7614Z" fill="#6B7A8F" />
                            <path d="M14.3616 8.42969V14.2965L20.2284 17.2299" stroke="#6B7A8F" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.6499 14.2998H4.09442H6.53894L4.09442 17.2332L1.6499 14.2998Z" fill="#6B7A8F" />
                            <path d="M1.6499 14.2998V13.3998C1.30069 13.3998 0.982994 13.6018 0.834872 13.9181C0.68675 14.2343 0.734941 14.6077 0.958503 14.876L1.6499 14.2998ZM4.09442 17.2332L3.40302 17.8094C3.57401 18.0146 3.82732 18.1332 4.09442 18.1332C4.36152 18.1332 4.61482 18.0146 4.78582 17.8094L4.09442 17.2332ZM6.53894 14.2998L7.23034 14.876C7.4539 14.6077 7.50209 14.2343 7.35397 13.9181C7.20584 13.6018 6.88815 13.3998 6.53894 13.3998V14.2998ZM4.09442 13.3998H1.6499V15.1998H4.09442V13.3998ZM0.958503 14.876L3.40302 17.8094L4.78582 16.6571L2.3413 13.7236L0.958503 14.876ZM4.78582 17.8094L7.23034 14.876L5.84754 13.7236L3.40302 16.6571L4.78582 17.8094ZM6.53894 13.3998H4.09442V15.1998H6.53894V13.3998Z" fill="#6B7A8F" />
                        </g>
                        <defs>
                            <clipPath id="clip0_674_491">
                                <rect width="28" height="28" fill="white" transform="translate(0.149902)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>History</span>
                </div>
            </div>
            <div className="bottom-icons">
                <div className={`icon-wrapper ${activeItem === 'Settings' ? 'active' : ''}`} onClick={() => handleItemClick('Settings')}>

                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.3137 15.273C14.1212 15.273 15.5865 13.8077 15.5865 12.0003C15.5865 10.1928 14.1212 8.72754 12.3137 8.72754C10.5063 8.72754 9.04102 10.1928 9.04102 12.0003C9.04102 13.8077 10.5063 15.273 12.3137 15.273Z" stroke="#6B7A8F" strokeWidth="1.8" />
                        <path d="M14.2392 1.25664C13.8388 1.09082 13.3305 1.09082 12.3137 1.09082C11.297 1.09082 10.7886 1.09082 10.3883 1.25664C10.1234 1.36629 9.8827 1.52707 9.67998 1.72979C9.47726 1.93251 9.31648 2.1732 9.20683 2.43809C9.10646 2.68137 9.0661 2.96609 9.05083 3.37955C9.04372 3.67838 8.96094 3.97053 8.81022 4.22866C8.65949 4.4868 8.44576 4.70248 8.18901 4.85555C7.92807 5.00148 7.63437 5.07883 7.33541 5.08035C7.03644 5.08188 6.74197 5.00753 6.47955 4.86427C6.11301 4.67009 5.84792 4.56318 5.58501 4.52827C5.01154 4.45286 4.43159 4.60825 3.97264 4.96027C3.6301 5.22537 3.37483 5.665 2.86646 6.54537C2.3581 7.42573 2.10283 7.86536 2.04719 8.29627C2.0097 8.5804 2.02856 8.86914 2.10268 9.14598C2.1768 9.42282 2.30474 9.68234 2.47919 9.90973C2.64064 10.1192 2.86646 10.2948 3.21664 10.5152C3.73264 10.8392 4.06428 11.3912 4.06428 11.9999C4.06428 12.6086 3.73264 13.1606 3.21664 13.4835C2.86646 13.705 2.63955 13.8806 2.47919 14.0901C2.30474 14.3175 2.1768 14.577 2.10268 14.8538C2.02856 15.1307 2.0097 15.4194 2.04719 15.7035C2.10392 16.1334 2.3581 16.5741 2.86537 17.4545C3.37483 18.3348 3.62901 18.7745 3.97264 19.0395C4.20003 19.214 4.45955 19.3419 4.7364 19.4161C5.01324 19.4902 5.30197 19.509 5.5861 19.4715C5.84792 19.4366 6.11301 19.3297 6.47955 19.1355C6.74197 18.9923 7.03644 18.9179 7.33541 18.9195C7.63437 18.921 7.92807 18.9983 8.18901 19.1443C8.71592 19.4497 9.02901 20.0115 9.05083 20.6203C9.0661 21.0348 9.10537 21.3185 9.20683 21.5617C9.31648 21.8266 9.47726 22.0673 9.67998 22.27C9.8827 22.4728 10.1234 22.6335 10.3883 22.7432C10.7886 22.909 11.297 22.909 12.3137 22.909C13.3305 22.909 13.8388 22.909 14.2392 22.7432C14.5041 22.6335 14.7448 22.4728 14.9475 22.27C15.1502 22.0673 15.311 21.8266 15.4206 21.5617C15.521 21.3185 15.5614 21.0348 15.5766 20.6203C15.5985 20.0115 15.9116 19.4486 16.4385 19.1443C16.6994 18.9983 16.9931 18.921 17.2921 18.9195C17.591 18.9179 17.8855 18.9923 18.1479 19.1355C18.5145 19.3297 18.7796 19.4366 19.0414 19.4715C19.3255 19.509 19.6142 19.4902 19.8911 19.4161C20.1679 19.3419 20.4274 19.214 20.6548 19.0395C20.9985 18.7755 21.2526 18.3348 21.761 17.4545C22.2694 16.5741 22.5246 16.1345 22.5803 15.7035C22.6178 15.4194 22.5989 15.1307 22.5248 14.8538C22.4507 14.577 22.3227 14.3175 22.1483 14.0901C21.9868 13.8806 21.761 13.705 21.4108 13.4846C21.1555 13.3291 20.9438 13.1113 20.7955 12.8516C20.6473 12.5919 20.5673 12.2989 20.5632 11.9999C20.5632 11.3912 20.8948 10.8392 21.4108 10.5163C21.761 10.2948 21.9879 10.1192 22.1483 9.90973C22.3227 9.68234 22.4507 9.42282 22.5248 9.14598C22.5989 8.86914 22.6178 8.5804 22.5803 8.29627C22.5236 7.86646 22.2694 7.42573 21.7621 6.54537C21.2526 5.665 20.9985 5.22537 20.6548 4.96027C20.4274 4.78583 20.1679 4.65789 19.8911 4.58377C19.6142 4.50964 19.3255 4.49079 19.0414 4.52827C18.7796 4.56318 18.5145 4.67009 18.1468 4.86427C17.8845 5.00734 17.5903 5.08158 17.2915 5.08005C16.9928 5.07853 16.6993 5.00129 16.4385 4.85555C16.1817 4.70248 15.968 4.4868 15.8173 4.22866C15.6665 3.97053 15.5837 3.67838 15.5766 3.37955C15.5614 2.965 15.5221 2.68137 15.4206 2.43809C15.311 2.1732 15.1502 1.93251 14.9475 1.72979C14.7448 1.52707 14.5041 1.36629 14.2392 1.25664Z" stroke="#6B7A8F" strokeWidth="1.8" />
                    </svg>
                    <span>Settings</span>
                </div>
                <div className="icon-wrapper" onClick={() => handleItemClick('Logout')}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_674_498)">
                            <path d="M16.4226 18.0605L22.2197 11.9999M22.2197 11.9999L16.4226 5.9393M22.2197 11.9999H8.30662M11.7849 18.0605C11.7849 19.1878 11.7849 19.7514 11.6664 20.2139C11.3448 21.4686 10.4071 22.4489 9.20686 22.7851C8.76454 22.909 8.22543 22.909 7.1472 22.909H6.56749C4.94683 22.909 4.13649 22.909 3.49729 22.6322C2.64502 22.2632 1.96788 21.5552 1.61486 20.6643C1.3501 19.9959 1.3501 19.1488 1.3501 17.4545V6.54537C1.3501 4.85103 1.3501 4.00386 1.61486 3.33561C1.96788 2.4446 2.64502 1.73669 3.49729 1.36762C4.13649 1.09082 4.94683 1.09082 6.56749 1.09082H7.1472C8.22543 1.09082 8.76454 1.09082 9.20686 1.21472C10.4071 1.55097 11.3448 2.53115 11.6664 3.78602C11.7849 4.24844 11.7849 4.81207 11.7849 5.9393" stroke="#6B7A8F" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                            <clipPath id="clip0_674_498">
                                <rect width="24" height="24" fill="white" transform="translate(0.150024)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span>Logout</span>
                </div>
            {/* Logout modal  */}
                {showLogoutModal && (
                <div style={styles.overlay}>
                <div style={styles.modal}>
                  <h2 style={styles.title}>Attention !</h2>
                  <p style={styles.message}>Are you sure you want to log out ?</p>
                  <div style={styles.buttonContainer}>
                    <button
                      style={{ ...styles.button, ...styles.cancelButton }}
                      onClick={() => setShowLogoutModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      style={{ ...styles.button, ...styles.logoutButton }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
                )}

            </div>
        </div>
    );
    
};

export default Sidebar;