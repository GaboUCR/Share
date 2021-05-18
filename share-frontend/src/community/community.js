import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

export function BrowseCommunities(){
  const[comm, getComms] = useState([]);

  useEffect(()=>{
    const requestOptions = {method: 'GET'};

    fetch('http://127.0.0.1:5000/get-communities-names', requestOptions).then(response => response.json())
    .then((data) => {

      getComms(data.comms.map(c => (<CommunityTumbnail comm_name={c.comm_name}
                description={c.comm_description} author={c.username} />)))

    },
    (error) =>{console.log(error)}
  )

},[]);

  if (comm.length === 0){
    return <h2 className="cursor-wait text-center">Loading</h2>
  }
  else{
    return <div className="grid justify-items-center space-y-5">{comm}</div>
  }
}

export function CommunityForm(props){
  const[commName, setName] = useState("")
  const[commDescription, setDescription] = useState("")

  function nameChange(event){
    setName(event.target.value)
  }

  function descriptionChange(event){
    setDescription(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();

    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({comm_name: commName, comm_description:commDescription, user_id: props.id})};

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
    <div className="grid justify-items-center">
      <div className = "my-10">

        <form className="m-10" onSubmit={handleSubmit}>
          <label className="font-oxy font-normal text-lg" htmlFor="comm">Name your community</label>
            <div>
              <input className="border w-72" type="text" id="comm" value={commName} onChange={nameChange}/>
            </div>

          <label className="font-oxy font-normal text-lg" htmlFor="description">Write a description for your community</label>
            <div>
            <textarea className="border h-96 w-72" id="description" value={commDescription} onChange={descriptionChange}></textarea>
            </div>

          <input type="submit" className ="" value="Submit" />
        </form>

    </div>
  </div>
  );
}

function CommunityTumbnail(props){
  const name =  <div className="text-center font-oxy font-black text-xl sm:text-3xl">{props.comm_name}</div>
  const author = <div className="text-center font-oxy font-normal text-xs sm:text-sm">by {props.author}</div>
  const description = <div className="font-oxy font-semibold text-xs lit:text-sm litx:text-base sm:text-lg">{props.description}</div>

  const comm = <div className="border rounded border-bor-comm space-y-2 py-5 my-5 px-5 mx-5 sm:px-5 sm:mx-12 lg:mx-48 xl:mx-64">{name}{author}{description}</div>
  return(
    <Link to={"/communities/"+props.comm_name}>{comm}</Link>
  )
};
