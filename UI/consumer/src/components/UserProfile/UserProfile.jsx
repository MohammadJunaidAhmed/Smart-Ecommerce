import React, { useState } from 'react'
import { useEffect } from 'react';



const UserProfile = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  if(userId){
    //
    useEffect(() => {
      fetch(`${API_URL}/api/v1/users/${userId}`)
        .then(response => response.json())
        .then(json => {setUser(json); setIsLoading(false)})
        .catch(error => console.error(error));
    }, [userId]);
  }
  else{
    return (<h1>Something went wrong!</h1>);
  }
  if(isLoading){
    return (<h1>Loading!</h1>)
  }

  return (
    <div className='w-screen min-h-[90vh] h-fit bg-slate-500 flex justify-center'>
      <div className='w-[70vw] bg-slate-300 p-4 flex flex-col'>
        <div className='w-full h-48 flex bg-black rounded-xl'>
          <div className='flex-[3_3_0%] flex flex-col justify-center'>
            <h1 className='font-white text-3xl p-3 ml-[13vw] text-white font-serif'>User: <span>{user.name}</span></h1>
            <h1 className='font-white text-3xl p-3 ml-[13vw] text-white font-serif'>Type: {user.isAdmin ? <span>Admin</span> : <span>User</span>}</h1>
          </div>
          <div className='flex-[2_2_0%] flex items-center'>
            <div className='bg-green-300 h-40 w-40 rounded-full'></div>
          </div>
        </div>
        <div className='bg-black w-full flex-1 rounded-xl mt-2 flex '>
          {/* <div className='rounded-xl bg-slate-600 w-1/2 h-full mr-1'>
            <h1>Address</h1>
            <h1>Address</h1>
            <h1>Address</h1>
            <h1>Address</h1>
          </div>
          <div className='rounded-xl bg-slate-600 w-1/2 h-full'></div> */}
          <div className='h-fit w-full flex'>
              <div className=' border-r-2 border-black h-64 flex-1 bg-black flex flex-col justify-around'>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
              </div>
              <div className=' border-r-2 border-black h-64 flex-1 bg-black flex flex-col justify-around'>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
                  <h1 className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl text-white bg-slate-900'>Address</h1>
                  {/* <h1 className=' invisible cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></h1> */}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile