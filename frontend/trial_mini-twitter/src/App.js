import React from 'react';
import logo from './logo.svg';
import './App.css';

import SignUp from "./components/Sign_Up/signUp"
import Login from './components/Login/Login';
import Routes from './components/Routes';
import sidebar from './components/Sidebar/sidebar';



function App() {
  
  return (
  
    <div >
      {/* <SignUp/>
      <Login/> */}
      <Routes></Routes>
      {/* <userProfile/> */}
    
    </div>
  );
}


export default App;
