import React, { useState } from "react";
import Takken from "../../takken/Takken";
import Popup from "../../popup/Popup";
import Group from "../../../types/Group";

interface ChooseTakPopupProps {
    onClose: (state: boolean) => void;
    setTak: (tak: Group) => void;
}

const ChooseTakPopup: React.FC<ChooseTakPopupProps> = ({ onClose, setTak }) => {
    const [selectedTak, setSelectedTak] = useState<Group | null>(null);

    const submitHandler = () => {
        setTak(selectedTak!);
        onClose(false);
    };

    return (
        <Popup title="Kies een tak" onClose={() => onClose(false)}>
            <Takken setTak={setSelectedTak} />
            <div className="takken__submit-container">
                {selectedTak && (
                    <button className="submit-button button inherit-font" onClick={submitHandler}>
                        Kies deze tak
                    </button>
                )}
            </div>
        </Popup>
    );
};

export default ChooseTakPopup;