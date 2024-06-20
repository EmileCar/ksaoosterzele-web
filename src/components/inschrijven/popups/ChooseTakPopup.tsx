import React, { useState } from "react";
import Takken from "../../takken/Takken";
import Popup from "../../popup/Popup";

interface ChooseTakPopupProps {
    onClose: (state: boolean) => void;
    setTak: (tak: any) => void;
}

const ChooseTakPopup: React.FC<ChooseTakPopupProps> = ({ onClose, setTak }) => {
    const [selectedTak, setSelectedTak] = useState<any>(null);

    const closeHandler = () => {
        onClose(false);
    };

    const handleSetTak = (tak: any) => {
        setSelectedTak(tak);
    };

    const submitHandler = () => {
        setTak(selectedTak);
        onClose(false);
    };

    return (
        <Popup title="Kies een tak" onClose={closeHandler}>
            <Takken setTak={handleSetTak}></Takken>
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