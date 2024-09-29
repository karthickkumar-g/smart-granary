// import React from 'react';
import PropTypes from 'prop-types';

const LoadingBar = ({ size = 'w-8 h-8', color = 'border-blue-500' }) => {
  return (
    <div className="justify-center flex">
      <div className={`border-4 border-t-transparent ${size} rounded-full animate-spin ${color}`}></div>
    </div>
  );
};

// Add prop types validation
LoadingBar.propTypes = {
  size: PropTypes.string,  
  color: PropTypes.string, 
};


export default LoadingBar;
