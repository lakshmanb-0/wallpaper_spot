'use server'
import { allCollection } from "@/prisma/prismaDb";
import Home from "./home/Home";
import { revalidatePath } from "next/cache";

export default async function page() {
  const imageData = await allCollection(0, 10);
  revalidatePath('/');
  return (
    <Home imageData={imageData!} />
  );
}
