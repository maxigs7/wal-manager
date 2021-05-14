import React from 'react';
import { Route, RouteProps } from 'react-router-dom';

import DefaultLayout from '@app/layouts/default';

const DefaultRoute: React.FC<RouteProps> = (props: RouteProps) => (
  <DefaultLayout>
    <Route {...props} />
  </DefaultLayout>
);

export default DefaultRoute;

// function PrivateRoute({ children, ...rest }) {
//   let auth = useAuth();
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         auth.user ? (
//           children
//         ) : (
//           <Redirect
//             to={{
//               pathname: '/login',
//               state: { from: location },
//             }}
//           />
//         )
//       }
//     />
//   );
// }
