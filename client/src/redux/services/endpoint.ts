import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';



export const apiEndpoint =createApi({
    reducerPath:'apiEndpoint',
    baseQuery:fetchBaseQuery(
        {
            baseUrl:'http://localhost:4000',
            prepareHeaders:(headers,{getState})=>{
                const authToken=(getState() as RootState).auth.authToken;
                const refreshToken=(getState() as RootState).auth.refreshToken;
                if(authToken && refreshToken){
                    console.log(`Bearer ${authToken}+${refreshToken}`)
                    headers.set("authorization",`Bearer ${authToken}+${refreshToken}`);
                }
                return headers;
            }
        }
    ),
    endpoints:(builder)=>({
        RegisterUser:builder.mutation({
            query:(formData:any)=>{
                return{
                    url:"/register",
                    method:'POST',
                    body:formData,
                }
            }
        }),
        
        SigninUser:builder.mutation({
            query:(payload:{email:string;password:string})=>{
                return{
                    url:"/signup",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        SigninAdmin:builder.mutation({
            query:(payload:{email:string;password:string})=>{
                return{
                    url:"admin/signup",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        forgetPassword:builder.mutation({
            query:(payload:{email:string})=>{
                return{
                    url:"/forgetpassword",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        verifyotp:builder.mutation({
            query:(payload:{email:string,otp:number})=>{
                return{
                    url:"/verifyotp",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        resetpassword:builder.mutation({
            query:(payload:{email:string,otp:number,newpassword:string})=>{
                return{
                    url:"/resetpassword",
                    method:'POST',
                    body:payload,
                }
            }
        }),

        getuserbyId:builder.mutation({
            query:(payload:{id:string})=>{
                return{
                    url:"/userbyId",
                    method:'POST',
                    body:payload,
                }
            }
        }),


    })
})

export const {useRegisterUserMutation,
    useSigninUserMutation,
    useForgetPasswordMutation,
    useVerifyotpMutation,
    useResetpasswordMutation,
    useSigninAdminMutation,
    useGetuserbyIdMutation,
} =apiEndpoint;