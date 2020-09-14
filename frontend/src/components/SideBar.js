import React, { Component } from 'react'
import history from '../history'
import TwitterLogo from  "./images/twitter.png"
import axios from "axios"
import Routes from '../Routes'
import UniversalSearch from "./UniversalSearch"
import { render } from 'react-dom'


 class SideBar extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
             toggle:true,
             id:this.props.id
         }
         console.log("SIDE",this.props)
        
        
     }
     togglehandler=()=>{
         this.setState({
             toggle:!this.state.toggle
         })
     }


    removeitem=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        {history.push("/minitwitter/Login")}
    }
    
    render() {
      const{id}=this.state
      console.log("render side id",id)
        return (
            <div>
        
                <div className="leftpart">
            <button className="change homebutton" onClick={()=>{history.push("/minitwitter/Timeline/")}}><i class="fa fa-home"></i>Home</button>
            <div className="twitter_logo"><img src={TwitterLogo} ></img></div>  
            <br/>
            <br/>
            <br/>
            <br/>
            <button className="change followersbutton" 
            onClick={()=>{history.push("/minitwitter/Followers/")}}>
                <i class="fa fa-user-friends">
            </i>Followers</button>
            <br/>
            <br/>
          
           <button className="change followingbutton" 
           onClick={()=>{history.push("/minitwitter/Followings/")}}>
               <i class="fa fa-user-plus" ></i>Following</button>
            <br/>
            <br/>
    <button className="change profilebutton"
     onClick={()=>{history.push("/minitwitter/UserProfile/"+id)}}>  
         <i class="fa fa-user"></i>Profile</button>
            <br/>
            <br/>
            <button className="tweetbutton" onClick={()=>history.push("/minitwitter/Tweets/")}>Tweet</button>
           
            <button type="button"  className="buttonstyle" onClick={this.removeitem}  >LogOut</button>
            </div>  
            {/* <Routes path="/minitwitter/search/" render={props=>(<UniversalSearch takeID={this.state.id}/>)}></Routes> */}
            </div>
        )
       
    }
}

export default SideBar
