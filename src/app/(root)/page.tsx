import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { connectMongoDB } from "@/lib/mongoDb";
import Property from "@/models/property";
import Image from "next/image";
import Link from "next/link";
import PropertyCarousel from "./components/PropertyCarousel";

export default async function Home() {
  await connectMongoDB();
  const PropertyData = await Property.find({})
    .limit(4)
    .sort([["createdAt", "descending"]]);

  // console.log(PropertyData);

  return (
    <main>
      <Navbar /> 
      <div className="w-full flex flex-col justify-center">
        <div className="w-full flex justify-center bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] py-20 items-center">
          <div className="flex flex-col w-[50%] space-y-3">
            <div className="self-center text-7xl">RENTIFY</div>
            <div className="self-center text-lg">
              Where Renting Meets Simplicity
            </div>
            <div className="self-center text-lg">
              <button className="w-auto px-3 py-1 my-2 rounded-full bg-blue-500 text-white">
                {" "}
                Get Started
              </button>
            </div>
          </div>
          <div className="w-[50%] self-center">
            <Image src="/rentify_img.png" width={400} height={400} alt="" />
          </div>
        </div>
        <div className="flex flex-col w-full p-10 justify-center items-center space-y-4">
          <div className="self-center text-3xl text-blue-500 ">
            Latest Properties
          </div>
          <div className=" self-end w-[40%] py-4">
            <Button className="py-2 bg-blue-500">
              <Link href="/viewProperty">View All</Link>
            </Button>
          </div>
        </div>
      <div className="w-full flex justify-center">
        <PropertyCarousel propertyData={PropertyData} />
      </div>
      </div>
    </main>
  );
}
