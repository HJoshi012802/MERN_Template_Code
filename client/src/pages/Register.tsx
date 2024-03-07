import { useEffect, useState,ChangeEvent } from 'react';
import {useRegisterUserMutation} from '../redux/services/endpoint';
import { useNavigate } from 'react-router-dom';


export const Register:React.FC =()=>{
  const [username,setUsername] =useState<string>("");
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [file,setFile] =useState<File | null>(null);


  const navigate=useNavigate();

  const [createUser,responseInfo]=useRegisterUserMutation();

  async function handlefilesubmit(e:ChangeEvent<HTMLInputElement>){
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function submitUser(e:any){
    e.preventDefault();

    const formData = new FormData();
    formData.append("name",username);
    formData.append('email', email);
    formData.append('password', password);
    if (file) {
      formData.append('image', file, file.name);
    }
    await createUser(formData);
  }

  useEffect(()=>{
    if(responseInfo.isSuccess){
      window.alert(`${responseInfo.data.name} you are Registered`);
      navigate("/login")
    }
    if(responseInfo.isError){
      window.alert(`Error in User Registeration`);
    }
},[responseInfo])

    return(
        <div className="w-full max-w-xs mx-auto mt-10">
        <form className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-2" onSubmit={(e)=>submitUser(e)}>
            <h3 className='text-center text-3xl pb-6 font-bold text-violet-700'>Register User</h3>
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Username
            </label>
            <input className=" border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"  
            type="text" 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="Username" 
            />
          </div>
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
          <div className="mb-3">
            <label className="block text-gray-600 text-sm font-bold mb-2" >
              Profile Photo
            </label>
            <input className="rounded w-full py-2 px-3 bg-zinc-400  mb-3 leading-tight focus:outline-none " 
             type="file" 
            onChange={handlefilesubmit}
             />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-violet-700  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  transition  hover:delay-300 duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-700 ease-in-out" type="submit">
              Register
            </button>

          </div>
        </form>
      </div>
    )
}

