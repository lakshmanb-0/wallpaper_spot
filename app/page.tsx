'use server'
import { allCollection } from "@/prisma/prismaDb";
import Home from "./home/Home";

export default async function page() {
  const imageData = await allCollection();

  return (
    <Home imageData={imageData!} />
  );
}
