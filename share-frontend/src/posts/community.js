import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom"

export function CommunityPosts(){
  const[posts, getPosts] = useState([]);
  let {commName} = useParams();

  useEffect(()=>{
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({comm_name:commName})};

    fetch('http://127.0.0.1:5000/get-posts-preview-by-community', requestOptions).then(response => response.json())
    .then((data) => {

      if (data.success ===true){
      getPosts(data.posts.map(c => (<div className="">
      <Link to={"/communities/"+commName+"/"+c.title}>{c.title}<div>writen by {c.username}</div></Link></div>)))

    }else if(data.error === "empty") {
      alert("This community doesn't have any post")

    }

    })

    },[]);

  if (posts.length === 0){
    return <h2 className="cursor-wait text-center">Loading</h2>
  }
  else{
    return <div className="grid justify-items-center py-5 space-y-5">{posts}</div>
  }

}

export function Post(){
  const[post, getPost] = useState([]);
  let {postName} = useParams();

  useEffect(()=>{
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({post_name:postName})};

    fetch('http://127.0.0.1:5000/get-post-by-name', requestOptions).then(response => response.json())
    .then((data) => {

      if (data.success === true){
      getPost(<div className="grid justify-items-center py-5 space-y-5"> <h2>{postName}</h2>
      <div>created by {data.post.username}</div> <div>{data.post.body}</div> </div>);

    }else if(data.error === "empty") {
      alert("there is no post with that name")
    }
    })
    },[]);

  if (post.length === 0){
    return <h2 className="cursor-wait text-center">Loading</h2>
  }
  else{
    return <div>{post}</div>
  }

}

export function BrowseCommunities(){
  const[comm, getComms] = useState([]);

  useEffect(()=>{
    const requestOptions = {method: 'GET'};

    fetch('http://127.0.0.1:5000/get-communities-names', requestOptions).then(response => response.json())
    .then((data) => {

      getComms(data.comms.map(c => (<div className=""><Link to={"/communities/"+c.comm_name}>{c.comm_name}</Link></div>)))

    },
    (error) =>{console.log(error)}
  )

},[]);

  if (comm.length === 0){
    return <h2 className="cursor-wait text-center">Loading</h2>
  }
  else{
    return <div className="grid justify-items-center py-5 space-y-5">{comm}</div>
  }

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
