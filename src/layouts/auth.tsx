import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from 'pages';

const AuthLayout: React.FC = () => (
  <main className="bg-blueGray-700 h-screen w-screen flex content-center items-center justify-center">
    <Switch>
      <Route path="/auth/login" exact component={Login} />
      <Redirect from="/auth" to="/auth/login" />
    </Switch>

    {/* <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: 'url(' + bgImage + ')',
        }}
      ></div> */}
    {/* <CardContainer className="relative mx-auto p-10 z-10 w-auto"></CardContainer> */}
  </main>
);

export default AuthLayout;
