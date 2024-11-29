
const Footer = () => {
  return (
    <div className='flex flex-col pt-10 sm:mt-4 md:mt-4 lg:mt-4 xl:mt-4'>
        <div className='w-screen h-fit'>
            <div className={`h-full w-4/5 flex m-auto ${window.innerWidth <= 640?'w-full flex-wrap':''}`}>
                <div className={`flex-[4_4_0%] h-full p-2 ${window.innerWidth<=640?'w-1/2 flex-1':''}`}>
                    <div className='flex flex-col'>
                        <div className='flex p-2 items-center flex-[4_4_0%]'>
                            <img alt='IMG'></img>
                            <h1 className='ml-4 text-xl'>E-Shop</h1>
                        </div>
                        <div className='flex-[4_4_0%]'>
                            <p>We provide fresh, top-notch meat, vegetables, and more. Enjoy quick delivery and savor the finest ingredients for a delicious dining experience.</p>
                        </div>
                        <div className='flex-[4_4_0%] p-2 mt-3'>
                            <div className='flex space-x-2'>
                                <a href='https://www.linkedin.com/in/mdjunaidahmed1/' target="_blank" className='transform hover:-translate-y-2 duration-200 p-1' rel="noreferrer">
                                    <button>
                                    <svg className='ml-3 text-3xl ' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/></svg>
                                    </button>
                                </a>
                                <a href='https://www.instagram.com/junai_d_ahmed/' className='transform hover:-translate-y-2 duration-200 p-1' target='_blank' rel="noreferrer">
                                    <button>
                                    <svg className='ml-3 text-3xl' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                                    </button>
                                </a>
                                <a href='https://www.linkedin.com/in/mdjunaidahmed1/' className='transform hover:-translate-y-2 duration-200 p-1' target='_blank' rel="noreferrer">
                                    <button>
                                    <svg className='ml-3 text-3xl' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm297.1 84L257.3 234.6 379.4 396H283.8L209 298.1 123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5L313.6 116h47.5zM323.3 367.6L153.4 142.9H125.1L296.9 367.6h26.3z"/></svg>
                                    </button>
                                </a>
                                <a href='https://www.linkedin.com/in/mdjunaidahmed1/' className='transform hover:-translate-y-2 duration-200 p-1' target='_blank' rel="noreferrer">
                                    <button>
                                        <svg className='ml-3 text-3xl' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/></svg>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex-[2_2_0%] ml-2 sm:ml-8 ${window.innerWidth<=640?'w-1/2 flex-1':''}`}> 
                    <div className='h-full flex flex-col'>
                        <h1 className='p-2 h-fit text-xl'>About Us</h1>
                        <div className='p-2 mb-0 sm:mb-0 md:mb-0 lg:mb-1 xl:mb-1 h-full flex flex-col justify-between'>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>About Us</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Why Us</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Security</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Testimonials</button></li>
                        </div>
                    </div>
                </div>
                <div className='flex-[2_2_0%] ml-8'>
                    <div className='h-full flex flex-col'>
                        <h1 className='p-2 h-fit text-xl'>Help</h1>
                        <div className='p-2 mb-1 h-full flex flex-col justify-between'>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Account</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Support Center</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Privacy Policy</button></li>
                                <li className=' underline underline-offset-1'><button className='hover:underline hover:underline-offset-2'>Terms & Conditions</button></li>
                        </div>
                    </div>
                </div>
                <div className='flex-[3_2_0%] ml-8'>
                    <div className='h-full flex flex-col'>
                        <h1 className='p-2 h-fit text-xl'>Contact Us</h1>
                        <div className='p-2 mb-1 h-full flex flex-col justify-between'>
                                <a className=' underline underline-offset-1'>
                                    <button className='hover:underline hover:underline-offset-2 flex items-center' href='tel:+919494887445'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>
                                        <span className='ml-2'>+91 9494887445</span>
                                    </button>
                                </a>
                                <a className=' underline underline-offset-1' href='mailto:ahmedjunaid2004@gmail.com'>
                                    <button className='hover:underline hover:underline-offset-2 flex items-center' type='email'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                        <span className='ml-1'>ahmedjunaid2004@gmail.com</span>
                                    </button>
                                </a>
                                <a className=' underline underline-offset-1' href='https://www.google.com/maps/place/VIT-AP+University/@16.4962777,80.4980927,17z/data=!3m1!4b1!4m6!3m5!1s0x3a35f27d40f21c55:0x1490eacd54859850!8m2!3d16.4962777!4d80.5006676!16s%2Fg%2F11gnsnjyhf?entry=ttu' target='_blank' rel="noreferrer">
                                    <button className='hover:underline hover:underline-offset-2 flex items-center' type='email'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/></svg>
                                        <span className='ml-1'>VIT-AP</span>
                                    </button>
                                </a>
                                <a className=' underline underline-offset-1 invisible'>
                                    <button className='hover:underline hover:underline-offset-2 flex items-center' type='email'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>
                                        <span className='ml-1'>ahmedjunaid2004@gmail.com</span>
                                    </button>
                                </a>
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className=' h-10 w-screen border-t-2 border-gray-300'>
            <p className='flex justify-center items-baseline p-2 text-sm '>© 2023 Developed By Junaid Ahmed</p>
        </div>
    </div>
  )
}

export default Footer