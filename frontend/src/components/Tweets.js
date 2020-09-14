import React, { Component } from 'react'
import axios from 'axios'
import Small_logo from "./images/Small_logo.jpg"
import './tweet.css'
import history from '../history'
import TwitterLogo from  "./images/twitter.png"
import SideBar from './SideBar'
import UniversalSearch from './UniversalSearch'

class Tweets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            content:"",
            message:"",
            userdata:[],
             UserInfo:"",
            UsersTweets:[],
            id:this.props.userdata.id,
            first_name:this.props.userdata.first_name,
            last_name:this.props.userdata.last_name,
            username:this.props.userdata.username

        
          
        }
       // console.log("Tweet",this.props.id)
       // console.log("ALLDATA",this.state.id.first_name)
       console.log("TWEET props",this.props)
    }
  
    tweetcreate=()=>{
        const {id}=this.state
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token")
        }
       
        //const storeid=localStorage.getItem("id")
          axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/",
          {"content":this.state.content}).then(response=>{
        console.log(response);
          }).catch(error=>{
              if(error.response.status="400")
              this.setState({message:error.response.data["content"]})
                  console.log(error.response);
          })
         
    }
    Changetweetinput=(event)=>{
        this.setState({
            content:event.target.value
        })
         
    }
    
    
    componentDidMount(){
        const {id}=this.state
    
       axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token")
    }
   
      axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/").then(response=>{
       console.log(response);
      if(response.status="200"){
       this.setState({UsersTweets:response.data}) 
     }
    
      }).catch(error=>{
          if(error.response.status="400")
              console.log(error.response);
      })
        
       
    }
   

  
   
  
    render() {
        const {content,message,UsersTweets,first_name,last_name,username}=this.state
        return (
            <div>
                 
            <div className="rightpart">
            <div className="homestyle">{first_name} {last_name}</div>
         <div className="DF_username">@{username}</div>
         <div className="BottomPart"> </div>
           
           
             <div><i class="fa fa-user-circle"></i> </div> 
               <textarea value={content} onChange={this.Changetweetinput} className="tweettextarea" placeholder="What's happening"></textarea> 
              <br/>
            <button className="tweet_tweetbtn" type="submit" onClick={this.tweetcreate}  >Tweet</button>
            <div className="error_message">{message} </div> 
            <br/>
            <br/>
           <div className="BottomPart2">  </div>

            <div className="timeline">
        
        {UsersTweets.length? UsersTweets.map(tweet=><div key={tweet.user.id} className="Tofocus" >
        <div className="timelineuserstyle">
            <i class="fa fa-user-circle"></i> 
     </div><div className="timelinetext1">{tweet.user.first_name} {tweet.user.last_name}  @{tweet.user.username}</div> 
       
       <div className="contentstyle">{tweet.content}</div><div className="bottomline"></div></div>):"Zero tweets"}</div>
      
    
      </div>    
                    <UniversalSearch ID={this.state.id}></UniversalSearch>
     </div>
        )
    }
}

export default Tweets
