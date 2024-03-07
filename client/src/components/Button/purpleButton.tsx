import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/services/Hooks";
import { logout} from "../../redux/services/authslice";

interface Props{
    title:string,
    route?:string,
    flag?:boolean
}

export const PurpleButton:React.FC<Props> =(props:Props)=>{
    // const {authToken} = useAppSelector(selectAuth);
    const dispatch =useAppDispatch();

    const handlelogout =()=>{dispatch(logout());}

    const {title,route,flag} =props;
    if(!flag){
        return(
            <button className='bg-transparent font-raleway text-md ring-violet-600 hover:text-white px-4 py-3 hover:border-violet-900 border border-violet-400 font-semibold inline-block text-violet-400 cursor-pointer uppercase transition duration-200 ease-in-out rounded-md hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 active:scale-95'><Link to={`${route}`}>{title}</Link></button> 
        )
    }else{
       return (<button className='bg-transparent font-raleway text-md ring-violet-600 hover:text-white px-4 py-3 hover:border-violet-900 border border-violet-400 font-semibold inline-block text-violet-400 cursor-pointer uppercase transition duration-200 ease-in-out rounded-md hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 active:scale-95'onClick={handlelogout}>{title}</button>) 
    }
   
}