import { RequestHandler,Request,Response, NextFunction } from "express";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../../Model/Role/user";
import { nmail } from "../../Helper/Mail/nodemailer";
import { Error } from "mongoose";

interface emailData{
  email:string,
  otp?:number,
  newpassword?:string,
}

export const forgetpassword:RequestHandler =async(req:Request,res:Response) =>{
    const data:emailData=req.body;

    const {email}=data;
    
    const finduser =await User.findOne({email});
    if(!finduser){
      res.status(404).send("No Such Email is Registered Into The Database");
    }
    try{
    const name:string =finduser?.name || "";
    const description:string =`This is your OTP For Reset Password ${name}`;
    const otp:number =Math.floor(1000 + Math.random()*1000);
    
    await User.updateOne({email:email},{
        otp:otp,
    })
    finduser?.save();

    await nmail(email,otp,name,description);
    res.status(200).send("Email Is Send To The User");

    }catch(err){
    res.status(404).json({Error:err,message:"Email Not Send"});
    }
}


export const verifyotp:RequestHandler =async(req:Request,res:Response) =>{
    const data:emailData=req.body;

    const {email,otp}=data;
    const finduser =await User.findOne({email});
    
    if(!finduser){
      res.status(404).send("No Such Email is Registered Into The Database");

    }
    const verifyotp=finduser?.otp

    try{
        if(otp==verifyotp){
            console.log("verified");
            return res.status(200).json({isSuccess:true, isError:false});
        }else{
           console.log("Error in OTP verification")
           throw Error;
        }
    }catch(err){
    res.status(404).json({isSuccess:true, isError:false,message:"OTP Not Valid"});
    }
}



export const resetpassword:RequestHandler =async(req:Request,res:Response) =>{
    const data: emailData = req.body;

    const { email, otp, newpassword } = data;
    const finduser = await User.findOne({ email });
    if (!finduser) {
      return res.status(404).send("No Such Email is Registered Into The Database");
    }
    
    const salt: string = await bcrypt.genSalt(10);
    const passencrypt = await bcrypt.hash(newpassword || "", salt);
    
    try {
      const verifyotp = finduser?.otp;
      console.log(verifyotp);
      console.log(otp);
      console.log(passencrypt);
      if (otp == verifyotp) {
        await User.updateOne(
          { email: email },
          {
            password: passencrypt,
            otp: 0,
          }
        );
        return res.send("Password Reset");
      } else {
        return res.send("Cannot verify OTP");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
}    