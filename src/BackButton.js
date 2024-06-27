import React from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <button onClick={() => window.history.back()} style={{ display: 'flex', alignItems: 'center' , marginLeft: '15px', marginTop:'15px' }}>
      <IoMdArrowRoundBack style={{ marginRight: '10px', fontSize: '28px' }} /> {/* Adding the back arrow icon */}
      {children}
    </button>
    </Link>
  );
};

export default BackButton;
