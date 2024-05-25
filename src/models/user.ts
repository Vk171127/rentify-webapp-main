import { userSchemaType } from "@/zodSchema/userZodSchema";
import mongoose, {Schema, models} from "mongoose";

const userSchema = new Schema<userSchemaType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models?.User || mongoose.model("User", userSchema);
export default User;