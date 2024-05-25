"use client";

import { Button } from "@/components/ui/button";
import React, {useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";
import { editPropertyAction } from "./editPropertyAction";
import { useSession } from "next-auth/react";
import { UploadButton } from "@/utils/uploadthing";
import { deleteImage } from "@/server/delete";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
interface ImageUploadResponse {
  url: string;
}
const EditPropertyForm = ({
  userData,
}: {
  userData: PropertyZodSchemaType |null
}) => {
  const router = useRouter();
  const { data: session } = useSession();
 
  
  const [imageUploaded, setImageUploaded] = useState<string[]>(userData?.images||[]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? imageUploaded.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === imageUploaded.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useEffect(() => {
    console.log(imageUploaded);
  }, [imageUploaded]);

  const deleteImageHandler = async (imageUrl: string) => {
    const deleteRes = await deleteImage(imageUrl);
    console.log(deleteRes);
    if (deleteRes?.success) {
      setImageUploaded((prev) => [
        ...prev.slice(0, imageUploaded.indexOf(imageUrl)),
        ...prev.slice(imageUploaded.indexOf(imageUrl) + 1),
      ]);
    }
  };

  async function handleSubmit(formData: FormData) {
    const inputData = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      address: {
        doorNo: formData.get("doorNo"),
        street: formData.get("street"),
        area: formData.get("area"),
        city: formData.get("city"),
        state: formData.get("state"),
        pincode: formData.get("pincode"),
      },
      rent: Number(formData.get("rent")),
      deposit: Number(formData.get("deposit")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      amenities: formData.get("amenities"),
      creatorEmail: userData?.creatorEmail,
      images:imageUploaded,
      _id:userData?._id,
    };
    console.log(inputData);
    const response = await editPropertyAction(inputData);
    if (!response?.success && response?.message) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
      router.replace("/myProperty");
    }
  }
  return (
    <Card className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Property Form</h1>
      <form
        action={handleSubmit}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        {/* Title */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter the title of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.title}
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a detailed description of the property"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.description}
          ></textarea>
        </div>

        {/* Type */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Type
          </label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter the type of property (e.g., Apartment, House)"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.type}
          />
        </div>

        {/* Address */}
        <div className="sm:col-span-2">
          <label className="block text-md my-4 font-medium text-gray-700">
            Address:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-md font-medium text-gray-700">
                Door No
              </label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                placeholder="Enter the door number"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.doorNo}
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="Enter the street name"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.street}
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                Area
              </label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Enter the area"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.area}
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Enter the city"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.city}
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Enter the state"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.state}
              />
            </div>
            <div>
              <label className="block text-md font-medium text-gray-700">
                Pincode
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                placeholder="Enter the pincode"
                className="mt-1 p-2 block w-full border rounded-md shadow-sm"
                defaultValue={userData?.address.pincode}
              />
            </div>
          </div>
        </div>

        {/* Rent and Deposit */}
        <div>
          <label className="block text-md font-medium text-gray-700">
            Rent
          </label>
          <input
            type="number"
            id="rent"
            name="rent"
            placeholder="Enter the rent amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.rent}
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Deposit
          </label>
          <input
            type="number"
            id="deposit"
            name="deposit"
            placeholder="Enter the deposit amount"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.deposit}
          />
        </div>

        {/* Bedrooms and Bathrooms */}
        <div>
          <label className="block text-md font-medium text-gray-700">
            Bedrooms
          </label>
          <input
            type="number"
            id="bedrooms"
            name="bedrooms"
            placeholder="Enter the number of bedrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.bedrooms}
          />
        </div>
        <div>
          <label className="block text-md font-medium text-gray-700">
            Bathrooms
          </label>
          <input
            type="number"
            id="bathrooms"
            name="bathrooms"
            placeholder="Enter the number of bathrooms"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.bathrooms}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Amenities
          </label>
          <input
            type="text"
            id="amenities"
            name="amenities"
            placeholder="Enter the amenities"
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            defaultValue={userData?.amenities}
          />
        </div>

        {/* Images */}
        <div className="sm:col-span-2">
          <label className="block text-md font-medium text-gray-700">
            Images
          </label>
          <div className="flex items-center space-x-4">
          {imageUploaded.length > 0 && (
              <div
                style={{
                  backgroundImage: `url(${imageUploaded[currentIndex]})`,
                }}
                className="w-full h-32 mb-4 rounded-md bg-center bg-cover"
                onClick={() => deleteImageHandler(imageUploaded[currentIndex])}
              ></div>
            )}
            <button
              type="button"
              className="p-1 bg-gray-300 rounded-full hover:bg-gray-400"
              onClick={prevSlide}
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className="p-1 bg-gray-300 rounded-full hover:bg-gray-400"
              onClick={nextSlide}
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
          <UploadButton
            endpoint="multiFileUploader"
            onClientUploadComplete={(res: ImageUploadResponse[]) => {
              setImageUploaded((prevImages) => [
                ...prevImages,
                ...res.map((file) => file.url),
              ]);
              console.log("Upload Completed");
            }}
            appearance={{
              button: "bg-green-500 text-white py-2 px-4 rounded mt-4",
              container: "w-full flex justify-center",
              allowedContent: "text-white text-sm",
            }}
            onUploadError={(error: Error) => {
              console.log(`ERROR! ${error.message}`);
            }}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="sm:col-span-2 flex justify-end">
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default EditPropertyForm;
