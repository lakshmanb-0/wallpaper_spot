import { Modal } from "./modal";

const page = async ({ params }: { params: { id: string } }) => {

    return (
        <Modal id={params.id} />
    );
}
export default page
