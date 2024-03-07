// import { PurpleButton } from "../components/Button/purpleButton";
import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/services/Hooks";
import {  selectAuth } from "../redux/services/authslice";
import { useEffect ,useState} from "react";

export const Home:React.FC =()=>{
  const [name,setName] = useState<string>("") ;
  // const [role,setRole] = useState<string>("") ;
 

  useEffect(()=>{
    const local:any = localStorage.getItem("user");
    console.log(local) ;
    if(local)   {
      const localObject = JSON.parse(local) ;
      setName(localObject.name) ;
    }
  },[])

  const {authToken}=useAppSelector(selectAuth);
 
    return(
        <section className=" relative w-full mx-auto my-4 min-h-[75vh]">
            <div className="text-center">
            <h1 className='text-center text-2xl pb-4 font-bold text-violet-700'>Welcome to the Home Page</h1>
            <h3>{name}</h3>
            </div>
            <div className="absolute bottom-0 left-[45%]">
            <Link to={"/admin/register"}>Login as as Admin ?</Link> 
            </div>
        </section>
    )
}




