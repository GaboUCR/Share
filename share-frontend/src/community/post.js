import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";

function PostPreview(props){
  const address = "/communities/"+props.commName+"/"+props.title

  return(
    <div className="border rounded border-bor-comm sm:mx-5 lg:mx-60 xl:mx-80">
      <Link to={address}>
        <div className="text-center font-oxy font-black text-lg">{props.title}</div>
        <div className="text-center font-oxy font-normal text-sm">by {props.username}</div>
        <div className="my-3 px-3 font-oxy font-normal text-xs sm:text-base">{props.body}
        <div className="text-center font-oxy font-black text-sm">Read the rest of this post>>> </div>
        </div>
      </Link>
    </div>
  )

}

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

      if (data.success === true){
      getPosts(data.posts.map(c => ( <PostPreview commName={commName} body={c.body} title={c.title} username={c.username}/> )))

    }else if(data.error === "empty") {
      alert("This community doesn't have any post")

    }

    })

    },[]);

  if (posts.length === 0){
    return <h2 className="cursor-wait text-center">Loading</h2>
  }
  else{
    return <div className="grid py-5 space-y-5">{posts}</div>
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
      getPost(<div className="grid justify-items-center space-y-5 my-5 mx-3 sm:mx-12 md:mx-24 lg:mx-36 xl:mx-48 2xl:mx-60">
                <div className="text-center font-oxy font-black text-lg md:text-3xl">{postName}</div>
                <div className="text-center font-oxy font-normal text-sm">by {data.post.username}</div>
                <div className="border rounded border-bor-comm p-2 font-lato text-xs lit:text-sm litx:text-base sm:text-lg" >{data.post.body}</div>
              </div>
            );

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
