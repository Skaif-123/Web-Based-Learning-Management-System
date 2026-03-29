require("dotenv").config();
const app=require("./src/app");

app.listen(3001,()=>{
    console.log("server running at port 3001");
})
