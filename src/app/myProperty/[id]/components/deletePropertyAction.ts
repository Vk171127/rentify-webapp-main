import { connectMongoDB } from "@/lib/mongoDb";
import Property from "@/models/property";
import { revalidatePath } from "next/cache";

export async function deletePropertyAction(id:string) {
    try {
      await connectMongoDB();
      const propertyDeleted = await Property.findOneAndDelete({
        _id: id,
      });
      if (!propertyDeleted) {
        return {
          message: "Property not found",
          success: false,
        };
      } else {
        revalidatePath(`/myProperty`);
        return {
          message: "Property deleted successfully",
          success: true,
        };
      }
    } catch (e) {
      return { message: "Failed to delete", success: false };
    }
  }
  