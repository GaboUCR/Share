import React from "react";
import {SignUp, LogIn} from "./forms"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function TopNavigationNotLogged(props){

	return(
		<Router>

    <nav id="top"  className = "flex bg-light-blue">
      <Link to = "/" className ="m-5">Share</Link>

      <nav className="my-5 absolute right-0" >
        <Link to = "/log-in" className="mx-5">Log in</Link>
        <Link to = "/sign-up" className ="mx-5" >Sign up</Link>
      </nav>

    </nav>

		<Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/log-in">
            <LogIn />
          </Route>
          <Route path="/sign-up">
            <SignUp />
          </Route>
    </Switch>

		</Router>
		);
}

function TopNavigationLogged(props){

	return(
		<Router>

      <nav id="top"  className = "flex bg-light-blue">
        <Link to = "/" className ="m-5">Share</Link>

        <p className="my-5 absolute right-0">{props.username}</p>

      </nav>

  		<Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>

		</Router>
		);
}

function TopNavigation(){
  const requestOptions = {method: 'GET'};
  let user = "";
  fetch('http://127.0.0.1:5000/user', requestOptions).then(response => response.json())
  .then(data => { console.log(data);
    // if (data.success){
    //   user = data.user
    // }

  });

  if (user === ""){
    return <TopNavigationNotLogged/>
  }
  else{
    return <TopNavigationLogged username={user}/>

  }

}

function Home(){

	return <h1>This is home bitch</h1>;
}


export default TopNavigation;
