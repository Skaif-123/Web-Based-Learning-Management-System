import User from "../../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async () => {
  const { userName, userEmail, password, role } = req.body;
  const existingUser = await User.findOne({
    $or: [{ userEmail }, { userName }],
  });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "UserName or User Email already exists",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newuser = new User({
    userName,
    userEmail,
    role,
    password: hashPassword,
  });
};

await newUser.save();
return res
  .status(201)
  .json({ success: true, message: "User registered successfully!" });

export { registerUser };
