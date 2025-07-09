import express from "express"

const port = 3000
const server = express()


server.get('/greet',(req,res)=>{
    console.log(`request:${req.method},url:${req.url},time at request:${new Date().toLocaleString()}`)
    res.json({"msg":"hi from get endpoint","time":new Date().toLocaleString()})
})

server.get('/greet/:name',(req,res)=>{
    console.log(`request:${req.method},url:${req.url},time at request:${new Date().toLocaleString()}`)
    console.log(`i got name:${req.params.name}`)
    if(req.params.name == "bob"){
        res.json({"msg":`i got name:${req.params.name}`})
    }
})

server.get('/test',async(req,res)=>{
    console.log(`request:${req.method},url:${req.url},time at request:${new Date().toLocaleString()}`)
    const result = await fetch('http://localhost:3000/greet/bob')
    const x = await result.json()
    if(x.msg == `i got name:bob`){
        res.json({"result": "OK"})
    }
    else {
        res.json({ "result": "FAIL" })
    }
})

server.use(express.json())
server.post('/action',async(req,res)=>{
    if(req.body.action == "joke"){
        const joke = await fetch('https://official-joke-api.appspot.com/random_joke').then((res) => res.json())
        res.json(joke)
    }else if(req.body.action == "cat fact"){
        const cats = await fetch('https://api.thecatapi.com/v1/images/search?limit=11',{headers:{"x-api-key":"live_V2S5T3ydfcvMhHsGPadfEsLlIYBUsDUDssoY2i0ri2uyjnGlmwQW0yNIwWfk4Dle"}})
        const x = await cats.json()
        console.log(x,null,2)
        res.json(x.length)
    }
    else{
        console.log("400 Bad Request")
        res.json({msg:"body is malformed"})
    }
})


server.listen(port,()=>{
    console.log("server listining")
})

// $ curl -X POST http://localhost:3000/action -H "Content-Type: application/json" -d '{"action": "joke"}'

// curl -X POST http://localhost:3000/action -H "Content-Type: application/json" -d '{"action": "cat fact"}'