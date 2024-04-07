import { Modal } from "./modal";

export default function App({ params }: { params: { id: string } }) {

    return (
        <Modal id={params.id} />
    );
}
