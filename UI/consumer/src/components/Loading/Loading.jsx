import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="loading-container">
      <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      <p>Loading...</p>
    </div>
  )
}

export default Loading