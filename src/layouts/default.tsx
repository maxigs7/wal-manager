import classNames from 'classnames';

const DefaultLayout: React.FC = ({ children }) => (
  <section className={classNames('bg-indigo-600', 'h-screen')}>
    <div className="mx-auto flex justify-center lg:items-center h-full">{children}</div>
  </section>
);

export default DefaultLayout;
