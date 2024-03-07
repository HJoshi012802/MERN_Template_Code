import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';


export const nmail =async (email:string,otp:Number,name:string,description:string)=>{


    let config={
        service:'gmail',
        auth:{
        user:process.env.TS_GMAIL,
        pass:process.env.TS_PASS,
        }
    }
    
    let transporter=nodemailer.createTransport(config);
    
    transporter.verify(function(error, success) {
    if (error) {
    console.log(error);
    } 
    else 
    {
    console.log('Server is ready to take our messages');
    }
    });
    let MailGenerator =new Mailgen({
    theme:"default",
    product:{
        name:"Harshit Joshi 75way Server",
        link:"https://mailgen.js"
    }
    })
    
    let response ={
        body:{
        name:`${name}`,
        intro:`${description}`,
        table:{
        data:[{
        item:'OTP PIN',
        description:`${otp}`,
        }]},
        outro:"Looking Forward to do more business"
        }
        }
        
    
    let mail = MailGenerator.generate(response);
    
    let message ={
    from:process.env.TS_GMAIL,
    to: email,
    subject:`One Time Password From Password Reset`,
    text:`Hi, 
    This Is Your Email Verification and OTP Pin`,
    html:mail,
    }
    
    transporter.sendMail(message).then(()=>{
    console.log("Notification for Reset Password Is Send !!");       
    }).catch(e=>{
    console.log(e);
    })
}