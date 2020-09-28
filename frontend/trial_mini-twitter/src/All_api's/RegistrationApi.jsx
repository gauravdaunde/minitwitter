import axios from "axios"
import React, { Component } from 'react'

class RegistrationApi extends Component {
constructor(props) {
    super(props)

    this.state = {
        first_name:this.props.onfirstName,
        last_name:this.props.onLastName,
        username:this.props.onUsername,
        password:this.props.onPassword,
        error_message:'',
    }
    console.log("Registration props",this.props)
}

            // onSubmit=(first_name)=>{
            //     console.log("registration first-name",first_name)
            // }
        componentDidMount(){
    axios.post("http://127.0.0.1:8000/minitwitter/users/",this.state).then(response=>{
        console.log(response)
    }).catch(error=>{
        console.log(error.response)
    })
}
        
    


    render() {
        return (
            <div>
                Hello
            </div>
        )
    }
}

export default RegistrationApi

