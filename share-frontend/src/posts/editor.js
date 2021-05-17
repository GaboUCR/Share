import {useState} from "react";

function TextEditor(props){
  const[title, setTitle] = useState("")
  const[body, setbody] = useState("")
  const[community, setCommunity] = useState("")

  function communityChange(event){
    setCommunity(event.target.value);
  }

  function titleChange(event){
    setTitle(event.target.value);
  }

  function bodyChange(event){
    setbody(event.target.value);
  }

  function handleSubmit(event){
    event.preventDefault();
    const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({title:title, body:body, user_id:props.id, comm_name:community})};

    fetch('http://127.0.0.1:5000/add-post', requestOptions).then(response => response.json())
    .then((data) => {
      if (data.success === true){
        alert("Your post was saved successfully");
      }
      else if(data.error === 'community_not_found'){
        alert("That community doesn't exists");

      }
    });
  };

  return(
    <div className="grid justify-items-center">
      <div className = "my-16 outline-editor bg-white">
        <form onSubmit={handleSubmit} className = "space-y-4 m-6">

        <label className ="" htmlFor="Title">Title</label>
          <div>
          <input type="text" className="border w-72" id="Title" value={title} onChange={titleChange} />
          </div>

        <label className ="" htmlFor="body">body</label>
          <div>
          <textarea className="border h-96 w-72" id="body" value={body} onChange={bodyChange}> </textarea>
          </div>

        <label htmlFor="communities">Choose a community for your post</label>
        <div>
        <input type="text" className="border w-72" id="communities" value={community} onChange={communityChange}/>
        </div>

        <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )

}

export default TextEditor;
