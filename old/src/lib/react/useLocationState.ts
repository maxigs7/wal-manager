import { useLocation } from 'react-router-dom';

export const useLocationState = <T>(): T | undefined => {
  const location = useLocation();
  return location.state as T;
};
