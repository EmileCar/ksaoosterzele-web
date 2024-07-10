import { useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import Popup from "../../popup/Popup";
import Collage from "../../../types/Collage";
import { deleteCollage } from "../../../services/mediaService";
import ConfirmButtons from "../../popup/ConfirmButtons";

const ConfirmCollageDeletionPopup = ({ collage, onClose }: { collage: Collage, onClose: () => void }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEventFunc = async () => {
        setIsPending(true);
        await deleteCollage(collage.id!)
            .then(() => {
                setIsPending(false);
                onClose();
            })
            .catch((error) => {
                setIsPending(false);
                setError(error.message);
            });
    };

    return (
        <Popup title={`Activiteit ${collage.name} verwijderen`} onClose={onClose}>
            <FetchedDataLayout isPending={isPending} error={error}>
                <p>Weet je zeker dat je de collage "{collage.name}" wilt verwijderen?</p>
                <ConfirmButtons onConfirm={deleteEventFunc} onCancel={onClose} />
            </FetchedDataLayout>
        </Popup>
    );
};

export default ConfirmCollageDeletionPopup;