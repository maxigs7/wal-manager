import React from 'react';

import { Button, Text, Title } from '@app/modules/common';
import { ColorsMap, ColorsType } from '@lib/tailwind-css/colors';

const DashboardPage: React.FC = () => (
  <>
    <Title>Dashboard</Title>
    <hr className="my-5" />
    <Text>My Buttons</Text>
    <div>
      {Object.keys(ColorsMap).map((key) => (
        <Button className="mr-2 mb-2" color={key as ColorsType} key={key}>
          {key}
        </Button>
      ))}
    </div>
    <hr className="my-5" />
    <Text>My Outlined Buttons</Text>
    <div>
      {Object.keys(ColorsMap).map((key) => (
        <Button className="mr-2 mb-2" color={key as ColorsType} key={key} outlined>
          {key}
        </Button>
      ))}
    </div>
  </>
);

export default DashboardPage;
