import React, { Component } from 'react'
import axios from 'axios'
import Small_logo from "./images/Small_logo.jpg"
import "./edit.css"
import history from '../history'
import TwitterLogo from  "./images/twitter.png"
import SideBar from './SideBar'
import UniversalSearch from './UniversalSearch'

class Edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bio:"",
             user_bio:"",
             username:"",
             savemessage:"",
             error_message:"",
             userdata:[],
             UserInfo:"",
             id:this.props.userdata.id
            
        }
    }
    componentDidMount(){
        const {id}=this.state
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
           
           axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/profile/").then(response=>{
               if(response.status="200"){
                   this.setState({
                       UserInfo:response.data["user"],
                       bio:response.data["bio"]
                      

                    })
                    
                  
               }
    
               console.log(response)
           }).catch(error=>{
               console.log(error.response);
           })
   
    
     }
    savedata=()=>{
       const {id}=this.state
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
     axios.patch("http://127.0.0.1:8000/minitwitter/users/"+id+"/profile/",
     {"bio":this.state.bio}).then(response=>{
         console.log("Edit",response);
         this.setState({savemessage:response.data["message"]})
         history.push("/minitwitter/UserProfile/"+id)
         
     }).catch(error=>{
         if(error.response.status="400")
         console.log("Edit",error.response);
         this.setState({error_message:"This field may not be blank"})
     })
    

     
    }
   
    userbiochange=(event)=>{
        this.setState({bio:event.target.value})
    }
    
    render() {
        const{first_name,last_name,bio,username,error_message,UserInfo}=this.state
        return (
            <div>
            <div className="rightpart">
            <div className="homestyle">{UserInfo.first_name} {UserInfo.last_name}</div>
         <div className="DF_username">{UserInfo.username}</div>
         <div className="BottomPart"> </div>
             
            <div>
            <div className="editheading">Edit Profile </div>
            <button onClick={this.savedata} type="submit" className="savebutton" >Save</button>
            <div className="BottomPart"> </div>
              <form  className="editform">
                 <div className="labelstyle1"><label>First Name</label></div>
              <div className="inputstyle1">  <input type="text"  value={UserInfo.first_name}  placeholder="Change FirstName" required ></input></div>
                <br/>
                <br/>
                <div className="labelstyle1"><label>Last Name</label></div>
              <div className="inputstyle1"> <input type="text"  value={UserInfo.last_name} placeholder="Change LastName" required></input></div> 
                <br/>
                <br/>
                <div className="labelstyle1"><label>Bio</label></div>
               
               <div className="inputstyle1"> <input type="text"  value={bio} onChange={this.userbiochange} placeholder="Change UserBio" ></input></div>
               <div className="messagestyling">{error_message}</div>
                <br/>
                <br/>
        
                </form>
                
            </div>
            </div>
            <UniversalSearch ID={this.state.id}></UniversalSearch>
            </div>
        )
    }
}

export default Edit
