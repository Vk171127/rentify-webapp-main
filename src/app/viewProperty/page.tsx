
import React from "react";
import Property from "@/models/property";
import { connectMongoDB } from "@/lib/mongoDb";
import FilterSection from "./components/FilterFunctionality";
import Navbar from "@/components/Navbar";

const PropertyDisplay = async () => {
    await connectMongoDB();
    const PropertyData= await Property.find({})
  return (
    <div>
      <div> <Navbar/></div>
    <div className="flex flex-col m-6">
     
      <FilterSection propertyData={PropertyData} />
    </div>
    </div>
  );
};

export default PropertyDisplay;