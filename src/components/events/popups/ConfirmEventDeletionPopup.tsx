import { useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { deleteEvent } from "../../../services/eventService";
import Popup from "../../popup/Popup";
import Event from "../../../types/Event";
import { isDateTimeInPast } from "../../../utils/datetimeUtil";
import ConfirmButtons from "../../popup/ConfirmButtons";
import { usePopupContext } from "../../../contexts/PopupContext";

const ConfirmEventDeletionPopup = ({ event, onClose }: { event: Event, onClose: () => void }) => {
    const [isPending, setIsPending] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { closePopup } = usePopupContext();

    const deleteEventFunc = () => {
        setIsPending(false);
        deleteEvent(event.id!)
            .then(() => {
                setIsPending(false);
                onClose();
                closePopup();
            })
            .catch((error) => {
                setIsPending(false);
                setError(error.message);
            });
    };

    return (
        <Popup title={`${event.name} verwijderen`}>
            <FetchedDataLayout isPending={isPending} error={error}>
                <p>Weet je zeker dat je het evenement "{event.name}" wilt verwijderen?</p>
                {!isDateTimeInPast(event.datetime) && (
                    <p className="error">
                        Dit evenement is nog niet voorbij.
                    </p>
                )}
                <ConfirmButtons onConfirm={deleteEventFunc} onCancel={closePopup} />
            </FetchedDataLayout>
        </Popup>
    );
};

export default ConfirmEventDeletionPopup;