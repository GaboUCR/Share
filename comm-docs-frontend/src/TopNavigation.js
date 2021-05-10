import React from "react";
import {SignUp, LogIn} from "./forms"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function TopNavigation(props){

	return(
		<Router>

    <nav id="top"  className = "flex bg-light-blue">
      <Link to = "/" className ="m-5">Gabozon</Link>

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

function Home(){

	return <h1>This is home bitch</h1>;
}


export default TopNavigation;
