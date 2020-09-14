import React, { Component } from 'react'
import './formstyle.css'

import TwitterLogo from  "./images/twitter.png"
import axios from 'axios'
import history from '../history'

 class Formcomponent extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              username:'',
              password:'',
              error_message:'',
             token:""
         }
     }

     handlechange=(event)=>{
        this.setState({
            username:event.target.value
        })
     }
     handlepassword=(event)=>{
         this.setState({
             password:event.target.value
         })
     }
     submithandle=(event)=>{
        
        axios.post("http://127.0.0.1:8000/minitwitter/user/login/",this.state).then(response=>{

        console.log(response);
        // if(response.status="200"){

        //     axios.get("http://127.0.0.1:8000/minitwitter/user/logged-in/").then(response=>{
        //     console.log("logged id",response)
        //     const userData=response.data
            
        //     console.log("Throught loginid",userData)
        //       this.props.userdata(userData)

        //     }).catch(error=>{
        //     console.log(error.response)
        //         })
        // }
            
               const store= response.data['token'];
            
                localStorage.setItem("token",store);
            
                 const token1=localStorage.getItem("token");
                console.log(token1);
                      if(token1!=null){
                    {history.push('/minitwitter/Timeline/')}
                    }
                 

            
        }).catch(error=>{
            console.log(error.response);
            if(error.response.status="400"){
                this.setState({error_message:"Username or Password is incorrect"});
            }
        })
        
        event.preventDefault()

     }

    render() {
        return (
            <div>
                <div className="box" >
                <div className="box__animation"> 
                <center> <img src={TwitterLogo} /></center>
             
              <center><h2><b>Log in to Mini-Twitter</b></h2></center> 
              
                <form onSubmit={this.submithandle} >
             
               <div className="labelstyle"><label> Username</label></div>
          
            <div className="inputstyle"><input type="text" class="form-control" 
            value={this.state.username} onChange={this.handlechange} required></input>
            </div> 
                    <br></br>
                   <div className="labelstyle"> 
                   <label >Password</label></div>
                   
                   <div className="inputstyle"><input type="password" 
                   class="form-control" value={this.state.password} 
                   onChange={this.handlepassword} id="password" required></input> </div>  
                   
                   {<div><strong>{this.state.error_message}</strong></div>}
                   
                    < button type="submit" className="btn btn--white">Log in</button> 
                    <br></br>
                    <br></br>
           
                   <center> 
                <span className="fix"><a onClick={()=>history.push('/minitwitter/Registration')} >
                Sign up for Mini-Twitter?.</a></span></center>
                </form>
               
                </div>
                </div> 
            </div>
        )
    }
}

export default Formcomponent

    // function check(){
    //     var get=document.getElementById("password");
    //     if(get.value.trim().length<5){
    //         alert("Password is short must be greater than 5");
    //         return false;
    //     }
    
    
          
             
            
                
                
           
        
    



