import React, { useState } from "react";
import Takken from "../../takken/Takken";
import Popup from "../../popup/Popup";
import Group from "../../../types/Group";
import Button from "../../button/Button";
import { usePopupContext } from "../../../contexts/PopupContext";

const ChooseTakPopup: React.FC<{ setTak: (tak: Group) => void }> = ({ setTak }) => {
    const [selectedTak, setSelectedTak] = useState<Group | null>(null);
    const { closePopup } = usePopupContext();

    const submitHandler = () => {
        setTak(selectedTak!);
        closePopup();
    };

    return (
        <Popup title="Kies een tak">
            <Takken setTak={setSelectedTak} />
            <div className="takken__submit-container">
                {selectedTak && (
                    <Button text="Kies deze tak" onClick={submitHandler} fullWidth darken uppercase />
                )}
            </div>
        </Popup>
    );
};

export default ChooseTakPopup;