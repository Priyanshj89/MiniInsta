import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {

    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory();

    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title:title,
                    body:body,
                    pic:url
                })
            }).then(res=>res.json())
            .then((data=>{
                console.log(url)
                if(data.error){
                    M.toast({html: data.error,classes:"#d32f2f red darken-2"})
                }
                else{
                    M.toast({html: "Created post Successfully",classes: "#4caf50 green"})
                    history.push('/')
                }
                console.log(data);
            }))
            .catch(err=>{
                console.log(err);
            })    
        }
    },[url])

    const postImage = () => {

        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instagram-clone")
        data.append("cloud_name","priyanshjain")
        fetch("https://api.cloudinary.com/v1_1/priyanshjain/image/upload",{
            method:"post",
            body: data
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.url){
                setUrl(data.url)
                M.toast({html: "Posting...Please Wait",classes:"#ffa726 orange lighten-1",displayLength:"1300"})
            }else{
            //console.log("yo1");
            //console.log(data.url)
            M.toast({html: "Please fill in all the fields",classes:"#d32f2f red darken-2"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
       
    return (
        <div className = "card input-field" style={{
            margin:"10px auto",
            maxWidth:"600px",
            padding:"10px",
            textAlign:"center",
            minHeight:"400px"
            
        }}>
            <h1>Instagrm</h1>
            <input 
            type = "text" 
            placeholder = "title" 
            value = {title}
            onChange = {(e)=>{setTitle(e.target.value)}}
            />
            <input 
            type = "text" 
            placeholder = "content" 
            value = {body}
            onChange = {(e)=>{setBody(e.target.value)}}
            />
            <div className="file-field input-field">
            <div className="btn #42a5f5 blue lighten-1">
                <span>Upload Image</span>
                <input 
                type="file" 
                onChange={(e)=>{setImage(e.target.files[0])}}
                />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button 
            className="btn waves-effect waves-light #42a5f5 blue lighten-1" 
            onClick={()=>{postImage()}}
            >
                Submit Post
            </button>
                 <br/><br/>
        </div>
    )
}

export default CreatePost
