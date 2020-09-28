import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import "../Followings/followings.css"
import history from "../../history"
import Searchbar from "../Searchbar/searchbar"
class followings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             followings:[],
             id:this.props.userdata.id,
             followers:[],
             first_name:this.props.userdata.first_name,
             last_name:this.props.userdata.last_name,
             username:this.props.userdata.username,
             isFollowings:false
        }
    }
    componentDidMount(){
        const{id}=this.state

            obj.followingsApi(id).then(response=>{
                console.log("infollowings",response)
               this.setState({
                   followings:response
               })
               
            })  


            obj.followersApi(id).then(response=>{
                console.log("infollowers",response)
                this.setState({
                    followers:response
                })
            })

    }
    unFollow=(id,followingid)=>{
        obj.unfolloApi(id,followingid).then(response=>{
            if(response=="204"){
                console.log("unfollow",response)
                history.push("/minitwitter/timeline")
            }
            
        })
    }
    toggleHandler=()=>{
        this.setState({
            isFollowings:!this.state.isFollowings
        })
    }
    
    followOtherUsers=(followuserid,followfield)=>{
        const{id}=this.state
        const storefield={
            follow:followfield,
            followid:followuserid
        }
       // console.log("FollowField",storefield.follow)
       if(storefield.follow===false){
        obj.followusersApi(id,storefield.followid).then(response=>{
           history.push("/minitwitter/followings")
        })
       }
       else if(storefield.follow===true){
           obj.followusersApi(id,storefield.followid).then(response=>{
               console.log("Response",response)
               this.setState({
                   error_message:response
               })
           })
       }
    }



    render() {
        const{followings,followers,id,first_name,username,last_name,isFollowings,error_message}=this.state
        console.log("list",followings,isFollowings)
        return (
            <div>
                <div className="rightpart">
        
        <div className="homestyle">{first_name} {last_name}</div>
            <div className="DF_username">@{username}</div>

            <button className="DF_followingsbtn" onClick={this.toggleHandler}>Followings</button>
      <button className="DF_Followersbtn" onClick={this.toggleHandler}>Followers</button>
                <hr className="DE_hr"></hr>

         { isFollowings? followings.length>0?
                followings.map
                (data=><div key={data.following.id} className="Tofocus"> <div className="timelineuserstyle"> 
                <i class="fa fa-user-circle"></i></div > <div className="DF_firstName">
            {data.following.first_name} {data.following.last_name}</div>
            <div className="DF_user_name"> @ {data.following.username}</div>
            
            <div><button onClick={this.unFollow.bind(this,id,data.id)} 
            className="btnchange">Unfollow</button></div>
            <div className="bottomline"></div> </div>):<center><h2>Zero Followings</h2></center>:

                followers.length>0? 
                
                followers.map(followersdata=><div key={followersdata.follower.id} className="Tofocus">
                   <div className="timelineuserstyle"> 
               
                <i class="fa fa-user-circle"></i></div > <div className="DF_firstName"> {followersdata.follower.first_name} 
                   
                {followersdata.follower.last_name}</div><div className="DF_user_name">@{followersdata.follower.username}</div>
                
                <button className="btnchange"  
           onClick={()=>this.followOtherUsers(followersdata.follower.id,followersdata.follower.follow)}>
          
            {followersdata.follower.follow==true?"Following":"Follow"}</button> 
           
            <div className="DF_user_name"> {error_message}</div>
                
                
                
                
                <div className="bottomline"></div> </div>):<center><h2>Zero Followers</h2></center>}
            
            </div>
            <Searchbar id={id}/>
            </div>
        )
    }
}

export default followings
