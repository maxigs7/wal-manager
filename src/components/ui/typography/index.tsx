import classnames from 'classnames';

export const H1: React.FC<React.ComponentPropsWithoutRef<'h1'>> = ({ className, children }) => (
  <h1 className={classnames('text-6xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h1>
);

export const H2: React.FC<React.ComponentPropsWithoutRef<'h2'>> = ({ className, children }) => (
  <h2 className={classnames('text-5xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h2>
);

export const H3: React.FC<React.ComponentPropsWithoutRef<'h3'>> = ({ className, children }) => (
  <h3 className={classnames('text-4xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h3>
);

export const H4: React.FC<React.ComponentPropsWithoutRef<'h4'>> = ({ className, children }) => (
  <h4 className={classnames('text-3xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h4>
);

export const H5: React.FC<React.ComponentPropsWithoutRef<'h5'>> = ({ className, children }) => (
  <h5 className={classnames('text-2xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h5>
);

export const H6: React.FC<React.ComponentPropsWithoutRef<'h6'>> = ({ className, children }) => (
  <h6 className={classnames('text-1xl font-normal leading-normal mt-0 mb-2', className)}>
    {children}
  </h6>
);

export const P: React.FC<React.ComponentPropsWithoutRef<'p'>> = ({ className, children }) => (
  <p className={classnames('text-base font-light leading-relaxed mt-0 mb-4', className)}>
    {children}
  </p>
);
