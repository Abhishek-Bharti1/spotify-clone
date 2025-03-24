import { AuthenticatedRequest } from "./middleware.js";
import { User } from "./model.js";
import TryCatch from "./TryCatch.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = TryCatch(async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    res.status(400).json({
      message: "User already exists",
    });

    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.status(201).json({
    message: "User Registered",
    user,
    token,
  });
});

export const loginUser = TryCatch(async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User not found!",
    });

    return;
  }

  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {
    res.status(400).json({
      message: "Password mismatched!",
    });
    return;
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  res.status(200).json({
    message: "Logged In",
    user,
    token,
  });
});
export const myProfile = TryCatch(async (req:AuthenticatedRequest, res) => {
  let user = req.user;
  res.json(user);
});