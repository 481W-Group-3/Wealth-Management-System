import React from 'react';

import './page-container.css';

const PageContainer = ({ children }) => {
  return (
    <div className="page-container">
      {children}
    </div>
  );
};

export default PageContainer;
