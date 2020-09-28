import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import "../UserProfile/userprofile.css"
import Usericon from "../../images/User_icon.jpg"
import history from "../../history"
import "../../components/Centerpart.css"
import "../Timeline/timeline.css"
import Searchbar from "../Searchbar/searchbar"
class UserProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:this.props.match.params.id,
            // first_name:this.props.userdata.first_name,
            // last_name:this.props.userdata.last_name,
            // username:this.props.userdata.username,
             userinfo:"",
             otherinfo:"",
             usertweets:[],
             bio:"",
             profile_image:""
             

        }
        console.log("props",this.props)
    }
     
    componentDidMount(){
        const{id}=this.state
        obj.userprofileApi(id).then(response=>{
            console.log("userinfo",response)
            console.log("otherinfo",response)
               this.setState({
                   userinfo:response
               },()=>console.log("incallback",this.state.userinfo)) 
              this.setState({
                otherinfo:response.data
              },()=>console.log("incallback2",this.state.otherinfo)) 
        })

        obj.tweetgetApi(id).then(response=>{
            this.setState({
                usertweets:response
            })
        })

        
    }
    

    render() {
        const{id,userinfo,followers,first_name,last_name,username,usertweets,otherinfo}=this.state
        console.log("render",userinfo.user)
        return (
            <div>
                
              <div className="rightpart">
           {userinfo.user===undefined?null:
           <div className="homestyle">{userinfo.user.first_name} {userinfo.user.last_name}</div> }
            
        {/* <div className="homestyle">{userinfo.user.first_name} {otherinfo.last_name}</div>  */}
       <div className="noOftweets">{usertweets===undefined||usertweets.length===0?"0":usertweets.length} Tweets</div> 
        
            <div className="BottomPart"> </div>
             <div className="graydiv"></div>
             <div class="circle"><img src={userinfo.profile_image} className="userstyle"></img></div>
             
           <div className="showprofilediv">
           
        <div className="styleofFL" >
        <text className="firstName_lastName">
            {userinfo.user===undefined?null:userinfo.user.first_name} 
            {userinfo.user===undefined?null:userinfo.user.last_name}</text>
           
            </div> 
            <div  className="styleofFL" >
            
            <text className="user">@{userinfo.user===undefined?null:userinfo.user.username}</text>
            
            </div> 
            <button type="button" className="editbutton" 
            onClick={()=>history.push("/minitwitter/edit/")}>
                Edit Profile</button><br/>
        
        
            
            <div  className="userbio">{userinfo.bio}</div> 
                <br/>
               
            <div>
            <text className="followersCount">{userinfo.followers} Followers</text>
            </div>
           
           <div > <text className="followingCount">{userinfo.followings} Following</text></div>
           <br/>
          
            <button className="tweetbtnofprofile">Tweets</button>
           
           <hr className="profilehr"></hr>
           
           <div className="timeline">
        
       {usertweets===undefined || usertweets.length===0?<center><h2>Zero Tweets</h2></center>: usertweets.map(tweets=>
        <div key={tweets.id} className="Tofocus">
            <div className="timelineuserstyle"> <i class="fa fa-user-circle"></i> </div> 
            <div className="timelinetext1">{tweets.user.first_name} {tweets.user.last_name} @{tweets.user.username}</div>
            <div className="contentstyle">{tweets.content}</div><div className="bottomline"></div></div>) }</div>

     
       </div>
           
             </div>
             <Searchbar id={this.state.id} />
             </div>

           
           


            
            
        )
    }
}

export default UserProfile
