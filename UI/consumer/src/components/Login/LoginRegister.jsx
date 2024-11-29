import React, { useState } from 'react'
import SignUp from './SignUp'
import SignIn from './SignIn';

const LoginRegister = (props) => {
    
  return (
    <div className='min-h-screen w-screen flex items-center justify-center'>
        <div className='w-screen mt-10 sm:w-full md:w-full lg:w-1/2 h-4/5 min-h-fit bg-green-300 flex rounded-xl p-1 border-black border-2'>
            {
                props.signIn? (
                    <SignIn setIsSignIn={props.setIsSignIn} {...props}/>
                ) : (
                    <SignUp setIsSignIn={props.setIsSignIn} {...props}/>
                )
            }
            {/* <div className='flex place-items-end p-3'>
                <button className='border-2 p-2 rounded-3xl bg-blue-300' onClick={()=>setIsSignIn(!signIn)}>
                    {
                        signIn ? (
                            <h1 className='font-bold p-1'>Register?</h1>
                        ) : (
                            <h1 className='font-bold p-1'>Already have an Account?</h1>
                        )
                    }
                </button>
            </div> */}
            
        </div>
    </div>
  )
}

export default LoginRegister