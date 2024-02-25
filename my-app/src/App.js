import Profile from './Profile.js';
import Operation from './Operations.js';
import Header from './Header.js';
import { useState } from 'react';

const App=()=>{
 

  const [isprofile,setisprofile]=useState(true);
  const [isoperations,setisoperations]=useState(false);

  const profile=(status)=>
  {
    setisoperations(false);
    setisprofile(true);

    


  };

  const Operations=()=>
  {
    setisoperations(true);
    setisprofile(false)

  };
  


  return (
    <div className="container">
      <Header profile={profile} operations={Operations}/>
      {isprofile && <Profile /> }
     {isoperations && <Operation /> } 
    </div>
  )
    
};
  

export default App;