import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import history from '../../history'
import Routes from '../Routes'
import TwitterLogo from "../../images/twitter.png"
class sidebar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            userdata:"",
            isbtnClicked:false,
            id:this.props.userdata.id
        }
        console.log("propsside",this.state.id)
       
    }
    componentDidMount(){
    
            obj.getuserIdApi().then(response=>{
                console.log("Routes",response)
                this.setState({
                    userdata:response
                },()=>console.log("Callback func",this.state.id))
               
                this.props.setuserdata(this.state.userdata)
            })
            console.log("Outside",this.state.id)
            this.setState({
                isbtnClicked:!this.state.isbtnClicked
            })
           
         
    }
    
    logOut=()=>{
        localStorage.removeItem("token")
        history.push("/minitwitter/login")
    }
   

    render() {
        const{id}=this.state
        return (
            <div>
                  <div className="leftpart">
            <button className="change homebutton" onClick={()=>{history.push("/minitwitter/timeline/")}}><i class="fa fa-home"></i>Home</button>
            <div className="twitter_logo"><img src={TwitterLogo} ></img></div>  
            <br/>
            <br/>
            <br/>
            <br/>
            <button className="change followersbutton" 
            onClick={()=>{history.push("/minitwitter/followers/")}}>
                <i class="fa fa-user-friends">
            </i>Followers</button>
            <br/>
            <br/>
          
          <button className="change followingbutton" 
           onClick={()=>{history.push("/minitwitter/followings/")}}>
               <i class="fa fa-user-plus" ></i>Following</button>
            <br/>
            <br/>
           <button className="change profilebutton"
            onClick={()=>{history.push("/minitwitter/userprofile/"+id)}}>  
         <i class="fa fa-user"></i>Profile</button>
            <br/>
            <br/>
            <button className="tweetbutton" onClick={()=>history.push("/minitwitter/tweets/")}>Tweet</button>
           
            <button type="button"  className="buttonstyle" onClick={this.logOut} >LogOut</button>
            </div>  
                {/* <button onClick={()=>{history.push("/minitwitter/userprofile")}}>Profile</button>
                <button onClick={()=>{history.push("/minitwitter/timeline")}}>timeline</button> */}
            </div>
        )
    }
}

export default sidebar
