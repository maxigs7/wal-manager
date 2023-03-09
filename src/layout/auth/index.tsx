import React, { PropsWithChildren } from 'react';

import { es } from '@/i18n';
import { WalletLogo } from '@/shared';

import { SideImage } from './side-image';

const AuthLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="grid h-screen lg:grid-cols-2">
    <div className="flex flex-col p-4 text-center sm:p-5 md:p-10 xl:py-12 xl:px-16">
      <a className="flex items-center" href="/">
        <WalletLogo className="w-6" />
        <span className="ml-3 text-lg">{es.common.appName} </span>
      </a>
      {children}
    </div>
    <SideImage />
  </div>
);

export default AuthLayout;
