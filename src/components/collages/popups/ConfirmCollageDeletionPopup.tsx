import { useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { deleteEvent } from "../../../services/eventService";
import Popup from "../../popup/Popup";
import Collage from "../../../types/Collage";

const ConfirmCollageDeletionPopup = ({ collage, onClose }: { collage: Collage, onClose: () => void }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const deleteEventFunc = () => {
        setIsPending(true);
        deleteEvent(collage.id!)
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
                <div className="popup__buttons">
                    <button className="button button--secondary" onClick={onClose}>
                        Annuleren
                    </button>
                    <button className="button button--primary" onClick={() => deleteEventFunc()}>
                        Verwijderen
                    </button>
                </div>
            </FetchedDataLayout>
        </Popup>
    );
};

export default ConfirmCollageDeletionPopup;