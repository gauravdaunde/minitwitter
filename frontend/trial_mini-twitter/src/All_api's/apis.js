import React, { Component } from 'react'
import axios from "axios"


class apis extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             token:localStorage.getItem("token")
        }
    }
    

    registrationApi(username,first_name,last_name,password){
       return axios.post("http://127.0.0.1:8000/minitwitter/users/",
        {username,
        first_name,
        last_name,
        password}).then(response=>{
          const signupstatus=response.status
          const username=response.data.username
          console.log("ApiFunction",response,signupstatus,username)
            return [response,signupstatus,username]
            
        }).catch(error=>{
           const error_message=error.response.data
           const errorstatus=error.response.status
           console.log("Error",error_message,errorstatus)
           return [error_message,errorstatus]
        })

    }
    loginApi(username,password){
      return axios.post("http://127.0.0.1:8000/minitwitter/user/login/",{username,password}).
        then(response=>{
            console.log("function",response)
            const status=response.status
            return [response,status]
        }).catch(error=>{
            console.log(error.response)
             const loginerror=error.response.data
             const errorstatus=error.response.status
             console.log("LoginErr",loginerror,errorstatus)
             return [loginerror,errorstatus];
        })
    }
   getuserIdApi(){
    axios.defaults.headers={
        Authorization:"token "+localStorage.getItem("token")
    }
   return axios.get("http://127.0.0.1:8000/minitwitter/user/logged-in/").then(response=>{
        console.log("logged id",response)
           return response.data
    }).catch(error=>{
        console.log(error.response)
    })
      
   }
   
    userprofileApi(id){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
       return axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/profile/",).then(response=>{
           console.log(response)
           const status=response.status
           return response.data
       }).catch(error=>{
           console.log(error.response);
           return error.response
       })
    }
    tweetsApi(id,content){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token")
        }
        return axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/",
          {"content":content}).then(response=>{
        console.log(response);
           return response.status
          }).catch(error=>{
                console.log(error.response)
                const status=error.response.status
                return [error.response.data["content"],status]
          })
         
    }
    tweetgetApi(id){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token")
        }
       
         return axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/",
          {params:{list:"personal"}}).then(response=>{
           console.log(response);
            return response.data
          }).catch(error=>{
              console.log(error.response)
          })
    }

    searchApi(searchQuery){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
       return axios.get("http://127.0.0.1:8000/minitwitter/users/",{params:{search:searchQuery}}).
        then(response=>{  
            console.log("Search",response);
            return response.data
        }).catch(error=>{
            console.log(error.response)
        })
    }

    followusersApi(id,followuserid){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
       return axios.post("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",{"following_id":followuserid})
        .then(response=>{
            console.log("Follow",response)
        }).catch(error=>{
            console.log(error.response);
            return error.response.data
        })
    }
     followingsApi(id){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
          return axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",
           {params:{list:"followings"}}).then(response=>{
                console.log("Followings",response)
                return response.data
           }).catch(error=>{
               console.log(error.response);
           })
     } 
     followersApi(id){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
          return axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/",
           {params:{list:"followers"}}).then(response=>{
                console.log("Followers",response)
                return response.data
           }).catch(error=>{
               console.log(error.response);
           })
     }
     unfolloApi(id,followingid){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
       return axios.delete("http://127.0.0.1:8000/minitwitter/users/"+id+"/followings/"+followingid).
        then(response=>{
            console.log(response)
            return response.status
        }).catch(error=>{
            console.log(error.response);
           
        })
     }
    deletetweetApi(id,tweetid){
       return axios.delete("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/"+tweetid).then(response=>{
         console.log(response);
         return response.status
        }).catch(error=>{
            console.log(error.response)
        })
    }
    timelineApi(id){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
           }
           return axios.get("http://127.0.0.1:8000/minitwitter/users/"+id+"/tweets/",
            {params:{list:"timeline"}}).then(response=>{
                console.log("timeline",response);
                return response.data
            }).catch(error=>{
                console.log(error.response)
            })
    }

    imageUpload(id,imagefile){
        axios.defaults.headers={
            Authorization:"token "+localStorage.getItem("token") 
        }
    return axios.patch("http://127.0.0.1:8000/minitwitter/users/"+id+"/profile/",imagefile).then(response=>{
         console.log("image",response);
            return response.status
     }).catch(error=>{
         console.log(error.response)
         const status=error.response.status
         return [error.response.data["bio"],status]
     })
    }
    
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
 const obj=new apis()
export default obj
