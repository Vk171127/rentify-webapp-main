import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";
import mongoose, { Schema, models } from "mongoose";

const propertySchema = new Schema<PropertyZodSchemaType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    address: {
      doorNo: {
        type: String,
        required: true,
      },
      street:{
        type: String,
        required: true,
      },
      area: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: String,
        required: true,
      },
    },
    rent: {
      type: Number,
      required: true,
    },
    deposit: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    amenities: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true, 
    },
    creatorEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Property =
  models?.Property || mongoose.model("Property", propertySchema);
export default Property;
