import express from "express"
import {ENV} from "./lib/env.js"

const  app = express()

console.log(ENV.PORT)
console.log(ENV.DB_URL)

//for getting the messange as json successfully 
//use localhost:your_portnumber_in_dotenv i.e localhost:5001
app.get("/",(req,res)=> { 
    res.status(200).json({msg:"api is up and running"})
})

app.listen(ENV.PORT,() =>console.log("Server is running on port:",ENV.PORT))