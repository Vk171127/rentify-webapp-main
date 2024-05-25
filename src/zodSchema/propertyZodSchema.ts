import { z } from "zod";

const addressSchema = z.object({
  doorNo: z.string().min(1, { message: "Door number is required" }),
  street: z.string().min(1, { message: "Street is required" }),
  area: z.string().min(1, { message: "Area is required" }),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  pincode: z.string().min(1, { message: "Pincode is required" }),
});

export const propertyZodSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  address: addressSchema,
  rent: z.number().min(1, { message: "Rent must be at least 1" }),
  deposit: z.number().min(1, { message: "Deposit must be at least 1" }),
  bedrooms: z.number().min(1, { message: "There must be at least 1 bedroom" }),
  bathrooms: z.number().min(1, { message: "There must be at least 1 bathroom" }),
  amenities: z.string().min(1, { message: "Amenities are required" }),
  images: z.array(z.string().url({ message: "Each image must be a valid URL" })).min(1, { message: "At least one image is required" }),
  creatorEmail: z.string().email({ message: "Invalid email address for creator" }).optional(),
});

export type PropertyZodSchemaType = z.infer<typeof propertyZodSchema>;
