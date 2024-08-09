"use server";

import { cookies } from "next/headers";
import prisma from "../../../prisma/client";

export async function deleteImageFromDB(url: string) {
  const _ = cookies();
  try {
    const foundImage = await prisma.image.findFirst({
      where: {
        imageUrl: url,
      },
    });

    if (!foundImage) {
      return { error: "Image not found" };
    }

    const deletedImage = await prisma.image.delete({
      where: {
        id: foundImage.id,
      },
    });

    return { deletedImage: deletedImage.imageUrl };
  } catch (error) {
    console.log("error: ", error);
    return { error: "An error occurred while trying to delete the image" };
  }
}
