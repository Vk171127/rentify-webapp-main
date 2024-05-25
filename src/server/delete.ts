"use server"

import { UTApi } from "uploadthing/server"

export const deleteImage = async (url:string) => { 
    const utapi = new UTApi();
    const newUrl = url.substring(url.lastIndexOf("/") + 1);
        console.log(newUrl)
    const variable= await utapi.deleteFiles(newUrl)
    console.log(variable)
    return variable
 }
