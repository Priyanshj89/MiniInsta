import React,{useContext} from 'react';
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from '../App';

// Functional components name first character shoul be capital for react-hooks to 
//work in it

const Navbar = () =>{

  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()

  const renderList = () => {

    if(state){
      return [
        <li key="1"><Link to="/profile">Profile</Link></li>,
        <li key="2"><Link to="/create">Create Post</Link></li>,
        <li key="3"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <button key="4"
        className="btn waves-effect waves-light #42a5f5 blue lighten-1"
        style = {{
          marginBottom:"20px"
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
        <li><Link to="/signin" >Sign In</Link></li>,
        <li><Link to="/signup">Sign Up</Link></li>
      ]
    }
  }
    return(
        <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagrm</Link>
      <ul id="nav-mobile" className="right links">
       {renderList()}
      </ul>
    </div>
  </nav>
    );
}

export default Navbar;