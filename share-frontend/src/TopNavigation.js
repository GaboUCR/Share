import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function TopNavigationNotLogged(props){

	return(
    <nav id="top"  className = "flex bg-light-blue">
      <Link to = "/" className ="m-5">Share</Link>
      <Link to="/communities" className ="m-5">Communities</Link>

      <nav className="my-5 absolute right-0" >
        <Link to = "/log-in" className="mx-5">Log in</Link>
        <Link to = "/sign-up" className ="mx-5" >Sign up</Link>
      </nav>

    </nav>
		);
}

function TopNavigationLogged(props){
  const[username, get_username] = useState("");

  const requestOptions = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({id: props.id})};

  fetch('http://127.0.0.1:5000/user', requestOptions).then(response => response.json())
  .then((data) => {get_username(data.username)});

	return(
    <nav className = "flex bg-light-blue space-x-5">
        <Link to = "/" className ="py-5 px-5">Share</Link>
        <Link to="/communities" className="py-5">Communities</Link>

        <nav className="py-5 absolute right-0 space-x-5">
          <Link className="px-5" to='/create-community'>Start your community</Link>
          <Link className="px-5" to='/write'>write a post</Link>
          <Link className="px-5">{username}</Link>
        </nav>
      </nav>
		);
}

function TopNavigation(props){

  if (props.id === -1){
    return <TopNavigationNotLogged setId={props.setId} />
  }

  else{
    return <TopNavigationLogged id={props.id}/>
  }
}

export default TopNavigation;
