import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import {useResetpasswordMutation} from '../redux/services/endpoint';


interface pramaData {
  email:string,
  otp:number
}
export const ResetPassword:React.FC =()=>{
  const [newpassword,setNewPassword]=useState<string>("");
  const location = useLocation();

  const data:pramaData = location.state;
  const {email,otp}=data;


  const navigate=useNavigate();

  const [resetpassword,responseInfo]=useResetpasswordMutation();

  const {isError,isSuccess}=responseInfo;
 

  async function submitUser(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
   try{
    if(email){
      await resetpassword({email,otp,newpassword});
    }
   }catch(err){
    window.alert(err);
   }
  }

  useEffect(()=>{
    if(isSuccess){
      window.alert(`Password Reset`);
      navigate("/login")
    }
    if(isError){
      window.alert(`Error in Password Reset`);
    }
  },[isSuccess])

    return(
        <div className="w-full max-w-xs mx-auto mt-10">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={(e)=>submitUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Reset User Password</h3>
          <div className="mb-3">
            <input className="rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline" 
             type="password" 
             value={newpassword}
             onChange={(e)=>setNewPassword(e.target.value)}
             placeholder="*********"/>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Reset Password
            </button>

          </div>
        </form>
      </div>
    )
}