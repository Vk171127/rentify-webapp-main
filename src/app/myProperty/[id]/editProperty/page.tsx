import { connectMongoDB } from "@/lib/mongoDb";
import Property from "@/models/property";
import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";
import React from "react";
import EditPropertyForm from "../../components/editPropertyForm";

const EditProperty = async ({params} :{params: {id :string}}) => {
    const {id} = params; 
    console.log(id);

  await connectMongoDB();
  const userData: PropertyZodSchemaType | null = await Property.findOne({
    _id: id,
  });
  return <div><EditPropertyForm userData = {userData}/></div>;
};

export default EditProperty;
