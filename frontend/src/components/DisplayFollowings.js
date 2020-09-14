import React, { Component } from 'react'
import axios from 'axios'
import Small_logo from "./images/Small_logo.jpg"
import history from '../history'
import "./showfollowings.css"
import TwitterLogo from  "./images/twitter.png"
import SideBar from './SideBar'
import UniversalSearch from "./UniversalSearch"
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

class DisplayFollowings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            following:[],
            error_message:"",
            followers:[],
            // id:localStorage.getItem("id"),
            id:this.props.userdata.id,
            first_name:this.props.userdata.first_name,
            last_name:this.props.userdata.last_name,
            username:this.props.userdata.username,
            isFollowings:true

        }
       
        console.log("Followings props",this.props)
    }
    toggleHandler=()=>{
        this.setState({
            isFollowings:!this.state.isFollowings
        })
    }
    componentDidMount(){
    const{id}=this.state
    axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
       axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/").then(response=>{
           if(response.status="200"){
               this.setState({
                   following:response.data
                })
              
           }
            console.log("Followings",response)
       }).catch(error=>{
           console.log(error.response);
       })
       axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token")
    }
    axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/followers/").then(response=>{
        console.log("Followers",response)
        this.setState({
            followers:response.data
        })
        console.log("Followers0",response.data[0]["follower"])
    }).catch(error=>{
        console.log(error.response)
     })
      

    }
   
    
   unfollow=(unfollouser)=>{
       const {id}=this.state
    const obj={
        userid:unfollouser
    }
    axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
    axios.delete("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/"+obj.userid).
    then(response=>{
        console.log(response)
    }).catch(error=>{
        console.log(error.response);
    })
      
       history.push("/minitwitter/Timeline")
    }
  
   showprofile=(userid)=>{
    history.push("/minitwitter/UserProfile/"+userid+"/");
       
   }

          
   followusers=(followfield,userid)=>{
    const{id}=this.state
    const obj={
        follow:followfield,
        id:userid
    }
    axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
    }
    console.log(obj.id);
    console.log(obj.follow);
    if(obj.follow==false){ 
    axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",{"following_id":obj.id})
        .then(response=>{
            console.log("Follow",response)
        }).catch(error=>{
            console.log(error.response);
        })
    }
    else if(obj.follow==true){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
        axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/", 
        {"following_id":obj.id}).then(response=>{
            console.log(response)
            history.push("/minitwitter/Timeline")
        }).catch(error=>{
            this.setState({error_message:error.response.data})

           // history.push("/minitwitter/followers/")
        })
    }
    
    }
   
    render() { 
        const{following,first_name,last_name,username,followers,error_message,isFollowings}=this.state
      return   (
        <div>
        <div className="rightpart">
        
        <div className="homestyle">{first_name} {last_name}</div>
            <div className="DF_username">@{username}</div>
    
      <button className="DF_followingsbtn" onClick={this.toggleHandler}>Followings</button>
      <button className="DF_Followersbtn" onClick={this.toggleHandler}>Followers</button>
                <hr className="DE_hr"></hr>
    
       
          
      { isFollowings? following.length ? following.map(follow=><div key={follow.following.id} 
      className="Tofocus"> 
    <div className="timelineuserstyle"> 
    <i class="fa fa-user-circle"></i></div>
     <a className="anchor" onClick={()=>this.showprofile(follow.following.id)}>

        <div className="DF_firstName">{follow.following.first_name} 
        
        {follow.following.last_name}</div></a>
        {/* <Link className="anchor" to={"/minitwitter/UserProfile/"+(follow.following.id)+"/"}> 
        <div className="DF_firstName">{follow.following.first_name} 
        
        {follow.following.last_name}</div></Link> */}
   
        <div className="DF_user_name">@{follow.following.username}</div>
   
        <button className="btnchange"  
        onClick={()=>this.unfollow(follow.id)} >Unfollow</button>
        <div className="bottomline"></div></div>):<center><h2>Zero Followings</h2></center>:
    
        followers.length ? followers.map(Follow=><div key={Follow.follower.id} className="Tofocus"> 
        <div className="timelineuserstyle"> 
        
        <i class="fa fa-user-circle"></i></div>
        
        <a className="anchor" onClick={()=>this.showprofile(Follow.follower.id)}>

            <div className="DF_firstName">{Follow.follower.first_name} {Follow.follower.last_name}
            </div></a>
        
        <div className="DF_user_name">@{Follow.follower.username}</div>
        
        <button className="btnchange"  
        onClick={()=>this.followusers(Follow.follower.follow,Follow.follower.id)}>
          
            {Follow.follower.follow==true?"Following":"Follow"}</button> 
           
            <div className="DF_user_name"> {error_message}</div>
      
       <div className="bottomline"></div></div>):<center><h2>Zero Followers</h2></center>}

       </div>
       <UniversalSearch ID={this.state.id}></UniversalSearch>
       
        </div>
       
        
    )
             
}
}

export default DisplayFollowings
