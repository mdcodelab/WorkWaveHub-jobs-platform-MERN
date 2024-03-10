import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import Job from "../models/jobModel.js";


export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "Get application stats." });
};

export const updateUser = async (req, res) => {
  const obj={...req.body};
  delete obj.password;
  const updateUser = await User.findByIdAndUpdate(req.user.userId, obj);
  console.log(updateUser);
  res.status(StatusCodes.OK).json({ updateUser});
};
