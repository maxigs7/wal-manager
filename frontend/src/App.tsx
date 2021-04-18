import { Route, Switch, Redirect } from 'react-router-dom';
import { Admin, Auth } from './layouts';

const app = () => {
  return (
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      <Redirect from="*" to="/auth" />
    </Switch>
  );
};

export default app;
