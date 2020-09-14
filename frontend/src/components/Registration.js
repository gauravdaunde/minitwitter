import React, { Component } from 'react'
import './signup.css'
import TwitterLogo from  "./images/twitter.png"
import axios from 'axios'
import {BrowserRouter, Link, Switch, Route ,Redirect} from 'react-router-dom';
import Formcomponent from './Formcomponent';
import history from '../history'
import Routes from '../Routes';

class Registration extends Component {
    // check(){
    // var takeFN=document.getElementById("firstname");
    // var takeLN=document.getElementById("lastname");
    // var takeUN=document.getElementById("username");
    // var takePass=document.getElementById("password");
    // if(takeFN.value==""&&takeLN.value==""&& takeUN.value==""&&takePass.value==""){
    //     document.getElementById("blankpass").style.visibility="visible";
    //     document.getElementById("blankUN").style.visibility="visible";
    //     document.getElementById("lastLN").style.visibility="visible";
        
    // }
    //    if(takePass.value==""){
    //     document.getElementById("blankFN").style.visibility="visible";
    //    }
    //    else if(takePass.value.trim().length<5){
    //        document.getElementById("showERR").style.visibility="visible";
    //     }
    // } 
    
   
    constructor(props) {
        super(props)
      
        this.state = {
             first_name:'',
             last_name:'',
             username:'',
             password:'',
            error_message:'',
            
            
        }
    }
    
    changeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    submithandle=(event)=>{
        axios.post("http://127.0.0.1:8000/minitwitter/users/",this.state).then(response=>{
            console.log(response);
            const id=response.data["id"]
            console.log("Registrationid",id)
            this.props.setId(id)
           
           
                axios.post("http://127.0.0.1:8000/minitwitter/user/login/",this.state).then(response=>{
                    console.log("logintoken",response)
                    if(response.status="200"){

                        const store=response.data["token"];
                        localStorage.setItem("token",store);
                    }
                }).catch(error=>{
                    console.log(error.response)
                })
               
                alert("Hello "+this.state.username);

                history.push("/minitwitter/Timeline/")

            
        }).catch(error=>{
            console.log(error.response)
            if(error.response.status="400"){
                this.setState({error_message:error.response.data["username"]})
                {history.push("/minitwitter/Registration")}
            }
            
           
        })
    
        
    
        event.preventDefault()
    }
    
    render() {
        
        const {first_name,last_name,username,password}=this.state
        return (
            <div className="container">
               
                <div className="animation">
               
                <center> <img src={TwitterLogo} /></center>
                 
                 <h2><b>Create your account for Mini-Twitter</b></h2>
                
                 <br></br>
                   <form onSubmit={this.submithandle} >
                   
                   <div className="labelstyle1"><label>First Name</label></div>
                  
                   <div className="inputstyle1"><input type="text" name="first_name" id="firstname" 
                   value={first_name} onChange={this.changeHandler} required ></input></div>
                  
                   <label id="blankFN" style={{color:"red",visibility:"hidden"}}>
                       <strong>No blanks are allowed</strong></label>
                   
                 
                      <br></br>
                      <div className="labelstyle1" ><label>Last Name</label></div> 
                     
                      <div className="inputstyle1"><input type="text"name="last_name"
                       id="lastname"value={last_name} onChange={this.changeHandler} required >
                       </input></div>
                      
                      <label id="lastLN" style={{color:"red",visibility:"hidden"}}>
                       <strong>No blanks are allowed</strong></label>
                      <br></br>
                      
                     <div className="labelstyle1" ><label>UserName</label></div> 
                      
                    <div className="inputstyle1"><input type="text"
                     name="username"id="username" value={username}onChange={this.changeHandler} required >
                    </input></div>
                      
                    <label id="blankUN" style={{color:"red",visibility:"hidden"}}>
                    <strong>No blanks are allowed</strong></label>
                    <br ></br>
                    
                    <div className="labelstyle1"><label>Password</label></div> 
                    
                    <div className="inputstyle1"><input type="password" name="password" value={password} onChange={this.changeHandler} id="password" required ></input></div>
                     
                    <label id="blankpass" style={{color:"red",visibility:"hidden"}}>
                        <strong>No blanks are allowed</strong></label>
                      
                      <label id="showERR" style={{color:"red",visibility:"hidden"}}>
                          <strong>Password Must Be Greater than 5</strong></label>
                      <br></br>
                    
                   
                     {<div><strong>{this.state.error_message}</strong></div>}
                    <button onClick={this.check} type="submit" className="btn1 btn--white1">Create</button><br></br>
                   
                    <span><center><a  onClick={()=>history.push('/minitwitter/Login')} >Already have an account Log in here</a></center></span>
                   
                    </form> 
                   
                </div>
                
            </div>
        )
    }
}

export default Registration
