"use server";

import { connectMongoDB } from "@/lib/mongoDb";
import Property from "@/models/property";
import { propertyZodSchema } from "@/zodSchema/propertyZodSchema";

export async function createPropertyAction(inputData: any) {
  // console.log(inputData);
  const res = propertyZodSchema.safeParse(inputData);

  if (!res.success) {
    // console.log(res.error.issues);
    return {
      message: res.error.issues[0].message,
      success: false,
      issues: res.error.issues,
    };
  }

  try {
    await connectMongoDB();

    const propertyCreated = await Property.create(res.data);
    if (propertyCreated) {
      return {
        message: "Property Posted Successfully",
        success: true,
      };
    } else {
      return {
        message: "Failed to Create Property",
        success: false,
      };
    }
  } catch (error) {
    // console.log(error)
    return {
      message: "Server Error",
      success: false,
    };
  }
}
