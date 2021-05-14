import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

export function BrowseCommunities(){
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

export function CommunityForm(props){
  const[commName, setName] = useState("")

  function nameChange(event){
    setName(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();

    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({comm_name: commName, user_id: props.id})};

    fetch('http://127.0.0.1:5000/create-community', requestOptions).then(response => response.json())
    .then((data) => {
      if (data.success === true){
        alert("Community added successfully")
      }
      else if(data.error === 'repeated_name'){
        alert("That name is already taken")
      }
    });
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="comm">Name your community</label>
        <div>
          <input className="border" type="text" id="comm" value={commName} onChange={nameChange}/>
        </div>

      <input type="submit" className ="" value="Submit" />
    </form>

  );
}
// export {BrowseCommunities, CommunityForm};
