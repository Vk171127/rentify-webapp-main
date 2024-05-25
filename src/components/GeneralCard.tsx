import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";

const GeneralCard = ({ propertyData }: { propertyData: PropertyZodSchemaType }) => {
  const { title, images, address, rent, bedrooms, deposit, _id, amenities } =
    propertyData;
  const fullAddress = `No. ${address.doorNo}, ${address.street}, ${address.area}, ${address.city}-${address.pincode}, ${address.state}`;
  const amenitiesList = amenities.split(",").map((item) => item.trim());
  const tags: string[] = [...amenitiesList, `${bedrooms}BHK`];

  return (
    <div className="flex justify-center mb-6">
      <Link href={`/viewProperty/${_id}`}>
        <Card className="w-80 shadow-md overflow-hidden rounded-xl border border-gray-400 my-card transition-all duration-300 transform hover:scale-105">
          <div className="relative w-full h-48 border">
            <Image
              src={images[0] || "/logo.jpg"}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="rounded-t-xl aspect-square"
            />
          </div>
          <div className="p-4 ">
            <div className="flex justify-between mb-2">
              <div>
                <div className="text-lg self-center font-semibold">Rent</div>
                <div className="text-md">₹{rent}</div>
              </div>
              <div>
                <div className="text-lg self-center font-semibold">Deposit</div>
                <div className="text-md">₹{deposit}</div>
              </div>
            </div>
            <div className="font-bold text-lg truncate">{title}</div>
            <p className="text-sm truncate">{fullAddress}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} className="bg-blue-700 text-white">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

export default GeneralCard;

