import React from 'react';
import { Router, Route } from "react-router-dom";
import HomeContainer from '../containers/HomeContainer';
import history from './history';

function Routes() {
  return (   
     <Router history={history}>               
         <Route  path="/" component={HomeContainer} />      
     </Router>
  );
}

export default Routes;


