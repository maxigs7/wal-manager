import { createContext, useContext, useRef } from 'react';

interface IProps {
  titleBoxRef: any;
}

export const PagePortalsContext: React.Context<IProps> = createContext<IProps>({} as IProps);

export const usePagePortals = () => useContext(PagePortalsContext);

export const PagePortalsProvider: React.FC = ({ children }) => {
  const summaryRef = useRef();

  return (
    <PagePortalsContext.Provider
      value={{
        titleBoxRef: summaryRef,
      }}
    >
      {children}
    </PagePortalsContext.Provider>
  );
};
