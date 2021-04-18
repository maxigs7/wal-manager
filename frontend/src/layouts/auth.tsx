import { Switch, Route, Redirect } from 'react-router-dom';
import bgImage from 'assets/img/auth-bg.png';
import CardContainer from 'components/ui/card-container';
import { Login } from 'pages';

const AuthLayout: React.FC = () => (
  <main>
    <section className="relative w-full h-full min-h-screen flex content-center items-center justify-center">
      <div
        className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style={{
          backgroundImage: 'url(' + bgImage + ')',
        }}
      ></div>
      <CardContainer className="relative mx-auto p-10 z-10 w-auto">
        <Switch>
          <Route path="/auth/login" exact component={Login} />
          <Redirect from="/auth" to="/auth/login" />
        </Switch>
      </CardContainer>
    </section>
  </main>
);

export default AuthLayout;
