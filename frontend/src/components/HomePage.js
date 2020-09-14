import React, { Component } from 'react'
import './Homestyle.css'
import LOGO from './images/TwittersRightpart.jpg'
import history from '../history'
import Twitterlogo from "./images/twitter.png"
// import TwittersSmall_logo from "./images/Twitter_small.jpg"
class HomePage extends Component {
    render() {
        return (
            <div className="Big_Container">
                <div className="LeftDiv">
                   <img src={LOGO} className="imgstyle"></img> 
                </div>
               
                <div className="RightDiv">
                <div className="headingstyle">Welcome To Mini-Twitter</div>
                <img src={Twitterlogo} className="Small_logo"></img>
                  <h1>See what’s happening in </h1> 
                  <h1 >the world right now </h1>
                  <h4>Join Mini-Twitter today.</h4>
                <a href="#" className="btn stylebutton"onClick={()=>history.push("/minitwitter/Registration")} >Sign Up</a>
                <br></br>
                <br></br>
                <a href="#" className="btn2 stylebutton1" onClick={()=>history.push("/minitwitter/Login")}>Log in</a>
                </div>
            </div>
        )
    }
}

export default HomePage
