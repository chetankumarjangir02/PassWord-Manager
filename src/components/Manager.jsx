import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }
    }, [])

    const copyText = (text) => {
        // alert("copied to clipboard" + text)
        toast('Copied to clipboard!', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)

    }


    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.includes("public/hidden.png")) {
            ref.current.src = "public/eye.png"
            passwordRef.current.type = "text"
        } else {
            ref.current.src = "public/hidden.png"
            passwordRef.current.type = "password"
        }
    }
    const savePassword = () => {
       if(form.site.length>3 && form.username.length>3&& form.site.length>3){
        setpasswordArray([...passwordArray, {...form,id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray,  {...form,id:uuidv4()}]))
        console.log([...passwordArray, form])
        setform({site:"",username:"",password:""})
        toast('PassWord Saved', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
       }else{
        toast('Error:min length must be above 3', {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
       }
       
    

    }
    const deletePassword=(id)=>{
        console.log("deleting item by id:",id)
        let c=confirm("Do you really want to delete this password?")
        if(c){
            setpasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("passwords",JSON.stringify(passwordArray.filter(item=>item.id!==id)))
            toast('PassWord Deleted Sucessfully', {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
    
            });

        }

    }
    const editPassword=(id)=>{
     console.log("editing item by id:",id)
     setform(passwordArray.filter(i=>i.id===id)[0])
     setpasswordArray(passwordArray.filter(i=>i.id===id))
    }


    
    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Zoom"
            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute top-0 z-[-2] h-screen  w-screen"></div>

            <div className=" container mx-auto px-40 min-h-[80vh] ">
                <h1 className='text-slate-300 text-center font-bold text-4xl'>&lt;Get Your Password&gt;</h1>
                <h5 className='text-slate-400 font-bold text-center underline'>Your own Password Manager</h5>
                <div className="text-white flex flex-col items-center p-4 gap-3">
                    {/* first input */}
                    <input value={form.site} onChange={handelChange} placeholder='Enter website URL' className="rounded-full text-black border border-slate-700 w-full bg-slate-300 p-4 py-1 " type="text" name="site" id="" />
                    <div className="flex w-full justify-between gap-9">
                        {/* Second input */}
                        <input value={form.username} onChange={handelChange} placeholder='Enter username' className="rounded-full text-black border border-slate-700 w-full bg-slate-300 p-4 py-1" type="text" name="username" id="" />
                        <div className="relative">
                            {/* Third input */}
                            <input ref={passwordRef} value={form.password} onChange={handelChange} placeholder='Enter Password' className="rounded-full text-black border border-slate-700 w-full bg-slate-300 p-4 py-1" type="password" name="password" id="" />
                            <span className='absolute text-black right-[3px] top-[5px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={25} src="hidden.png" alt="" />
                            </span>
                        </div>


                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center text-xl  border border-slate-900 bg-slate-500 rounded-full px-1 py-1 w-fit hover:bg-slate-400 gap-2 px-3'>
                        <lord-icon 
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords ">
                    <h2 className='font-bold text-2xl text-white py-3 underline'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white'>No Passwords To Show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden mb-7">
                        <thead className='bg-slate-500'>
                            <tr>
                                <th className='py-1.5 '>Site</th>
                                <th className='py-1.5 '>Username</th>
                                <th className='py-1.5 '>Password</th>
                                <th className='py-1.5 '>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-300'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    < td className='py-2  text-center w-30' >
                                        <div className='flex justify-center items-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='cursor-pointer size-7 ' onClick={() => { copyText(item.site) }}>
                                                <lord-icon className={" w-5"}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>
                                    </ td >
                                    < td className='py-2   text-center w-30' >
                                        <div className='flex justify-center items-center '>
                                            <span>{item.username}</span>
                                            <div className='cursor-pointer size-7 ' onClick={() => { copyText(item.username) }}>
                                                <lord-icon className={" w-5"}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>
                                    </ td >
                                    < td className='py-2  text-center w-30' >
                                        <div className='flex justify-center items-center '>
                                            <span>{item.password}</span>
                                            <div className='lordiconcopy cursor-pointer size-7 ' onClick={() => { copyText(item.password) }}>
                                                <lord-icon className={" w-5"}
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover">

                                                </lord-icon>
                                            </div>
                                        </div>
                                    </ td >
                                    < td className='py-2  text-center justify-center ' >
                                        
                                            <span className='cursor-pointer mx-1'onClick={()=>{editPassword(item.id)}}>
                                                <lord-icon className=''
                                                   style={{"width":"25px","height":"25px"}}
                                                    src="https://cdn.lordicon.com/gwlusjdu.json"
                                                    trigger="hover">
                                                </lord-icon></span>
                                            <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                                <lord-icon className=''
                                                   style={{"width":"25px","height":"25px"}}
                                                    src="https://cdn.lordicon.com/skkahier.json"
                                                    trigger="hover">
                                                </lord-icon></span>
                                    </ td >
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>

    )
}

export default Manager
