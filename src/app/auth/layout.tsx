import { PropsWithChildren } from 'react';

import AuthLayout from '@/layout/auth';

export default function AuthRootLayout({ children }: PropsWithChildren) {
  return <AuthLayout>{children}</AuthLayout>;
}
