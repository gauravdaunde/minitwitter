import React, { Component } from 'react'
import axios from 'axios'
import Small_logo from "./images/Small_logo.jpg"
import "./timeline.css"
import history from '../history'
import TwitterLogo from  "./images/twitter.png"
import SideBar from './SideBar'
import UniversalSearch from './UniversalSearch'
import Parent from './Parent'
import Routes from '../Routes'

 class timeline extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userdata:[],            
             Content:[],
             Error:"",
             username:"",
             error_message:"",
             message:"",
             content:"",
           //  id:this.props.match.params.id
             id:this.props.id.id,
             //follow:"",
        }
        // console.log("timelineData",this.state.data)
    }
    
    Tweetcreate=()=>{
        const {id}=this.state
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token")
        }
       
          axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/",
          {"content":this.state.content}).then(response=>{
        console.log(response);
        if(response.status="200"){
            this.setState({tweets:response.data})

        }
        
          }).catch(error=>{
              if(error.response.status="400")
              this.setState({message:error.response.data["content"]})
                  console.log(error.response);
          })
    }
    tweetwrite=(event)=>{
        this.setState({content:event.target.value})
    }
    componentDidMount(){
        const {id}=this.state
       axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token") 
       }
        axios.get("http://127.0.0.1:8000/minitwitter/tweets/timeline/").then(response=>{
            console.log(response);
            if(response.status="200"){
                this.setState({Content:response.data})
            }
            if(response.status="204"){
                this.setState({error_message:"Zero Tweets Found"})
               
            }

        }).catch(error=>{
            if(error.response.status="401"){
                this.setState({Error:error.response.data["message"]})
            }
           
        })
       
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token")
        }
        axios.get("http://127.0.0.1:8000/minitwitter/user/logged-in/").then(response=>{
            console.log("logged id",response)
             const userData=response.data
             
             this.props.userdata(userData)

        }).catch(error=>{
            console.log(error.response)
        })
      
    }
   
    showprofile=(userid)=>{
        history.push("/minitwitter/UserProfile/"+userid);
        
    }

    
   
    render() {
        const {Content,Error,error_message,username,message,content,query,userdata,follow}=this.state
        return (
            <div>
              
            <div className="rightpart">
           
            <div className="homestyle">Home</div>
            <div className="BottomPart"> </div>
           <div><i class="fa fa-user-circle"></i> </div> 
           <textarea value={content} onChange={this.tweetwrite}  className="textareastyle" placeholder="What's happening" ></textarea> 
          
           <button onClick={this.Tweetcreate} className="timelinetweetbtn" type="submit"  >Tweet</button>
           
           <div className="error_message">{message} </div> 
            
            <div className="BottomPart2">  </div>
           
            <br/>
             
                        
          <div className="timeline">{Content.length? Content.map(con=> <div key={con.user.id} className="Tofocus" >
          
          <div className="timelineuserstyle"><i class="fa fa-user-circle"></i> </div>
          <div className="timelinetext1">
        <a className="anchor" onClick={()=>this.showprofile(con.user.id)}>
            {con.user.first_name} {con.user.last_name} @{con.user.username}</a>
             </div> 
        
        <div className="contentstyle">{con.content}</div>
           
           <div className="bottomline"></div>
           </div>
           ):null}
           </div>
       
     </div> 
          
            <UniversalSearch ID={this.state.id} ></UniversalSearch>
            
     
            </div>
        )
    }
}

export default timeline
