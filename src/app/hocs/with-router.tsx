import { BrowserRouter } from 'react-router-dom';

export const withRouter = <T,>(WrappedComponent: React.ComponentType<T>): React.FC<T> => {
  // Try to create a nice displayName for React Dev Tools.
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  // Creating the inner component. The calculated Props type here is the where the magic happens.
  const ComponentWithRouter = (props: T) => (
    <BrowserRouter>
      <WrappedComponent {...(props as T)} />
    </BrowserRouter>
  );

  ComponentWithRouter.displayName = `withRouter(${displayName})`;

  return ComponentWithRouter;
};
