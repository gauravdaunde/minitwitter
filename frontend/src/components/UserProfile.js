import React, { Component } from 'react'
import './Userprofile.css'
// import Logo from './images/logo.jpg'
import axios from 'axios'
//import history from '../history'
import Usericon from "./images/User_icon.jpg"
import Usericon2 from "./images/User_icon2.jpg"
import Small_logo from "./images/Small_logo.jpg"
import "./Mainpage.css"
import history from '../history'
import SideBar from './SideBar'
import UniversalSearch from './UniversalSearch'

class UserProfile extends Component {
    
    constructor(props) {
        super(props)
   
        this.state = {
             error_Message:"",
             UserInfo:"",
             followers:"",
             following:"",
             UsersTweets:[],
             //id:localStorage.getItem("id")
            //userid:this.props.userdata.id,
           userid:this.props.match.params.id

             
            
        }
        console.log("Userprofileprops",this.props)
       
        
    }
    



    componentDidMount(){
        const {userid}=this.state
       
    //     const username=this.props.match.params.username
    //     axios
    //     .post("http://127.0.0.1:8000/profile/",{"username":username,"token":this.state.token})
    //     .then(response=>{
    //     console.log(response);
    //     if(response.status="200"){
    //         this.setState({first_name:response.data["first_name"],
    //                        last_name:response.data["last_name"],
    //                        username:response.data["username"],
    //                        user_bio:response.data["user_bio"],
    //                        following_count:response.data["following_count"],
    //                        followers_count:response.data["followers_count"]

           
    //        })
           
    //     }
       
        
    // }).catch(error=>{
    //    if(error.response.status="400"){
    //         this.setState({error_Message:error.response.data["message"]});
    //         console.log(error.response);
    //     }
      
    // })
   
    
           
        

    axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
      //userid=this.props.match.params.id
    // console.log(userid)
       axios.get("http://127.0.0.1:8000/minitwitter/users/"+userid+"/profile/",).then(response=>{
          
           if(response.status="200"){
               this.setState({
                   UserInfo:response.data["user"],
                   bio:response.data["bio"],
                   followers:response.data["followers"],
                   following:response.data["followings"]

                })
               
           }

           console.log(response)
       }).catch(error=>{
           console.log(error.response);
       })
       
       axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
   
    axios.get("http://127.0.0.1:8000/minitwitter/users/"+userid+"/tweets/").then(response=>{
       
        if(response.status="200"){
           this.setState({UsersTweets:response.data})
        }
        console.log("TweetGEt",response.data);
          }).catch(error=>{
              if(error.response.status="400")
                  console.log(error.response);
          })

    }
   
   

    render() {
        const {UserInfo,bio,followers,following,UsersTweets}=this.state
        return (
            <div>
                
            <div className="rightpart">
    
        <div className="homestyle">{UserInfo.first_name} {UserInfo.last_name}</div> 
       <div className="noOftweets">{UsersTweets.length} Tweets</div> 
        
            <div className="BottomPart"> </div>
             <div className="graydiv"></div>
             <div class="circle"><img src={Usericon} className="userstyle"></img></div>
             
           <div className="showprofilediv">
           
        <div onChange={this.changeFirstName} onChange={this.changeLastName} className="styleofFL" >
        <text className="firstName_lastName" >{UserInfo.first_name} {UserInfo.last_name}</text>
           
            </div> 
            <button type="button" className="editbutton" 
            onClick={()=>history.push("/minitwitter/Edit/")}>
                Edit Profile</button><br/>
        
        <div onChange={this.changeUserName} className="styleofFL" >
            
            <text className="user">@{UserInfo.username}</text>
            
            </div> 
            
            <div  onChange={this.changeUserBio} >
                <text className="userbio">{bio}</text></div> 
                <br/><br/>
               
            <div>
            <text className="followersCount">{followers} Followers</text>
            </div>
           
           <div > <text className="followingCount">{following} Following</text></div>
           <br/><br/><br/>
          
           <button className="tweetbtnofprofile" >Tweets</button>
           
           <hr className="profilehr"></hr>
           
           <div className="timeline">
        
        {UsersTweets.length? UsersTweets.map(tweet=><div key={tweet.user.id} className="Tofocus" >
        
        <div className="timelineuserstyle">
           
            <i class="fa fa-user-circle"></i> 
           
            </div><div className="timelinetext1">{tweet.user.first_name} 
            {tweet.user.last_name}  @{tweet.user.username}</div> 
       
       <div className="contentstyle">{tweet.content}</div>
       
       <div className="bottomline"></div></div>):"Zero tweets"}</div>
           
             </div>
             </div>

           
            <UniversalSearch ID={this.state.userid}></UniversalSearch>


             </div>
        )
    }
}

export default UserProfile
