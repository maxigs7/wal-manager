import React, { Suspense } from 'react';
import { Switch } from 'react-router';
import { Redirect } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { PageLoader } from '@app/modules/common';
import { adminRoutes } from '@app/routes/admin.route';
import PrivateRoute from '@app/routes/private.route';

import { Navbar } from './navbar';
import { Sidebar, SidebarProvider } from './sidebar';

const AdminLayout: React.FC = () => (
  <SidebarProvider>
    <Flex minH="100vh" overflow="hidden">
      <Sidebar />
      <Flex
        bg="narvik.100"
        direction="column"
        flex={1}
        overflowX="hidden"
        overflowY="auto"
        pos="relative"
      >
        <Navbar />
        <Flex as="main" mx="auto" px={{ base: 4, sm: 6, lg: 8 }} py={8} w="full">
          <Suspense fallback={<PageLoader />}>
            <Switch>
              {adminRoutes.map((route, index) => (
                <PrivateRoute {...route} key={index} />
              ))}
              <Redirect from="/" to="/dashboard" exact />
              <Redirect from="*" to="/404" />
            </Switch>
          </Suspense>
        </Flex>
      </Flex>
    </Flex>
  </SidebarProvider>
);

export default AdminLayout;
