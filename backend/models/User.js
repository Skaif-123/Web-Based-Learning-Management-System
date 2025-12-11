import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    userName:String,
    userEmail:String,
    password:String,
    role:String
});

const User=mongoose.model("User",UserSchema);

export default User;