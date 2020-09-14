import React from 'react';

import './App.css';

import ReactDOM from 'react-dom';
import Routes from './Routes';
import Parent from './components/Parent';




function App() {
  return (
    <div>
      {/* <li><Link to="/registration">Registration</Link></li>
      <Route path="/registration" component={Registration}></Route> */}

      {/* <Router><Switch><Route path="registration" exact><Registration></Registration></Route></Switch></Router> */}
     {/* <Formcomponent>
      
    </Formcomponent> */}
    {/* <HomePage></HomePage> */}
   <Parent></Parent>
   {/* <demo></demo> */}
   {/* <Registration></Registration> */}
      
    </div>
  );
}

export default App;
