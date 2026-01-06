import {requireAuth} from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth(),
    async(req,res,next) => {
        try{
            console.log("🔒 protectRoute - Checking authentication...");
            const auth = req.auth();
            console.log("🔒 Auth object:", { hasAuth: !!auth, userId: auth?.userId });
            
            const clerkId = auth?.userId;
            if(!clerkId) {
                console.log("❌ No clerkId found in auth");
                return res.status(401).json({message:"Unauthorized - Invalid token"})
            }

            console.log("🔍 Looking for user with clerkId:", clerkId);
            //find user in db by clerk Id
            let user = await User.findOne({clerkId})
            
            // If user doesn't exist, create them automatically (lazy user creation)
            if(!user) {
                console.log("⚠️ User not found in database for clerkId:", clerkId, "- Creating user automatically");
                
                // Get user info from Clerk session claims
                const sessionClaims = auth.sessionClaims || {};
                console.log("📋 Session claims available:", Object.keys(sessionClaims));
                
                // Extract user info from session claims
                const email = sessionClaims.email || sessionClaims.email_addresses?.[0] || `user_${clerkId}@example.com`;
                const firstName = sessionClaims.first_name || sessionClaims.given_name || "";
                const lastName = sessionClaims.last_name || sessionClaims.family_name || "";
                const name = sessionClaims.name || `${firstName} ${lastName}`.trim() || "User";
                const profileImage = sessionClaims.image_url || sessionClaims.picture || "";
                
                console.log("👤 Creating user with:", { email, name, clerkId });
                
                // Create user in database
                try {
                    user = await User.create({
                        clerkId: clerkId,
                        email: email,
                        name: name,
                        profileImage: profileImage,
                    });
                    
                    console.log("✅ User created automatically:", user.email, user.name);
                } catch (createError) {
                    console.error("❌ User creation error:", createError.message);
                    // If creation fails (e.g., duplicate email), try to find the user again
                    if (createError.code === 11000) {
                        console.log("⚠️ User creation failed due to duplicate, trying to find existing user...");
                        user = await User.findOne({ clerkId });
                        if (!user) {
                            throw createError;
                        }
                        console.log("✅ Found existing user:", user.email);
                    } else {
                        throw createError;
                    }
                }
            } else {
                console.log("✅ User found:", user.email);
            }
            
            //attach user to req
            req.user = user
            console.log("✅ protectRoute passed - User attached to request");
            next()
                
        }
        catch(error){
            console.error("❌ Error in protectRoute middleware:", error.message);
            console.error("Error name:", error.name);
            console.error("Error code:", error.code);
            console.error("Error stack:", error.stack);
            res.status(500).json({
                message:"Internal Server Error",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
                details: process.env.NODE_ENV === 'development' ? {
                    name: error.name,
                    code: error.code,
                    stack: error.stack?.split('\n').slice(0, 3)
                } : undefined
            })
        }
    }
]