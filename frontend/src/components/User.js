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

class User extends Component {
    
    constructor(props) {
        super(props)
   
        this.state = {
             error_Message:"",
             bio:"",   
             token:localStorage.getItem("token"),
             UserInfo:"",
             followers:[],
             following:[],
             q:"",
             Searchdata:[],
             UsersTweets:[]
             
            
        }

       
        
    }
    

    
    changeUserName=(event)=>{
        this.setState({
            username:event.target.value
        })
    }
    changeUserBio=(event)=>{
        this.setState({
            bio:event.target.value
        })
    }


    componentDidMount(){
       
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
      const otheruserid=this.props.match.params.id
       axios.get("http://127.0.0.1:8000/user/profile/",{params:{"id":otheruserid}}).then(response=>{
           if(response.status="200"){
               this.setState({
                   UserInfo:response.data["user"],
                   bio:response.data["bio"],
                   followers:response.data["followers"],
                   following:response.data["following"]

                })
                // const storeId=response.data.user["id"];
                // localStorage.setItem("id",storeId);
              
           }

           console.log(response)
       }).catch(error=>{
           console.log(error.response);
       })
       
       axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
    const storeid=localStorage.getItem("id")
    axios.get("http://127.0.0.1:8000/user/"+otheruserid+"/tweets/").then(response=>{
        console.log(response);
        if(response.status="200"){
           this.setState({UsersTweets:response.data})
    
        }
        
          }).catch(error=>{
              if(error.response.status="400")
            //  this.setState({message:error.response.data["content"]})
                  console.log(error.response);
          })

    }
   
   

    render() {
        const {UserInfo,bio,followers,following,UsersTweets}=this.state
        return (
            <div>
            <SideBar></SideBar>
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
        <div onChange={this.changeUserName} className="styleofFL" >
            <text className="user">@{UserInfo.username}</text>
            </div> 
            
            <div  onChange={this.changeUserBio} >
                <text className="userbio">{bio}</text></div> 
                <br/><br/>
               
            <div>
            <text className="followersCount">{followers.length} Followers</text>
            </div>
           
           <div > <text className="followingCount" > {following.length} Following</text></div>
           <br/><br/><br/>
           <button className="tweetbtnofprofile" >Tweets</button>
           <hr className="profilehr"></hr>
           <div className="timeline">
        {UsersTweets.length? UsersTweets.map(tweet=><div key={tweet.id} className="Tofocus" >
        <div className="timelineuserstyle">
            <i class="fa fa-user-circle"></i> 
            </div><div className="timelinetext1">{tweet.first_name} {tweet.last_name}  @{tweet.username}</div> 
       <div className="contentstyle">{tweet.content}</div><div className="bottomline"></div></div>):"Zero tweets"}</div>
           
             </div>
             </div>

           
            <UniversalSearch></UniversalSearch>


             </div>
        )
    }
}

export default User
