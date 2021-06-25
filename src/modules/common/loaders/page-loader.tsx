import React from 'react';

const styles = {
  loader:
    'animate-spin ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4',
  overlay: 'w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50',
  wrapper: 'flex justify-center items-center w-full h-full',
};

const PageLoader: React.FC = () => (
  <div className={styles.overlay}>
    <div className={styles.wrapper}>
      <div className={styles.loader} style={{ borderTopColor: 'rgba(220, 38, 38, 1)' }}></div>
    </div>
  </div>
);

export default PageLoader;
