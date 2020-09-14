import React, { Component } from 'react'
import axios from 'axios'
import history from '../history'
import Timeline from './timeline'
import Tweets from './Tweets'

class UniversalSearch extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Searchdata:[],
             search:"",
             id:this.props.ID,
             
             error_message:""
        }
        console.log("Search",this.props)
    }
    changeserach=(event)=>{
        this.setState({search:event.target.value})
    }

  
    search=()=>{
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
        axios.get("http://127.0.0.1:8000/minitwitter/users/",{params:{search:this.state.search}}).
        then(response=>{  
            console.log("Search",response);
             
            this.setState({Searchdata:response.data})
            console.log(this.state.Searchdata);

        }).catch(error=>{
            console.log(error.response)
        })
    }
    followusers=(followfield,userid)=>{
        const{id}=this.state
        const obj={
            follow:followfield,
            id:userid
        }
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
        console.log(obj.id);
        console.log(obj.follow);
        if(obj.follow==false){ 
        axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",{"following_id":obj.id})
            .then(response=>{
                console.log("Follow",response)
            }).catch(error=>{
                console.log(error.response);
            })
        }
        else if(obj.follow==true){
            axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",{"following_id":obj.id})
            .then(response=>{
                console.log("Follow",response)
            }).catch(error=>{
                console.log(error.response);
                this.setState({
                    error_message:error.response.data
                })
            })
        }
            
        }
        showprofile=(userid)=>{
            history.push("/minitwitter/UserProfile/"+userid);
               
           }

    render() {
        const{Searchdata,search,error_message}=this.state
        return (
            <div>
    
                   <i class="fa fa-search" area-hidden="true"></i> 
             <input value={search} onChange={this.changeserach} type="text" className="searchbox" placeholder="Search Mini-twitter"></input>
             
           
             <button className="Searchbtn" onClick={this.search} type="submit" >Search</button>
             <br/><br/><br/><br/>
  
            <div  className="search_div">{Searchdata.length? Searchdata.map(Search=><div key={Search.id}>
       
            <div className="timelineuserstyle2"><i class="fa fa-user-circle"></i> </div>
     
             <div className="timelinetext1">{Search.first_name}{Search.last_name}</div>
     
                <div className="search_username">@{Search.username} 
                
                <div> <button onClick={()=>this.followusers(Search.follow,Search.id)} 
                className="textchange">
  
                {Search.follow==true?"Following":"Follow"}</button></div>{error_message}
                <hr className="searchHr"></hr> 
      
            </div></div>):"No Search"}</div>
             
            </div>
        )
       
    }
}

export default UniversalSearch
