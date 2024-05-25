// @ts-nocheck
import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Property from "@/models/property";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongoDb";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import EmailDialog from "./components/sendemailpopup";

interface PropertyDisplayScreenProps {
  params: { id: string };
}

export default async function PropertyDisplayScreen({
  params,
}: PropertyDisplayScreenProps) {
  const session = await getServerSession(authOptions);

  const { id } = params;

  await connectMongoDB();
  const propertyData = await Property.findById({ _id: id });
  const {
    title,
    images,
    rent,
    bedrooms,
    deposit,
    address,
    bathrooms,
    type,
    creatorEmail,
    amenities,
  } = propertyData;
  const userData = await User.find({ email: creatorEmail });
  const customerData = session?.user?.email
    ? await User.find({ email: session.user.email })
    : null;
  const amenitiesList = amenities.split(",").map((item: string) => item.trim());
  const user = JSON.stringify(userData);
  const customer = JSON.stringify(customerData);

  const fullAddress = `No.${address.doorNo}, ${address.area}, ${address.city}-${address.pincode}, ${address.state}`;
  console.log(userData);
  console.log(customerData);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-gray-600 mb-2">{fullAddress}</p>
            <div className="flex space-x-4 mb-6">
              <div className="flex items-center">
                <span className="text-lg">Bedrooms:</span>
                <span className="ml-2 text-xl font-semibold">{bedrooms}</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg">Bathrooms:</span>
                <span className="ml-2 text-xl font-semibold">{bathrooms}</span>
              </div>
              <div className="flex items-center">
                <span className="text-lg">Rent:</span>
                <span className="ml-2 text-xl font-semibold text-indigo-800">
                  ₹{rent}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg">Deposit:</span>
                <span className="ml-2 text-xl font-semibold text-indigo-800">
                  ₹{deposit}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-6">
              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                  dragFree: true,
                }}
              >
                <CarouselContent>
                  {images?.map((item: string, index: number) => (
                    <CarouselItem key={index} className="p-4">
                      <Image
                        src={item}
                        width={450}
                        height={450}
                        alt="Property Image"
                        className="rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <div className="w-full lg:w-1/2 p-6 flex flex-col space-y-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-house-door"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                  </svg>
                  <div>
                    <div className="text-lg">Property Type</div>
                    <div className="text-md">{type}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-geo-alt"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                  <div>
                    <div className="text-lg">Location</div>
                    <div className="text-md">{fullAddress}</div>
                  </div>
                </div>
                
              </div>
              <div className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-house-heart"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 6.982C9.664 5.309 13.825 8.236 8 12 2.175 8.236 6.336 5.309 8 6.982" />
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                </svg>
                <div className="text-lg font-semibold">Amenities</div>
                <div className="flex flex-wrap gap-2">
                  {amenitiesList.map((amenity, index) => (
                    <Badge key={index} className="p-2">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
              <EmailDialog
                session={session}
                userData={JSON.parse(user)}
                customerData={JSON.parse(customer)}
                creatorEmail={creatorEmail}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
