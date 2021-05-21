import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import { Navbar, Sidebar, SidebarProvider } from '@app/components/layout';
import { PageLoader } from '@app/components/loaders';
import { adminRoutes } from '@app/routes/admin.route';
import PrivateRoute from '@app/routes/private.route';

const AdminLayout: React.FC = () => (
  <SidebarProvider>
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Navbar />
        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <Suspense fallback={<PageLoader />}>
              <Switch>
                {adminRoutes.map((route, index) => (
                  <PrivateRoute {...route} key={index} />
                ))}
                <Redirect from="/" to="/dashboard" exact />
                <Redirect from="*" to="/404" />
              </Switch>
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default AdminLayout;
