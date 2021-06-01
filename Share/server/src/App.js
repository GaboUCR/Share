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
            <Home setId={idRequest} />
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

          <Route exact path="/icons">
            <Icons />
          </Route>

        </Switch>
      </Router>
  );
};

function Icons(){

  return(
    <div>
      <div>Icon for the community tab made by <a className="font-bold" href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for the page logo made by <a className="font-bold" href="https://creativemarket.com/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> </div>
      <div>Icon for start a community made by <a className="font-bold" href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for write a post tab made by <a className="font-bold" href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
      <div>Icon for the user made by <a className="font-bold" href="https://www.flaticon.com/authors/kiranshastry" title="Kiranshastry">Kiranshastry</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>
  );
}


function Home(props){

  function handleClick(event){
    event.preventDefault()
    props.setId(1)
  }

  return(
      <div>
        <div className="grid space-y-28">

          <div className="text-center font-lato text-xl">Welcome to Share, a simple platform to share posts within communities <div className="my-3"> <button onClick={handleClick} className="font-oxy text-light-blue p-1 border rounded">Log as a guest</button> </div> </div>

          <div className="grid justify-items-center text-center font-lato text-xl">Responsive<img src="/responsive1.png" /></div>

          <div className="grid justify-items-center text-center font-lato font-bold text-3xl">Made on<img src="/react-logo.jpg" /> <img src="/flask-logo.jpg" />  </div>

        </div>

      </div>

);
}

export default App;
