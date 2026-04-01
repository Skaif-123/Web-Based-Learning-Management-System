require("dotenv").config();
const app=require("./src/app");

PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log("server running at port ",PORT);
})
