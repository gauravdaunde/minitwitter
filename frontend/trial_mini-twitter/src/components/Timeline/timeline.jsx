import React, { Component } from 'react'
import obj from "../../All_api's/apis"
import Searchbar from '../Searchbar/searchbar'
import history from "../../history"
 class Timeline extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              id:this.props.userdata.id,
              timelineContent:[],
             setContent:"false",
             content:"",
             error_message:""
         }
         console.log("props",this.props)
         console.log("State",this.state)
     }
     

     tweetWrite=(event)=>{
            this.setState({
                content:event.target.value
            })
     }
     componentDidMount(){
         const{id}=this.state
         obj.timelineApi(id).then(response=>{
            this.setState({
                timelineContent:response,
                setContent:"true"
            },()=>console.log("incallback",this.state.content))
         })
     }
     
     tweetCreate=(id,content)=>{
        obj.tweetsApi(id,content).then(response=>{
            console.log("in timeline",response)
            if(response=="201"){
                history.push("/minitwitter/tweets")
            }
           else if(response[1]=="400"){
                this.setState({
                    error_message:response[0]
                })
            }
        })
     }

     showProfile=(id)=>{
         history.push("/minitwitter/userprofile/"+id)

     }
    render() {
        const{timelineContent,setContent,content,id,error_message}=this.state
       
        return (
            <div>
                <div>
              
              <div className="rightpart">
             
              <div className="homestyle">Home</div>
              <div className="BottomPart"> </div>
             <div><i class="fa fa-user-circle"></i> </div> 
             <textarea value={content} onChange={this.tweetWrite}  className="textareastyle" placeholder="What's happening" ></textarea> 
            
             <button onClick={this.tweetCreate.bind(this,id,content)} className="timelinetweetbtn" type="submit"  >Tweet</button>
             
             <div className="error_message">{error_message} </div> 
              
              <div className="BottomPart2">  </div>
             
              <br/>
               
                          
            <div className="timeline">
                {timelineContent===undefined || timelineContent.length===0?"No timeline": timelineContent.map
                (con=> <div key={con.id} className="Tofocus" >
            
            <div className="timelineuserstyle"><i class="fa fa-user-circle"></i> </div>
           
            <div className="timelinetext1">
         
          <a className="anchor" onClick={()=>this.showProfile(con.user.id)}>
              {con.user.first_name} {con.user.last_name} @{con.user.username}</a>
               </div> 
          
          <div className="contentstyle">{con.content}</div>
             
             <div className="bottomline"></div>
             </div>
             )}
             </div>
         
       </div> 
            
              </div>
            
               <Searchbar id={this.state.id} />
            </div>
        )
    }
}

export default Timeline
