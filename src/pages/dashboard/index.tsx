import React from 'react';

import { Button, Text, Title } from '@app/modules/common';
import { Colors } from '@lib/tailwind-css/colors';

const DashboardPage: React.FC = () => (
  <>
    <Title>Dashboard</Title>
    <hr className="my-5" />
    <Text>My Buttons</Text>
    <div>
      {Object.keys(Colors).map((key) => (
        <Button className="mr-2 mb-2" color={key as Colors} key={key}>
          {key}
        </Button>
      ))}
    </div>
    <hr className="my-5" />
    <Text>My Outlined Buttons</Text>
    <div>
      {Object.keys(Colors).map((key) => (
        <Button className="mr-2 mb-2" color={key as Colors} key={key} outlined>
          {key}
        </Button>
      ))}
    </div>
  </>
);

export default DashboardPage;
