import 'server-only';

import { PropsWithChildren, ReactNode } from 'react';

type LayoutModalProps = PropsWithChildren & { modal: ReactNode };

const Layout: React.FC<LayoutModalProps> = ({ children, modal }) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default Layout;
