
import React from "react";
import CreatePropertyForm from "./component/createPropertyForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

const AddNewProperty = async () => {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");
  return (
   <div>
     <div><Navbar/></div>
    <CreatePropertyForm/>

    
   </div>
  );
};

export default AddNewProperty;
