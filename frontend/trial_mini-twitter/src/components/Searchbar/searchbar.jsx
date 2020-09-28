import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import history from "../../history"
class searchbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
           query:"",
           searchdata:[],
           id:this.props.id,
           error_message:""
        }
    }
    changeHandler=(event)=>{
        this.setState({
            query:event.target.value
        })
        
    }
    search=(query)=>{
        obj.searchApi(query).then(response=>{
            this.setState({
                searchdata:response
            })
        })
    }

    followUsers=(followuserid,followfield)=>{
        const{id}=this.state
        const storefield={
            follow:followfield,
            followid:followuserid
        }
        console.log("FollowField",storefield.follow)
       if(storefield.follow===false){
        obj.followusersApi(id,storefield.followid).then(response=>{
           history.push("/minitwitter/followings")
        })
       }
       else if(storefield.follow===true){
           obj.followusersApi(id,storefield.followid).then(response=>{
              // console.log("Response",response)
               this.setState({
                   error_message:response
               })
           })
       }
        
       
        
    }
    render() {
        const{query,searchdata,id,error_message}=this.state
        return (
            <div>
                <i class="fa fa-search" area-hidden="true"></i> 
                <input value={query} onChange={this.changeHandler} 
                type="text" className="searchbox" placeholder="Search Mini-twitter"></input>
                  <button className="Searchbtn" onClick={this.search.bind(this,query)} 
                  type="submit" >Search</button>
             <br/><br/><br/><br/>
                
             <div  className="search_div">{searchdata===undefined||searchdata.length? searchdata.map(Search=><div key={Search.id}>
       
       <div className="timelineuserstyle2"><i class="fa fa-user-circle"></i> </div>

        <div className="timelinetext1">{Search.first_name}{Search.last_name}</div>

           <div className="search_username">@{Search.username} 
           <div> <button onClick={()=>this.followUsers(Search.id,Search.follow)} 
                className="textchange">
  
                {Search.follow===true?"Following":"Follow"}</button></div>{error_message} 

           <hr className="searchHr"></hr> 
 
            </div></div>):"No Search"}</div>
                
            </div>
        )
    }
}

export default searchbar
