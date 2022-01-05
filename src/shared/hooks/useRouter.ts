import { useMemo } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
  useResolvedPath,
  useMatch,
} from 'react-router-dom';

import { parse } from 'query-string';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const hook = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(() => {
    return {
      // For convenience add navigate(), pathname at top level
      navigate,
      pathname: location.pathname,
      // Merge params and parsed query string into single "query" object
      // so that they can be used interchangeably.
      // Example: /:topic?sort=popular -> { topic: "react", sort: "popular" }
      params,
      query: parse(searchParams.toString()), // Convert string to object
      state: location.state,
      // Include match, location, history objects so we have
      // access to extra React Router functionality if needed.
      location,
      useResolvedPath: useResolvedPath,
      useMatch: useMatch,
    };
  }, [location, navigate, params, searchParams]);
};

export default hook;
