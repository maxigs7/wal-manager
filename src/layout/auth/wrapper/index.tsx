import React, { PropsWithChildren } from 'react';

const styles = {
  container: 'flex items-center bg-background-900 justify-center min-h-screen md:py-5 w-full',
  box: 'flex flex-col bg-background text-foreground min-w-full md:min-w-[32rem] px-5 py-3 md:rounded-xl shadow-xl',
};

export const Wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.container}>
    <div className={styles.box}>{children}</div>
  </div>
);
