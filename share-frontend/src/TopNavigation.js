import React, {useState, useEffect} from "react";
import {CommunitiesLogo, HomeLogo, AddCommunity, WritePost, User} from "./Top-nav-Buttons";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function TopNavigationNotLogged(props){

	return(
    <nav className = "flex bg-top-nav">
    <Link to = "/" className ="hidden sm:inline p-4 hover:bg-nav-link text-nav-link-text">Share</Link>
    <Link to = "/" className ="inline sm:hidden p-4 hover:bg-nav-link"><HomeLogo /></Link>

    <Link to="/communities" className="hidden sm:inline p-4 hover:bg-nav-link text-nav-link-text">Communities</Link>
    <Link to="/communities" className="inline sm:hidden p-4 hover:bg-nav-link"> <CommunitiesLogo/> </Link>

      <nav className="flex my-5 absolute right-0" >
        <Link to = "/log-in" className="mx-5">Log in</Link>
        <Link to = "/sign-up" className ="mx-5" >Sign up</Link>
      </nav>

    </nav>
		);
}

function TopNavigationLogged(props){
  const[username, get_username] = useState("");

  useEffect(()=>{
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: props.id})};

    fetch('http://127.0.0.1:5000/user', requestOptions).then(response => response.json())
    .then((data) => {get_username(data.username)})},[]);

	return(
    <nav className = "flex bg-top-nav">
        <Link to = "/" className ="hidden sm:inline p-4 hover:bg-nav-link text-nav-link-text">Share</Link>
        <Link to = "/" className ="inline sm:hidden p-4 hover:bg-nav-link"><HomeLogo /></Link>

        <Link to="/communities" className="hidden sm:inline p-4 hover:bg-nav-link text-nav-link-text">Communities</Link>
        <Link to="/communities" className="inline sm:hidden p-4 hover:bg-nav-link"> <CommunitiesLogo/> </Link>

        <nav className="flex absolute right-0">
          <Link className="hidden sm:inline p-4 hover:bg-nav-link text-nav-link-text" to='/create-community'>Start your community</Link>
          <Link className="inline sm:hidden p-4 hover:bg-nav-link" to='/create-community'> <AddCommunity /> </Link>

          <Link className="p-4 hidden sm:inline hover:bg-nav-link text-nav-link-text" to='/write'>write a post</Link>
          <Link className="p-4 inline sm:hidden hover:bg-nav-link" to='/write'> <WritePost /> </Link>

          <Link className="p-4 hidden sm:inline inline hover:bg-nav-link text-nav-link-text">{username}</Link>
          <Link className="p-4 inline sm:hidden hover:bg-nav-link"> <User/> </Link>
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
