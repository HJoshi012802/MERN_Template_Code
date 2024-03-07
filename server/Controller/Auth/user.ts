import { RequestHandler,Request,Response, NextFunction } from "express";
import { valiadationSchema } from '../../Helper/joi.validation';
import { User } from "../../Model/Role/user";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface UserData{
  name:string,
  email:string,
  password:string,
  fileUrl?:string,
}

export const registerUser: RequestHandler =async(req:Request,res:Response) =>{
    const data:UserData=req.body;
    // try{
    //     const result =await valiadationSchema.validateAsync(data);
    //  }catch(err){
    //     return res.status(402).send(err);
    //  }

     let user=await User.findOne({email:data.email});
     if(user) {return res.status(400).send("User already Registered")};
     
     try{
         const User_create=await User.create({
             name:data.name,
             email:data.email,
             password:data.password,
             profile:data.fileUrl,
         });
 
         const salt = await bcrypt.genSalt(10);
         User_create.password=await bcrypt.hash(User_create.password,salt);
     
         
         await User_create.save();
 
         const name:string = data.name;
         console.log(`${name} is Created Into The User Database`);
        return res.status(200).json(User_create);
     }catch(e){
         console.log('Error in Creating User In the Database!');
         res.status(400).send("Error in Creating User In the Database!");
     }
}



export const userSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const data:UserData = req.body;
        const {email,password} =data;

        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : user._id,role:"User"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : user._id,role:"User"},process.env.TS_JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;


        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({id:user._id, authToken:authToken, refreshToken:refreshToken, name:user.name,profile:user.profile}) ;

    }
    catch(err){
        return res.status(403).send("Login Failed..") ;
    }
}

export const logout : RequestHandler = async (req:Request,res:Response) => {
    try{
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken') ;
        return res.status(200).json({ok:true,message:"logged out"}) ;
    }
    catch(err) {
        return res.status(400).json({ok:true,message:"Error logged out"}) ;
    }
}


export const deleteAll: RequestHandler = async (req:Request,res:Response) => {
    try{
        const user = await User.deleteMany();
        res.clearCookie('authToken') ;
        res.clearCookie('refreshToken') ;
        return res.status(200).json({ok:true,message:"deletedAll"}) ;
    }
    catch(err) {
        return res.status(400).json({ok:false,message:"Error deletedAll"}) ;
    }
}

export const findUser: RequestHandler = async (req:Request,res:Response) => {
    const value=req.headers;
   console.log(value);
    try{
        // const user = await User.findById(id);
        return res.status(200).json({value}) ;
    }
    catch(err) {
        return res.status(400).json({ok:false,message:"Error in finding User"}) ;
    }
}

