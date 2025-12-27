import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res){
    //use clerk id for Stream (not mongodb _id) => It should match the id we have in the stream dashboard
    try{
        
        const token = chatClient.createToken(req.user._id)

        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        })

    }
    catch (error){
        console.log("Error in getStreamToken cotroller:" ,error.message);
        res.status(500).json({
            message: "Internal Server Error"
        });

    }
}