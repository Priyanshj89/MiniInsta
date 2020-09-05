import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {

    const history = useHistory()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)


    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])

    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","priyanshjain")
        fetch("https://api.cloudinary.com/v1_1/priyanshjain/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const uploadFields = () =>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            return M.toast({html: 'Invalid Email',classes:"#d32f2f red darken-2"})
         }
         M.toast({html: "Signing up...Please Wait",classes:"#ffa726 orange lighten-1",displayLength:"1500"})
         fetch("/signup",{
             method:"post",
             headers:{
                 "Content-Type":"application/json"
             },
             body:JSON.stringify({
                 name:name,
                 email:email,
                 password:password,
                 pic:url
             })
         }).then(res=>res.json())
         .then((data=>{
             if(data.err){
                 M.toast({html: data.err,classes:"#d32f2f red darken-2"})
             }
             else{
                 M.toast({html: data.message,classes: "#4caf50 green"})
                 history.push('/signin')
             }
            // console.log(data);
         }))
         .catch(err=>{
             console.log(err);
         })
    }

    const PostData = () =>{

        if(image){
            uploadPic()
        }else{
            uploadFields()
        }
    }
        

    return (
        <div className = "mycard">
        <div className="card auth-card input-field">
            <h1>Instagrm</h1>
            <input type = 'text' 
            placeholder = 'Name'
            value = {name}
            onChange = {(e)=>{setName(e.target.value)}}
            />
            <br/>
            <input type = 'text' 
            placeholder = 'Email'
            value = {email}
            onChange = {(e)=>{setEmail(e.target.value)}}
            />
            <br/>
            <input type = 'password' 
            placeholder = 'Password'
            value = {password}
            onChange = {(e)=>{setPassword(e.target.value)}}
            />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Select Profile Image</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <br/>
            <button 
            className="btn waves-effect waves-light #42a5f5 blue lighten-1" 
            onClick={()=>PostData()}>
                Register
            </button>
            <br/><br/>
            Already have an Account?<br></br>
            <Link to = '/signin'>Click here to Sign In</Link>
        </div>
   </div>
    )
}

export default Signup
