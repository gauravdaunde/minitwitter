import React, { Component } from 'react'
import { Route, Router, Switch } from 'react-router-dom'
import Login from "./Login/Login"
import Signup from './Sign_Up/signUp'
import UserProfile from "./UserProfile/UserProfile"
import history from '../history'
import obj from "../All_api's/apis"
import Sidebar from "./Sidebar/sidebar"
import Timeline from "./Timeline/timeline"
import Tweet from "./Tweet/tweet"
import Followings from "./Followings/followings"
import Edit from "./Edit/edit"
import Homepage from './Home/Homepage'
class Routes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             userdata:""
        }
       
    }
    
     setuseruserdata=(userdata)=>{
         console.log("Here",userdata)
            this.setState({
                userdata:userdata
            },()=>console.log("Callback",this.state.userdata))  
     }
   

   otherRoutes(){
       const{userdata}=this.state
       return(
           <div>
        <Sidebar setuserdata={this.setuseruserdata} userdata={userdata}></Sidebar>
        <Switch>
        <Route path="/minitwitter/timeline" render={props=>(<Timeline userdata={userdata} />)}></Route>
        
        {/* <Route path="/minitwitter/userprofile" render={props=>(<UserProfile userdata={userdata}/>)}></Route>  */}
         <Route path="/minitwitter/userprofile/:id" component={UserProfile}></Route>
         <Route path="/minitwitter/tweets" render={props=>(<Tweet userdata={userdata}/>)}></Route>
         
         <Route path="/minitwitter/followings" 
         render={props=>(<Followings userdata={userdata}/>)}></Route>
         <Route path="/minitwitter/edit" render={props=>(<Edit userdata={userdata}/>)}></Route>
         <Route path="/minitwitter/followers"  render={props=>(<Followings userdata={userdata}/>)}></Route>
         </Switch>
       </div>
       )
    
   }

    render() {
        return (
            <div>
                <Router history={history}>
                    <Switch>
                        <Route  exact path="/minitwitter" component={Homepage}></Route>
                    <Route  path="/minitwitter/registration" component={Signup}></Route>
                    <Route path="/minitwitter/login" component={Login}></Route>
                      {this.otherRoutes()}
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default Routes
