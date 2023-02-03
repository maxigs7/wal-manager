import { PropsWithChildren } from 'react';

import { Heading, Text } from '@chakra-ui/react';

// export default App;
const FullLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <h1>Full Layout</h1>
      {children}
    </>
  );
};

export default FullLayout;
