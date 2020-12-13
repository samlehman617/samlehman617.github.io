import React from 'react';
import { useLocation } from 'react-router-dom';

import ReactGA from 'react-ga';
ReactGA.initialize('ENTER KEY HERE');

function usePageViews() {
  let location = useLocation();
  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
};

export default usePageViews;
