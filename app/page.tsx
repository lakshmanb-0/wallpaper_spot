'use server'
import { allCollection } from "@/prisma/prismaDb";
import { revalidatePath } from "next/cache";
import ImageContainer from "./components/ImageContainer";

export default async function page() {
  const imageData = await allCollection(0, 10);
  revalidatePath('/');

  return (
    <main className='min-h-screen'>
      <section className="p-4">
        <ImageContainer imageData={imageData!} />
      </section>
    </main>
  );
}
