
import React from "react";
import Property from "@/models/property";
import { connectMongoDB } from "@/lib/mongoDb";
import Navbar from "@/components/Navbar";
import FilterSection from "../myProperty/components/FilterSection";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

const PropertyDisplay = async () => {
  const session = await getServerSession(authOptions);


    await connectMongoDB();
    const PropertyData= await Property.find({ creatorEmail:session?.user?.email})
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

