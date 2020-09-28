import React, { Component } from 'react'
//import obj from "../../All_api's/Check"
import obj from "../../All_api's/apis"
import TwitterLogo from "../../images/twitter.png"
import "../../components/Login/logincss.css"
import history from "../../history"
import Sidebar from "../Sidebar/sidebar"
class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            username:'',
            password:'',
           errorMessage:"",
           incorrectCredentials:"",
           token:"",
           isbtnClicked:false
          
        }
    }
    
    changeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
   
    


        submitHandle=(username,password,event)=>{
            this.setState({
                isbtnClicked:!this.state.isbtnClicked
            })
           
                obj.loginApi(username,password)
                .then((res)=>{
                    console.log("LoginRes",res[1])
                    if(res[1]=="400"){
                        this.setState({
                            errorMessage:res[0],
                        },()=>console.log("Callback",this.state.errorMessage))
                       
                    }
              else if(res[1]=="200"){
                const storeToken=res[0].data.token
                localStorage.setItem("token",storeToken)
              const getToken=localStorage.getItem("token")
              console.log(getToken)  
               if(getToken!==null){
                   history.push("/minitwitter/timeline")
                  // this.props.otherRoutes()
               }
              }
                   
                }).catch(error=>{
                    console.log("Login",error)

                })
            
            event.preventDefault();

        }
    
        
    render() {
        const{username,password,errorMessage,incorrectCredentials}=this.state
        return (
            <div>
             <div className="box" >
                <div className="box__animation"> 
                <center> <img src={TwitterLogo} /></center>
             
              <center><h2><b>Log in to Mini-Twitter</b></h2></center> 
              
                <form onSubmit={this.submitHandle.bind(this,username,password)} >
             
               <div className="labelstyle"><label> Username</label></div>
          
            <div className="inputstyle"><input type="text"  name="username"
            value={username} onChange={this.changeHandler} ></input>
            </div> 
                     <div><strong>{errorMessage.username}</strong></div> 
                   
                    <br></br>
                   <div className="labelstyle"> 
                   <label >Password</label></div>
                   
                   <div className="inputstyle"><input type="password" 
                  value={password} name="password"
                   onChange={this.changeHandler} id="password" ></input> </div>  
                   
                   <div><strong>{errorMessage.password}</strong></div> 
                   <div><strong>{errorMessage.non_field_errors}</strong></div> 

                    
                    < button type="submit" className="btn btn--white">Log in</button> 
                    
                    <br></br>
                    <br></br>
           
                   <center> 
                <span className="fix"><a onClick={()=>history.push('/minitwitter/Registration')} >
                Sign up for Mini-Twitter?.</a></span></center>
                </form>
               
                </div>
                </div> 

                {/* <button onClick={()=>this.Call(username)}>Click</button> */}
            </div>
        )
    }
}

export default Login
