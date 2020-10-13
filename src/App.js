import React, {useEffect} from 'react';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import {selectUser, login, logout} from "./userSlice";
import {useSelector, useDispatch} from "react-redux"
import Login from "./Login"
import {auth} from "./firebase"
import './App.css';


function App() {
  const dispatch = useDispatch();
  const {user} = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser){
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName
        })
        );
      } else{
        
        dispatch(logout())
      }
    })
    
  }, [dispatch])

  console.log(user)

  return (
    <div className="app">
      {user ?
        <>        
          <Sidebar/>
          <Chat/> 
        </>
        : 
        <Login/>
      }
    </div>
  );
}

export default App;
