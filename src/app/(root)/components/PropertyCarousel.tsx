import MyCard from "@/components/MyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PropertyZodSchemaType } from "@/zodSchema/propertyZodSchema";

export default function PropertyCarousel({
  propertyData,
}: {
  propertyData: PropertyZodSchemaType[];
}) {

  
 
  return (
      <div className="w-[70%] ">
      <Carousel
        opts={{
            align: "center",
            loop: true,
            dragFree: true,
        }}
        >
        <CarouselContent>
          {propertyData?.map((item: PropertyZodSchemaType, index) => (
              <CarouselItem key={index} className="p-4 flex justify-center items-center sm:basis-1/3 md:basis-1/3 lg:basis-1/2 basis-1/3">
              <MyCard propertyData={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
          <CarouselPrevious/>
        <CarouselNext />
      </Carousel>
    </div>
  );
}
