import express from "express"
import {ENV} from "./lib/env.js"
import path from "path"

const  app = express()

const __dirname =path.resolve();

//for getting the messange as json successfully 
//use localhost:your_portnumber_in_dotenv i.e localhost:5001
app.get("/",(req,res)=> { 
    res.status(200).json({msg:"api is up and running"})
})

//make our app ready for deploy
if(ENV.NODE_ENV === "Production"){
    app.use(express.static(path.join(___dirname,"../frontend/dist")))
}

app.get("/{*any}", (req,res) => {
    res.sendFIle(path.join(__dirname,"==/frontend","dist","index.htm"))
})

app.listen(ENV.PORT,() =>console.log("Server is running on port:",ENV.PORT))