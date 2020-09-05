import React,{useContext,useRef,useEffect,useState} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../App';
import M from 'materialize-css'

// Functional components name first character shoul be capital for react-hooks to 
//work in it

const Navbar = () =>{

  const searchModal = useRef(null)
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()
  const [search,setSearch] = useState('')
  const [userDetails,setUserDetails] = useState([])

  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])

  const renderList = () => {

    if(state){
      return [
        <li key="1"><i data-target="modal1" className="material-icons modal-trigger" style={{
          color:"black"
        }}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Post</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <button key="5"
        className="btn waves-effect waves-light #42a5f5 blue lighten-1"
        style = {{
          marginBottom:"15px",
          marginRight:"10px"
        }}
        onClick={()=>{
          localStorage.clear();
          dispatch({type:"CLEAR"})
          history.push("/signin")
        }}
        >
            Log Out
       </button>
      ]
    }else{
      return [
        <li key ="6"><Link to="/signin" >Sign In</Link></li>,
        <li key ="7"><Link to="/signup">Sign Up</Link></li>
      ]
    }
  }

  const fetchUsers = (query)=>{
    setSearch(query)
    fetch('/search-users',{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query
      })
    }).then(res=>res.json())
    .then(results=>{
      setUserDetails(results.user)
    })
 }

    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagrm</Link>
      <ul id="nav-mobile" className="right links">
       {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModal} style={{
      color:"black"
    }}>
    <div className="modal-content">
    <input 
      type = 'text' 
      placeholder = 'search-users'
      value = {search}
      onChange = {(e)=>{fetchUsers(e.target.value)}}
      />
      <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} key={item._id} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link> 
               })}
               
              </ul>
    </div>
    <div className="modal-footer">
      <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>Close</button>
    </div>
  </div>
  </nav>
    );
}

export default Navbar;