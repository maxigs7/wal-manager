import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Flex } from '@chakra-ui/react';

import { PageLoader } from '@lib/wal-ui';
import { defaultRoutes } from '@routes';

const DefaultLayout: React.FC = () => (
  <Flex align="center" as="section" bg="cello.500" justify="center" minH="100vh">
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {defaultRoutes.map((route, index) => (
          <Route {...route} key={index} />
        ))}
        <Redirect from="*" to="/auth/sign-in" />
      </Switch>
    </Suspense>
  </Flex>
);

export default DefaultLayout;
