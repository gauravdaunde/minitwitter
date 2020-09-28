import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import "../Edit/edit.css"
import history from "../../history"
class edit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           id:this.props.userdata.id,
           first_name:this.props.userdata.first_name,
           last_name:this.props.userdata.last_name,
           username:this.props.userdata.username,
           userInfo:"",
           bio:"",
           selectedFile:null,
           error_message:""
        }
    }
    
   componentDidMount(){
       const{id,userInfo}=this.state
        obj.userprofileApi(id).then(response=>{
            this.setState({
                userInfo:response,
            })
         })
   }
   changeHandler=(event)=>{
       this.setState({
        bio:event.target.value,
      
       })
   }
   saveData=(id,bio)=>{

    const formdata=new FormData();
    formdata.append("profile_image",this.state.selectedFile,this.state.selectedFile.name)
    formdata.append("bio",this.state.bio)
    obj.imageUpload(id,formdata).then(response=>{
        console.log("edit",response)
        if(response=="200"){
            history.push("/minitwitter/userprofile")
        }
        else if(response[1]=="400"){
            this.setState({
                error_message:response[0]
            })
        }
    })
   }
   fileSelectedHandler=(event)=>{
    this.setState({
        selectedFile:event.target.files[0]
    },()=>console.log("Selectedfile in callback",this.state.selectedFile))
  }
  

    render() {
        const{userInfo,id,bio,first_name,last_name,username,error_message}=this.state
        return (
            <div>
                <div className="rightpart">
            <div className="homestyle">{first_name} {last_name}</div>
         <div className="DF_username">@{username}</div>
          <div className="BottomPart"> </div>

            <div className="editheading">Edit Profile </div>
            <button onClick={this.saveData.bind(this,id,bio)} type="submit" className="savebutton" >Save</button>
            <div className="BottomPart"> </div>
            <form  className="editform">
          <div className="labelstyle1"><label>First Name</label></div>
              <div className="inputstyle1">  <input type="text"  value={first_name}  placeholder="Change FirstName" required ></input></div> 
              <br/>
            <br/>
          <div className="labelstyle1"><label>Last Name</label></div>
              <div className="inputstyle1"> <input type="text"  value={last_name} placeholder="Change LastName" required></input></div> 
            <br/>
            <br/>
              <div className="labelstyle1"><label>Bio</label></div>
               
               <div className="inputstyle1"> <input type="text"  value={bio} onChange={this.changeHandler} placeholder="Change UserBio" ></input></div>
               <div className="error_message">{error_message}</div>
               <br/>
               <br/>
               <img src={userInfo.profile_image} className="fileselector"></img>
               <br/>
               <br/>
                 <input type="file" onChange={this.fileSelectedHandler} ></input> 
                <br/>
                <br/>
            </form>

           </div>
            </div>
        )
    }
}

export default edit
