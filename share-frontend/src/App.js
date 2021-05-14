import TopNavigation from "./TopNavigation.js"
import React, {useState} from 'react'


function App() {
  const[id, get_id] = useState(3);

  function idRequest(req_id){
    get_id(req_id);
  };
  
  return (
      <TopNavigation id={id} setId={idRequest} />
  );
};

export default App;
