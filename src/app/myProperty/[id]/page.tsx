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
import Link from "next/link";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { deletePropertyAction } from "./components/deletePropertyAction";
import { Pencil, Trash2 } from "lucide-react";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import InterestedDialog from "@/components/Userdialog";

export default async function PropertyDisplayScreen({
  params,
}: {
  params: { id: string };
}) {
  // const session = await getServerSession(authOptions);

  const { id } = params;

  await connectMongoDB();
  const propertyData = await Property.findById({
    _id: id,
  });
  if (!propertyData) {
    redirect("/myProperty");
  }
  const {
    title,
    images,
    rent,
    bedrooms,
    deposit,
    address,
    bathrooms,
    type,
    creatoremail,
    amenities,
    _id,
  } = propertyData;
  const userData = await User.find({
    email: creatoremail,
  });
  const customerData = await User.find({
    // email: session.user.email,
  });
  const amenitiesList = amenities.split(",").map((item: string) => item.trim());
  const user = JSON.stringify(userData);
  const customer = JSON.stringify(customerData);
  console.log("ssss", userData);
  console.log(propertyData);
  const FullAddress =
    "No." +
    address.doorNo +
    ", " +
    address.street +
    ", " +
    address.area +
    ", " +
    address.city +
    "-" +
    address.pincode +
    ", " +
    address.state;
  console.log(FullAddress);

  const handleDelete = async () => {
    "use server";
    try {
      var res = await deletePropertyAction(id);
      redirect("/myProperty");
      toast.success("Deleted Successfully");
    } catch (error) {
      toast.error("Error deleting property");
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col w-full h-full justify-center items-center">
        {/* <EditAndDeleteButton id={_id} /> */}

        {/* <div className=" w-full  ml-2 h-[80%] flex justify-center items-center space-x-16"> */}
          <div className=" w-[70%] my-10 py-1">
            <Carousel
              opts={{
                align: "center",
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent>
                {images?.map((item: string, index: number) => (
                  <CarouselItem
                    key={index}
                    className="p-4 sm:basis-1 md:basis-1 lg:basis-1/2"
                  >
                    <Image
                      src={item}
                      width={450}
                      height={450}
                      alt="alternate text"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="flex justify-around space-x-5 mb-4">
            <div>
              <Button className="bg-blue-400 hover:bg-blue-300">
                <Link href={`/myProperty/${id}/editProperty`}><Pencil /></Link>
              </Button>
            </div>
            <div>
              <form action={handleDelete}>
                <Button type="submit" className="bg-blue-400 hover:bg-blue-300"><Trash2/></Button>
              </form>
            </div>
          </div>
          <div className="w-full h-[20%] flex justify-center items-center ">
            <div className="flex w-[90%] space-x-4 border justify-around ">
              <div className="w-auto flex flex-col justify-start ">
                <div className="text-lg self-center">{title}</div>
                <div className="text-lg self-center">{FullAddress}</div>
              </div>
              <div className="w-auto flex flex-col justify-start ">
              <div className="text-lg self-start">Number of Bedrooms</div>
                <div className="text-lg">{bedrooms}</div>
              </div>
              <div className="w-auto flex flex-col justify-start">
                <div className="text-lg self-center">₹ Rent</div>
                <div className="text-lg self-center text-indigo-800">
                  {rent}
                </div>
              </div>
              <div className="w-auto flex flex-col justify-start">
                <div className="text-lg self-center">₹ Deposit</div>
                <div className="text-lg self-center text-indigo-800">
                  {deposit}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col  w-[80%] my-10  py-1">
            <div>
              <div className="flex w-full ">
                <div className="flex w-[50%] ">
                  <div className="p-2 py-5">
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
                  </div>
                  <div className="flex flex-col w-[80%] py-3 justify-center items-start">
                    <div className="text-lg self-start">Property Type</div>
                    <div className="text-md self-start">{type}</div>
                  </div>
                </div>
                <div className="flex w-[50%] ">
                  <div className="p-2 py-5">
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
                  </div>
                  <div className="flex flex-col w-[80%] py-3 justify-center items-end">
                    <div className="text-lg self-start">Location</div>
                    <div className="text-md self-start">{FullAddress}</div>
                  </div>
                </div>
              </div>
              <div className="flex w-full ">
                <div className="flex w-[50%]  ">
                  <div className="p-2 py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-hospital"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8.5 5.034v1.1l.953-.55.5.867L9 7l.953.55-.5.866-.953-.55v1.1h-1v-1.1l-.953.55-.5-.866L7 7l-.953-.55.5-.866.953.55v-1.1zM13.25 9a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM13 11.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25zm.25 1.75a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zm-11-4a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5A.25.25 0 0 0 3 9.75v-.5A.25.25 0 0 0 2.75 9zm0 2a.25.25 0 0 0-.25.25v.5c0 .138.112.25.25.25h.5a.25.25 0 0 0 .25-.25v-.5a.25.25 0 0 0-.25-.25zM2 13.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25z" />
                      <path d="M5 1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1a1 1 0 0 1 1 1v4h3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h3V3a1 1 0 0 1 1-1zm2 14h2v-3H7zm3 0h1V3H5v12h1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1zm0-14H6v1h4zm2 7v7h3V8zm-8 7V8H1v7z" />
                    </svg>
                  </div>
                  <div className="flex flex-col w-[80%] py-3 justify-center items-start">
                    <div className="text-lg self-start">Number of Bedrooms</div>
                    <div className="text-md self-start">{bedrooms}</div>
                  </div>
                </div>
                <div className="flex w-[50%] ">
                  <div className="p-2 py-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-droplet-half"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col w-[80%] py-3 justify-center items-end">
                    <div className="text-lg self-start">
                      Number of Bathrooms
                    </div>
                    <div className="text-md self-start">{bathrooms}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col -2 py-3 px-3 justify-center items-center">
              <div className="flex">
                <div className="p-2">
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
                </div>
              </div>
                <div className="text-lg self-center mb-4">Amenities</div>

              <div className="px-2 space-x-2 space-y-2 self-center">
                {amenitiesList?.map((item: string, idx: number) => (
                  <span key={idx}>
                    <Badge className="rounded-full px-4 py-2 bg-blue-500">{item}</Badge>
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 self-center">
              {/* <InterestedDialog session={session} userData={JSON.parse(user)} customerData={JSON.parse(customer)} creatoremail={creatoremail} /> */}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}
