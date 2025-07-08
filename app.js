import express from "express"

const port = 3000
const server = express()

server.get('/greet',(req,res)=>{
    res.json({"msg":"hi from get endpoint","time":new Date().toLocaleString()})
})

server.listen(port,()=>{
    console.log("server listining")
})