"use server";
import { connectMongoDB } from "@/lib/mongoDb";
import { userSchema } from "@/zodSchema/userZodSchema";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { zodErrorHandler } from "@/lib/zodErrorHandler";
export const register = async (values: any) => {
    //  console.log("values:",values);
    const result = userSchema.safeParse(values);
    if (!result.success) {
      const errorMessage = zodErrorHandler(result.error.issues);
      return {
        message: errorMessage,
      };
    }
  
    try {
      const { email, password, firstName, lastName, phoneNo } = result.data;
      await connectMongoDB();
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return {
          message: "This email already exists, please sign in",
          success: false,
        };
      } else {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password!, salt);
        const userData = {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNo: phoneNo,
          password: hashedPassword,
        };
        const userCreated = await User.create(userData);
        if (userCreated) {
          return {
            message: "User created successfully",
            success: true,
          };
        } else {
          return {
            message: "This email already exists, please sign in",
            success: false,
          };
        }
      }
    } catch (e) {
      // console.log(e)
      return { message: "Failed to create", success: false };
    }
  }