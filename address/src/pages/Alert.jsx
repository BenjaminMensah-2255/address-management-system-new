import React from 'react';
import './Alert.css';

function Alert({ message }) {
  return (
    <div className="alert">
      {message}
    </div>
  );
}

export default Alert;
