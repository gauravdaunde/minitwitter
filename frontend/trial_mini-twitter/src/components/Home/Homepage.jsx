import React, { Component } from 'react'
import history from "../../history"
import LOGO from "../../images/TwittersRightpart.jpg"
import Twitterlogo from "../../images/twitter.png"
import "../Home/HomePage.css"
 class Homepage extends Component {
    render() {
        return (
            <div>
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
                <a className="btn stylebutton"
                onClick={()=>history.push("/minitwitter/registration")} >Sign Up</a>
                <br></br>
                <br></br>
                <a  className="btn2 stylebutton1" 
                onClick={()=>history.push("/minitwitter/login")}>Log in</a>
                </div>
            </div>     
            </div>
        )
    }
}

export default Homepage
