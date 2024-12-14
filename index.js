const express=require("express")
const cors=require("cors")
const route=require("./router/router")
const PORT=3000

const app=express()
app.use(express.json())
app.use(cors())

app.use("/auth",route)

app.listen(PORT,()=>console.log(` Server Started at ${PORT}`))