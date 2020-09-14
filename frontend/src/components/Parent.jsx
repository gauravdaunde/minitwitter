import React, { Component } from 'react'
import SideBar from './SideBar'
import axios from "axios"
import timeline from "./timeline"
import Routes from '../Routes'

 class Parent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:""
        }
       
    }
    
        
          
    
    render() {
        // console.log(this.state.id)
        return (
            <div>
           <Routes></Routes>
            </div>
        )
    }
}

export default Parent
