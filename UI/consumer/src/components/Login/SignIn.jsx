import React from 'react'

const SignIn = (props) => {
  return (
    <div className='h-full w-full flex flex-col border-2 border-black bg-slate-700'>
        <div className='flex-[1_1_0%]'>
            <h1 className='font-bold text-3xl flex items-center justify-center h-full p-2 text-white italic'>Sign In</h1>
        </div>
        <div className='flex-[6_6_0%] bg-green-300'>
            <form className='w-full h-full bg-slate-600 flex items-center justify-center' onSubmit={props.handleLogin}>
                <div className='flex flex-col h-full w-2/3 bg-white'>
                    <input required onChange={(e)=>props.setEmail(e.target.value)} type='email' name='email' placeholder='Email: ' className='cursor-pointer mt-14 ml-2 mr-2 pt-14 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <input required onChange={(e)=>props.setPassword(e.target.value)} type='password' name='password' placeholder='Password: ' className='cursor-pointer mt-14 ml-2 mr-2 pt-14 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <div className='w-full h-64 flex items-center justify-center mt-10'>
                        <button type='submit' className='p-2 border-2 border-black bg-blue-400 w-64 rounded-3xl transform duration-300 hover:scale-105 font-bold text-xl'>LOGIN</button>
                    </div>
                    <div className='w-full h-full bg-orange-400 flex'>
                        <div className='flex-1 p-3'>
                            <button onClick={()=>props.setIsSignIn(false)}>
                                <h1 className='text-xl duration-300 hover:translate-x-2 hover:text-stone-600'>Register</h1>
                            </button>
                        </div>
                        <div className='flex-1 flex justify-end p-3'>
                            <button className='flex justify-end'>
                                <h1 className='text-xl duration-300 hover:translate-x-2 hover:text-stone-600'>Forgot Password</h1>
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignIn