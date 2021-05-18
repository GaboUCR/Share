import TopNavigation from "./TopNavigation.js"
import React, {useState} from 'react'
import {SignUp, LogIn} from "./forms"
import {BrowseCommunities, CommunityForm, TextEditor, CommunityPosts, Post} from "./community"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const[id, get_id] = useState(-1);

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

          <Route exact path="/communities/:commName">
            <CommunityPosts />
          </Route>

          <Route exact path="/communities/:commName/:postName">
            <Post />
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
    <div>
      <div>Icon for the community tab made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for the page logo made by <a href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> </div>
      <div>Icon for start a community made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for write a post tab made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for the user made by <a href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
);
}

export default App;
