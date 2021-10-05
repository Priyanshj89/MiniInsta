import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'

const Signin = () => {

    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const PostData = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
           return M.toast({html: 'Invalid Email',classes:"#d32f2f red darken-2"})
        }
        M.toast({html: "Signing in...Please Wait",classes:"#ffa726 orange lighten-1",displayLength:"3000"})
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then((data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                //console.log("hrolok")
                dispatch({type:"USER",payload:data.user})
                M.toast({html: "Sighed In Successfully",classes: "#4caf50 green"})
                history.push('/')
            }
            console.log(data);
        }))
        .catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className = "mycard">
             <div className="card auth-card input-field">
                 <h1>Instagrm</h1>
                 <br/>
                 <input 
                 type = 'text' 
                 placeholder = 'Email'
                 value = {email}
                 onChange = {(e)=>{setEmail(e.target.value)}}
                 />
                 <br/><br/>
                 <input 
                 type = 'password' 
                 placeholder = 'Password'
                 value = {password}
                 onChange = {(e)=>{setPassword(e.target.value)}}
                 />
                 <br/><br/>
                 <button 
                 className="btn waves-effect waves-light #42a5f5 blue lighten-1"
                 onClick={()=>{PostData()}}
                 >
                     Log IN
                </button>
                 <br/><br/>
                 Haven't registered yet?<br/>
                 <Link to = 'signup'>Click here to signup</Link>
             </div>
        </div>
    )
}

export default Signin
