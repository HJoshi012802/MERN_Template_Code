import { useEffect, useState } from 'react';
import {useSigninAdminMutation} from '../redux/services/endpoint';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/services/Hooks';
import { setUser } from '../redux/services/authslice';



export const AdminSignUp:React.FC =()=>{
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");


  const navigate=useNavigate();

  const [signinadmin,responseInfo]=useSigninAdminMutation();

  const dispatch =useAppDispatch();

  async function submitUser(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
   try{
    await signinadmin({ email,password});
   }catch(err){
    window.alert(err);
   }
  }



  useEffect(()=>{
    if(responseInfo.isSuccess){
      window.alert(`${responseInfo.data.name} Welcome`);
      dispatch(setUser({name:responseInfo.data.name, authToken:responseInfo.data.authToken, refreshToken:responseInfo.data.refreshToken, role:responseInfo.data.role}));
      console.log(responseInfo.data);
      navigate("/")
    }
    if(responseInfo.isError){
      window.alert(`Error Admin SignIn`);
    }
  },[responseInfo.isSuccess,responseInfo.isError])

    return(
        <div className="w-full max-w-xs mx-auto mt-10">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={(e)=>submitUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Admin SignUp</h3>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Email
            </label>
            <input className="rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="Email" 
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
             placeholder="example.12@gmail.com"/>
          </div>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Password
            </label>
            <input className="rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="password" 
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
             placeholder="*********"/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              SignUp
            </button>
          </div>
        </form>
      </div>
    )
}