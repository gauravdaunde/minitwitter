import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import history from "../../history"
import "../Tweet/tweet.css"
import Searchbar from "../Searchbar/searchbar"
 class Tweet extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              content:"",
              id:this.props.userdata.id,
              usertweets:[],
              first_name:this.props.userdata.first_name,
              last_name:this.props.userdata.last_name,
              username:this.props.userdata.username,
              error_message:""
         }
     }
     changeHandler=(event)=>{
         this.setState({
            content:event.target.value
         })
     }
     tweetCreate=(id,content)=>{
        
        obj.tweetsApi(id,content).then(response=>{
            console.log(response)
            if(response=="201"){
                history.push("/minitwitter/timeline")
            }
           else if(response[1]=="400"){
                this.setState({
                    error_message:response[0]
                })
            }
        })

        
     }
     componentDidMount(){
         const{id}=this.state
         obj.tweetgetApi(id).then(response=>{
            this.setState({
                usertweets:response
            })
         })
     }
     deleteTweet=(id,tweetid)=>{
        obj.deletetweetApi(id,tweetid).then(response=>{
            console.log("delete",response)
            if(response=="204"){
                  history.push("/minitwitter/timeline")
            } 
        })
      
     }

     

    render() {
        const{content,id,usertweets,first_name,last_name,username,error_message}=this.state
        return (
            <div>
                <div className="rightpart">
            <div className="homestyle">{first_name} {last_name}</div>
         <div className="DF_username">@{username}</div>
           <div className="BottomPart"> </div>
         
         <div><i class="fa fa-user-circle"></i> </div> 
        
         <textarea value={content} onChange={this.changeHandler}  
        className="textareastyle" placeholder="What's happening"></textarea> 
            
        <button onClick={this.tweetCreate.bind(this,id,content)} 
        className="timelinetweetbtn" type="submit">Tweet</button>
        <div className="error_message">{error_message} </div> 
        <div className="BottomPart2">  </div>
             
             <br/>
        

             <div className="timeline">
        
        {usertweets===undefined ||usertweets.length===0?<center><h2>Zero Tweets</h2></center> :usertweets.map(tweets=><div key={tweets.id} className="Tofocus" >
        <div className="timelineuserstyle">
            <i class="fa fa-user-circle"></i> 
     </div><div className="timelinetext1">{tweets.user.first_name} {tweets.user.last_name}  @{tweets.user.username}</div> 
     <a className="anchor"><i className="fa fa-trash" onClick={this.deleteTweet.bind(this,id,tweets.id)}>
         </i></a>
       <div className="contentstyle">{tweets.content}</div> 
      <div className="bottomline"></div></div>)}</div>

            </div>
            <Searchbar id={id}></Searchbar>
            </div>
        )
    }
}

export default Tweet
