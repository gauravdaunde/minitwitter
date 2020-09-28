import React, { Component } from 'react'
//import obj from "../../All_api's/Check"
import obj from "../../All_api's/apis"
import "../../components/Sign_Up/formstyle.css"
import TwitterLogo from "../../images/twitter.png"
import history from "../../history"
//import {withRouter} from "react-router-dom"
class Signup extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            first_name:'',
            last_name:'',
            username:'',
            password:'',
           errorMessage:"",
           isBtnClicked:false
        }
    }
    
    changeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

        submitHandle=(username,first_name,last_name,password,event)=>{
            this.setState({
                isBtnClicked:!this.state.isBtnClicked
            })
            console.log("State",this.state.isBtnClicked)
              
            
                obj.registrationApi(username,first_name,last_name,password)
                .then(res=>{
                    console.log("Signup",res)
                    console.log("Signup",res[1])
                        if(res[1]==400){
                        this.setState({
                            errorMessage:res[0]
                        },()=>console.log("Callback",this.state.errorMessage))
                    }
                      
                      else if(res[1]==201){
                          alert(`hello ${res[2]}`)
                        obj.loginApi(username,password).then(response=>{
                            console.log("inlogin",response)
                            const storeToken=response[0].data.token
                            localStorage.setItem("token",storeToken)
                            const getToken=localStorage.getItem("token")
                            console.log("AfterSignup",getToken)
                        })  
                      }  
                      

                }).catch(error=>{
                    console.log("SignUp",error)
                    
                })
            
            event.preventDefault();

        }
    
         goToLogin=()=>{
             this.props.history.push("/minitwitter/login")
         }
    render() {
        const{username,first_name,last_name,password,errorMessage,isBtnClicked}=this.state
        return (
            
            <div className="container">
                     <div className="animation">
                     <center> <img src={TwitterLogo} /></center>
                     <h2><b>Create your account for Mini-Twitter</b></h2>
                
                <br></br>
                    <form onSubmit={this.submitHandle.bind(this,username,first_name,last_name,password)}>
                    <div className="labelstyle1"><label>First Name</label></div>
                       
                    <div className="inputstyle1"> <input type="text" name="first_name" 
                        value={first_name} onChange={this.changeHandler}></input></div>
                       
                       <label> <div><strong>{errorMessage.first_name}</strong></div></label>
                      <br/>
                       <div className="labelstyle1" ><label>Last Name</label></div> 
                      
                       <div className="inputstyle1"><input type="text" name="last_name" 
                        value={last_name} onChange={this.changeHandler}></input></div> 
                          
                          <label><div><strong>{errorMessage.last_name}</strong></div></label>
                          <br/>
                       <div className="labelstyle1" ><label>UserName</label></div> 
                       <div className="inputstyle1"> <input type='text'name="username" 
                        value={username} onChange={this.changeHandler}></input></div>
                         
                        <label><div><strong>{errorMessage.username}</strong></div></label> 
                      <br/>
                       <div className="labelstyle1"><label>Password</label></div> 
                       
                       <div className="inputstyle1"><input type="password" name="password" 
                        value={password} onChange={this.changeHandler}></input></div> 
                          
                         <label><div><strong>{errorMessage.password}</strong></div></label> 
                         <br/>
                       <button onClick={this.check} type="submit" className="btn1 btn--white1">
                        Create</button><br></br>
                   
                    <span><center><a  
                    onClick={()=>history.push("/minitwitter/login")}>
                        Already have an account Log in here</a></center></span>
                    </form>
                    
                    </div>

                {/* <button onClick={()=>this.Call(username)}>Click</button> */}
            </div>
        )
    }
}

export default  Signup
