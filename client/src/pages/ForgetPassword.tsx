import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {useVerifyotpMutation} from "../redux/services/endpoint"
import { useNavigate } from 'react-router-dom';




export const ForgetPassword:React.FC =()=>{
    const { email } = useParams();
    const [otp,setOtp] =useState(0);
    const [otpverify,responseInfo]=useVerifyotpMutation();

    const {isSuccess,isError}=responseInfo;

   const navigate=useNavigate();

  async function verify(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
   try{
    if(otp && email){
       const value= await otpverify({email,otp});
       console.log(value);
    }
   }catch{
    window.alert(`Error in Sending OTP`);
   }
}

useEffect(()=>{
  if(isSuccess){
    window.alert(`OTP verified`);
    navigate(`/resetpassword`,{
      state:{
        email:email,
        otp:otp,
      }
    })
    }
  if(isError){
     window.alert(`OTP verified Failed`);
  }
  },[isSuccess,isError])

    
    return(
        <div className="w-full max-w-xs mx-auto mt-20">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e)=>verify(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>OTP</h3>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              OTP
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline" id="email" 
            type="text" 
            value={otp}
            onChange={(e:any)=>setOtp(e.target.value)}
            placeholder="Enter 4 digit OTP pin"
           />
          
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Verify
            </button>
          </div>
        </form>
      </div>
    )
}