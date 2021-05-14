import {useState} from "react";

function TextEditor(){
  const[title, setTitle] = useState("")
  const[body, setbody] = useState("")

  function titleChange(event){
    setTitle(event.target.value);
  }

  function bodyChange(event){
    setbody(event.target.value);
  }

  function handleSubmit(event){
    console.log(title+"\n"+body)
    event.preventDefault();
  }

  return(
    <div className="grid justify-items-center">
      <div className = "my-16">
        <form onSubmit={handleSubmit} className = "space-y-4">
        <label className ="" htmlFor="Title">Title</label>
          <div>
          <input type="text" className="border w-72" id="Title" value={title} onChange={titleChange} />
          </div>
        <label className ="" htmlFor="body">body</label>
          <div>
          <textarea className="border h-96 w-72" id="body" value={body} onChange={bodyChange}> </textarea>
          </div>

        <input type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )

}

export default TextEditor;
