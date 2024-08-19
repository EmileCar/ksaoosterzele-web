import useForm from "../../../hooks/useForm";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import Button from "../../button/Button";
import Form from "../../form/Form";
import AutoComplete, { AutoCompleteOption } from "../../form/AutoComplete";
import { usePopupContext } from "../../../contexts/PopupContext";
import Invoice, { SendInvoice } from "../../../types/Invoice";
import { sendInvoices } from "../../../services/invoiceService";
import useFetch from "../../../hooks/useFetch";
import { getLeaders } from "../../../services/leaderService";
import { useEffect, useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";

enum PriceType {
    Bier = 'Bier',
    Fris = 'Fris',
    Fret = 'Fret',
    Zwaarkes = 'Zwaarkes',
    Andere = 'Andere (€)'
}

// CONSTANTEN (prijzen)
const PRICES: { [key in PriceType]: number | null } = {
    [PriceType.Bier]: 0.6,
    [PriceType.Fris]: 0.6,
    [PriceType.Fret]: 1.5,
    [PriceType.Zwaarkes]: 1.5,
    [PriceType.Andere]: null
};

type LeaderStreepjes = {
    [leaderId: number]: {
        [key in PriceType]?: number;
    }
};

const StreepkesPopup = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState<string>("");
    const [isNameSet, setIsNameSet] = useState<boolean>(false);
    const [streepjesData, setStreepjesData] = useState<LeaderStreepjes>({});
    const { values, errorStates, setValues, handleSubmitForm, submitPending } = useForm<SendInvoice[]>([], sendInvoices);
    const { pending, data: leaders, error } = useFetch<{ id: number, name: string }[]>(getLeaders);
    const { closePopup } = usePopupContext();

    const handleChange = (leaderId: number, priceType: PriceType, amount: number) => {
        setStreepjesData(prevState => ({
            ...prevState,
            [leaderId]: {
                ...prevState[leaderId],
                [priceType]: amount
            }
        }));
    };

    useEffect(() => {
        const newInvoices = Object.keys(streepjesData).map((leaderId) => {
            const leaderData = streepjesData[parseInt(leaderId)];
            const totalAmount = Object.keys(leaderData).reduce((sum, priceType) => {
                const amount = leaderData[priceType as PriceType] || 0;
                return sum + (PRICES[priceType as PriceType] ?? 0) * amount;
            }, 0);

            const roundedAmount = parseFloat(totalAmount.toFixed(2));

            return new SendInvoice({
                leaderId: parseInt(leaderId),
                name: name,
                amount: roundedAmount,
                remarks: ''
            });
        });

        const filteredValues = newInvoices.filter(invoice => invoice.amount !== null && invoice.amount !== 0);

        setValues(filteredValues);
    }, [streepjesData]);

    const handleSubmit = async () => {
        await handleSubmitForm("POST", () => {
            onClose();
            closePopup();
        });
    };

    useEffect(() => {
        if (leaders && isNameSet) {
            const initialStreepjesData: LeaderStreepjes = {};

            leaders.forEach(leader => {
                initialStreepjesData[leader.id] = {};
            });

            setStreepjesData(initialStreepjesData);
        }
    }, [leaders, isNameSet]);

    return (
        <Popup title={"Voeg streepkes toe"}>
            {!isNameSet ?
                <Form disabled={submitPending}>
                    <Label text="Naam van periode/evenement" errorMessage={errorStates.nameError} required>
                        <Input name="name" type="text" value={name ?? ""} onChange={(event) => setName(event.target.value)} focus />
                    </Label>
                    <Button text="Ga verder" onClick={() => setIsNameSet(true)} darken uppercase pending={submitPending} />
                </Form>
                :
                <>
                    <div className="popup-text">
                        <h3>Voeg streepkes toe voor {name}</h3>
                        <p>Voeg enkel de hoeveelheid streepkes toe in de cellen. Enkel bij 'Andere' moet er een bedrag ingegeven worden.</p>
                    </div>
                    <FetchedDataLayout isPending={pending} error={error}>
                        <Form>
                            <table className="streepkes-table">
                                <thead>
                                    <tr>
                                        <th>Naam</th>
                                        {Object.keys(PriceType).map((key) => <th key={key}>{PriceType[key as keyof typeof PriceType]}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaders && leaders.map(leader => (
                                        <tr key={leader.id}>
                                            <td className="leader-label">{leader.name}</td>
                                            {Object.keys(PriceType).map((key) => {
                                                const priceType = PriceType[key as keyof typeof PriceType];
                                                return (
                                                    <td key={priceType}>
                                                        <Input
                                                            type="number"
                                                            name={`${leader.name}-${priceType}`}
                                                            onChange={(event) => handleChange(leader.id, priceType, parseFloat(event.target.value))}
                                                            value={streepjesData[leader.id]?.[priceType] ?? ""}
                                                            customClassName="streepkes-input"
                                                        />
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Button text="Opslaan" onClick={handleSubmit} darken uppercase pending={submitPending} />
                        </Form>
                    </FetchedDataLayout>
                </>
            }
        </Popup>
    )
};

export default StreepkesPopup;
