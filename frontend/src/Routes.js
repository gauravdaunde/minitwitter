import React, { Component } from 'react'
import { Router, Switch, Route } from "react-router-dom";
import Registration from './components/Registration';
import Formcomponent from './components/Formcomponent';
import history from './history';
import Tweets from './components/Tweets';
import UserProfile from './components/UserProfile';
import Timeline from "./components/timeline"
import Edit from './components/Edit';
import DisplayFollowings from './components/DisplayFollowings';
import Followers from "./components/followers"
import HomePage from "./components/HomePage"
import axios from 'axios';
import User from './components/User';
import SideBar from './components/SideBar';
import Parent from './components/Parent';
import UniversalSearch from "./components/UniversalSearch"

class Routes extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           
            userdata:"",
            id:""

        }
    
    }
       setUserData=(data)=>{
        console.log("Route data",data)
        this.setState({
            userdata:data
        },()=>console.log("UserDataInCallBack",this.state.userdata))
       }

       setId=(id)=>{
           console.log("Route id",id)
           this.setState({
               id:id
           })

       }

   
    componentRoutes=()=>{
        
            const {userdata,id}=this.state
            console.log("Route userdata",userdata)
            console.log("IDD",id)
          return(
            <div>
            <SideBar id={id}></SideBar>
            <Router history={history}>
                <Switch>
        <Route path="/minitwitter/Timeline/"  render={props=>(<Timeline
            userdata={this.setUserData} id={userdata} />)}>
            </Route>
            
           
            {/* <Route path="/minitwitter/UserProfile/:id" 
            render={props=>(<UserProfile userdata={userdata} />)}></Route> */}

            <Route exact path="/minitwitter/UserProfile/:id" component={UserProfile}></Route>
            
            <Route path="/minitwitter/Tweets/" 
            render={props=>(<Tweets userdata={userdata} />)} ></Route>
            
            <Route path="/minitwitter/Edit/" 
            render={props=>(<Edit userdata={userdata}/>)} ></Route>
            
            <Route path="/minitwitter/Followings/" 
            render={props=>(<DisplayFollowings userdata={userdata}/>)}></Route>
            
            <Route path="/minitwitter/Followers/" 
            render={props=>(<DisplayFollowings userdata={userdata}/>)}></Route>
            </Switch>
            </Router>
           
            </div>
           
          )
       
    }

    render() {
        
       // console.log("id",id)
        // console.log("Userdata",userdata)
        return (
            <div> 

               
                <Router history={history}>
                   <Switch>
                       <Route exact  path="/minitwitter"   component={HomePage}></Route>
                       
                       <Route path="/minitwitter/Registration"  
                       render={props=>(<Registration setId={this.setId}/>)}></Route>
                       
                 <Route path="/minitwitter/Login" render={props=>(<Formcomponent 
                 userdata={this.setuserdata}/>)}></Route>
                        
                        {this.componentRoutes()}
                     

                    
                  </Switch> 
                </Router>
                
            </div>
        )
    }
}

export default Routes
