import { useEffect, useState } from 'react';
import {useSigninUserMutation,useForgetPasswordMutation} from "../redux/services/endpoint"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/services/Hooks';
import { setUser } from '../redux/services/authslice';
import {useGetuserbyIdMutation} from "../redux/services/endpoint";

export const Login:React.FC =()=>{
  const [email,setEmail] =useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [login,responsInfo]=useSigninUserMutation();
  const [forgetpassword]=useForgetPasswordMutation();


  const [getuser,idresponsInfo]=useGetuserbyIdMutation();
  
  const dispatch =useAppDispatch();

  const navigate=useNavigate();


  console.log(email);
  
  async function loginUser(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
   try{
    await login({email,password});

   }catch(err){
    window.alert(err);
   }
  }

  async function handleforget(){
    try{
      await forgetpassword({email});
      window.alert(`OTP Send to you Email`);
      navigate(`/forgetpassword/${email}`)
     }catch(err){
      window.alert(err);
     }
  }

  useEffect(()=>{
    if(responsInfo.isSuccess){
      console.log(responsInfo.data)
      window.alert(`${responsInfo.data.name} Welcome`);
      dispatch(setUser({name:responsInfo.data.name, authToken:responsInfo.data.authToken, refreshToken:responsInfo.data.refreshToken, role:responsInfo.data.role,id:responsInfo.id}));
      console.log(responsInfo.data);
      navigate("/")
    }
    if(responsInfo.isError){
      window.alert(`Error Login`);
    }
  },[responsInfo.isSuccess,responsInfo.isError])

    return(
        <div className="w-full max-w-xs mx-auto mt-20">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e)=>loginUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Login</h3>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="email" 
            type="text" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
           />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Password
            </label>
            <input className="shadow appearance-none border  rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
            type="password" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="*********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Log In
            </button>
          </div>
        </form>
       <button onClick={handleforget}>Forgot Password ?</button>
       
      </div>
    )
}