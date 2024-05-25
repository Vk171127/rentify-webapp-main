"use server";

import { connectMongoDB } from "@/lib/mongoDb";
import Property from "@/models/property";
import { propertyZodSchema } from "@/zodSchema/propertyZodSchema";

export async function editPropertyAction(inputData: any) {
  console.log(inputData);
  const res = propertyZodSchema.safeParse(inputData);

  if (!res.success) {
    console.log(res.error.issues);
    return {
      message: res.error.issues[0].message,
      success: false,
      issues: res.error.issues,
    };
  }

  console.log(res.data)
  try {
    await connectMongoDB();

    const propertyUpdated = await Property.findByIdAndUpdate(
      { _id: res.data._id }, 
      {
        $set: {
         
          title: res.data.title,
          description: res.data.description,
          type: res.data.type,
          address: res.data.address,
          rent: res.data.rent,
          deposit: res.data.deposit,
          bedrooms: res.data.bedrooms,
          bathrooms: res.data.bathrooms,
          amenities: res.data.amenities,
          images: res.data.images,
          creatorEmail: res.data.creatorEmail,
        },
      },
      { new: true } 
    );

    if (propertyUpdated) {
      return {
        message: "Property Updated Successfully",
        success: true,
      };
    } else {
      return {
        message: "Failed to Update Property",
        success: false,
      };
    }
  } catch (error) {
    console.log(error)
    return {
      message: "Server Error",
      success: false,
    };
  }
}
