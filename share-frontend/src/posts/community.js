import {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function BrowseCommunities(){
  var comm = ["prro", "gto", "ballena"];
  var address = comm.map(c => "/communities/"+c)
  // const[components, addComponent] = useState([]);
  // const[links, addLink] = useState([]);
  var links =[]
  var components = []

  for (var i=0; i<comm.length; i++){
    var comp = <CommunityButton commAddress={address[i]} commName={comm[i]} />;
    links.push(comp)
  }

  for (var i=0; i<comm.length; i++){
    var comp = <Route path ={address[i]}> <Community /> </Route>;
    components.push(comp)
  }

  return <Router> {links} <Switch> {components} </Switch> </Router>

}

function CommunityButton(props){

  return(
    <Link to={props.commAddress}>{props.commName}</Link>
  );

}

function Community(){
  return <h2>prro</h2>;

}

export default BrowseCommunities;
