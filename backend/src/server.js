import express from "express"
import { ENV } from "./lib/env.js"
import path from "path"
import { connectDB } from "./lib/db.js";
import { start } from "repl";
import cors from "cors"

const app = express()

const __dirname = path.resolve();

app.use(express.json())
app.use(cors())

//for getting the messange as json successfully 
//use localhost:your_portnumber_in_dotenv i.e localhost:5001
app.get("/", (req, res) => { 
    res.status(200).json({ msg: "api is up and running" })
})

app.get("/books", (req, res) => { 
    res.status(200).json({ msg: "this is the books endpoint" })
})

//make our app ready for deployment
if (ENV.NODE_ENV === "Production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))
}

app.get("/{*any}", (req,res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})

//Database connection 

const startServer = async () =>{
    try{
        await connectDB();
        app.listen(ENV.PORT, () => {
        console.log("Server is running on port:", ENV.PORT)
        });
    }
    catch(error){}
}
startServer();