import TopNavigation from "./TopNavigation.js"
import React, {useState} from 'react'
import {SignUp, LogIn} from "./forms"
import {BrowseCommunities, CommunityForm, TextEditor} from "./posts"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const[id, get_id] = useState(6);

  function idRequest(req_id){
    get_id(req_id);
  };

  return (
      <Router>
        <TopNavigation id={id} setId={idRequest} />

        <Switch>

        <Route path="/log-in">
          <LogIn setId={idRequest} />
        </Route>

        <Route path="/sign-up">
          <SignUp />
        </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/create-community">
            <CommunityForm id={id}/>
          </Route>

          <Route exact path="/communities">
            <BrowseCommunities />
          </Route>

          <Route exact path="/write">
            <TextEditor id={id} />
          </Route>

          <Route exact path="/patito">
            <h2>perrito </h2>
          </Route>

        </Switch>
      </Router>
  );
};

function Home(){

	return(
    <h2>This is home bitch</h2>

);
}

export default App;
