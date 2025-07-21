import React from 'react';
import './Registernow.css';
import { useRouter } from 'next/navigation';

const Registernow = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/eventpage');
  };

  return (
    <button onClick={handleClick} className='register-btn'>
      <span className="register-btn-icon">📝</span>
      <span className="register-btn-text">Register Now!</span>
    </button>
  );
};

export default Registernow;