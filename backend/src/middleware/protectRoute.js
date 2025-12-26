import {requireAuth} from "@clerk/express";
import user from "../models/User.js";

export const protecRoute = [
    requireAuth({signInUrl:"/sign-in"}),
    async(req,res,next) => {
        try{
            const clerkId = req.auth().userId;
            if(!clerkId) return res.status(401).json({msg:"Unauthorized - Invalid token"})

                //find user in db by clerk Id
                const user = await User.findOne({clerkId})
                if(!user) return res.status(404).json({msg:"user not found"})
                    //attach user to req
                req.user = user
            next()
                
        }
        catch(error){
            console.error("Error in protecRoute middleware",error);
            res.status(500).json({msg:"Internal Server Error"})


        }
    }
]