import { RequestHandler,Request,Response, NextFunction } from "express";
import { valiadationSchema } from '../../Helper/joi.validation';
import { Admin } from "../../Model/Role/admin";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

interface UserData{
    name:string,
    email:string,
    password:string
}

export const registerAdmin : RequestHandler = async (req:Request,res:Response) => {
    try{
       const result =await valiadationSchema.validateAsync(req.body)
    }catch(err){
       return res.status(402).send(err);
    }
    
    let admin=await Admin.findOne({email:req.body.email});
    if(admin) {return res.status(400).send("Admin already Registered ")};
    
    try{
        const Admin_create=await Admin.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        });

        const salt = await bcrypt.genSalt(10);
        Admin_create.password=await bcrypt.hash(Admin_create.password,salt);
    
        
        await Admin_create.save();

        const name:String = req.body.name;
        console.log(`${name} is Created Into The Admin Database `);
       return res.status(200).json(Admin_create);
    }catch(e){
        console.log('Error in Creating Admin In the Database!');
        return res.status(400).send("Error in Creating Admin In the Database!");
    }
}



export const adminSignIn : RequestHandler = async (req:Request,res:Response) => {
    try{
        const data:UserData = req.body ;
        const {email,password} =data;

        const admin= await Admin.findOne({email});
        
        if(!admin){
            return res.status(400).json({ok:false,message:"Not Registered"}) ;
        }
          
        const isPasswordMatch = await bcrypt.compare(password,admin.password) ;
        if(!isPasswordMatch){
            return res.status(400).json({ok:false,message:"Invalid Credentials"}); 
        }
        const authToken = jwt.sign({genid : admin._id,role:"Admin"},process.env.TS_JWT_SECRET_KEY||" ",{expiresIn : '12h'}) ;
        const refreshToken = jwt.sign({genid : admin._id,role:"Admin"},process.env.TS_JWT_REFRESH_SECRET_KEY||" ",{expiresIn : '24h'}) ;

        res.cookie('authToken',authToken,({httpOnly : true})) ;
        res.cookie('refreshToken',refreshToken,({httpOnly:true})) ;
        console.log(authToken);
        return res.status(200).json({userId:admin._id,authToken:authToken, refreshToken:refreshToken, name:admin.name, role:"Admin"}) ;
    }
    catch(err){
        return res.status(403).send("Admin Login Failed..") ;
    }
}
