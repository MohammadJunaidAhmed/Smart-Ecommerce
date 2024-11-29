import React from 'react'

const SignUp = (props) => {
  return (
    <div className='h-fit w-full flex flex-col border-2 border-black bg-slate-700'>
        <div className='flex-[1_1_0%]'>
            <h1 className='font-bold text-3xl flex items-center justify-center h-full p-2 text-white italic'>Sign Up</h1>
        </div>
        <div className='flex-[6_6_0%] bg-slate-600'>
            <form className='w-full h-full bg-slate-600 flex items-center justify-center' onSubmit={props.handleSignUp}>
                <div className='flex flex-col h-fit w-fit bg-white'>
                    <input onChange={(e)=>props.setUserName(e.target.value)} autoComplete='off' name='UserName' required type='text' placeholder='UserName: ' className='mt-6 cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <input onChange={(e)=>props.setEmail(e.target.value)} autoComplete='off' name='Email' required type='email' placeholder='Email: ' className='mt-6 cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <input onChange={(e)=>props.setPassword(e.target.value)} autoComplete='off' name='Password' required type='password' placeholder='Password: ' className='mt-6 cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <input onChange={(e)=>props.setPhone(e.target.value)} autoComplete='off' name='Phone' required type='tel' placeholder='Phone: ' className='mt-6 cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-3 hover:shadow-xl'></input>
                    <div className='w-full p-2 flex items-center justify-around'>
                        <label>
                            <input onChange={(e)=>{props.setUserType('Admin'); props.setIsAdmin(true)}} type='radio' name='userType' required className='cursor-pointer'/>
                            Admin
                        </label>
                        <label>
                            <input onChange={(e)=>{props.setUserType('User'); props.setIsAdmin(false)}} type='radio' name='userType' required className='cursor-pointer'/>
                            User
                        </label>
                    </div>
                    <p className='font-bold p-2 text-xl'>Address: </p>
                    <div className='h-fit w-full flex'>
                        <div className=' border-r-2 border-black h-64 flex-1 bg-neutral-100 flex flex-col justify-around'>
                            <input onChange={(e)=>props.setStreet(e.target.value)} autoComplete='off' name='street' required type='text' placeholder='Street: ' className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></input>
                            <input onChange={(e)=>props.setApartment(e.target.value)} autoComplete='off' name='apartment' required type='text' placeholder='Apartment: ' className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></input>
                            <input onChange={(e)=>props.setZip(e.target.value)}autoComplete='off' name='zip' required type='text' placeholder='ZIP: ' className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></input>
                        </div>
                        <div className='h-64 flex-1 bg-stone-100 flex flex-col justify-around'>
                        <input onChange={(e)=>props.setCity(e.target.value)} autoComplete='off' name='city' required type='text' placeholder='City: ' className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></input>
                        <input onChange={(e)=>props.setCountry(e.target.value)} autoComplete='off' name='country' required type='text' placeholder='Country: ' className='cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></input>
                        <h1 className=' invisible cursor-pointer ml-2 mr-2 border-black border-2 rounded-lg p-2 hover:shadow-xl'></h1>
                        </div>
                    </div>
                    <div className='w-full h-fit p-6 flex items-center justify-center'>
                        <button type='submit' className='p-2 border-2 border-black bg-blue-400 w-64 rounded-3xl transform duration-300 hover:scale-105 font-bold text-xl'>SIGNUP</button>
                    </div>
                    <div className='w-full h-full bg-orange-400 flex'>
                        <div className='flex-1 p-3'>
                            <button onClick={()=>props.setIsSignIn(true)}>
                                <h1 className='text-xl duration-300 hover:translate-x-2 hover:text-stone-600'>Login</h1>
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

export default SignUp