import React from "react";
import Button from "../button/Button";

interface ConfirmButtonsProps {
    onConfirm: () => void;
    onCancel: () => void;
    positive?: boolean;
}

const ConfirmButtons: React.FC<ConfirmButtonsProps> = ({ onConfirm, onCancel, positive }) => (
    <div className="confirm-buttons">
        <Button text="Annuleren" onClick={onCancel} darken customClassName="confirm-button" />
        <Button text="Verwijderen" onClick={onConfirm} darken customClassName={`confirm-button ${positive ? 'positive' : 'negative'}`} />
    </div>
);

export default ConfirmButtons;
