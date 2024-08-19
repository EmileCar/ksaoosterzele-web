import useForm from "../../../hooks/useForm";
import Popup from "../../popup/Popup";
import Label from "../../form/Label";
import Input from "../../form/Input";
import Button from "../../button/Button";
import Form from "../../form/Form";
import { usePopupContext } from "../../../contexts/PopupContext";
import { SendInvoice } from "../../../types/Invoice";
import { sendInvoices } from "../../../services/invoiceService";
import useFetch from "../../../hooks/useFetch";
import { getLeaders } from "../../../services/leaderService";
import { useEffect, useState } from "react";
import FetchedDataLayout from "../../../layouts/FetchedDataLayout";
import { InputNumber } from "primereact/inputnumber";

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

    const handleChange = (leaderId: number, priceType: PriceType, amount: number | null) => {
        setStreepjesData(prevState => ({
            ...prevState,
            [leaderId]: {
                ...prevState[leaderId],
                [priceType]: amount ?? 0
            }
        }));
    };

    const handleRemoveLeader = (leaderId: number) => {
        setStreepjesData(prevState => {
            const newState = { ...prevState };
            delete newState[leaderId];
            return newState;
        });
    };

    useEffect(() => {
        const newInvoices = Object.keys(streepjesData).map((leaderId) => {
            const leaderData = streepjesData[parseInt(leaderId)];
            const totalAmount = Object.keys(leaderData).reduce((sum, priceType) => {
                const amount = leaderData[priceType as PriceType] || 0;

                if (priceType === PriceType.Andere) {
                    return sum + amount;
                }

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
                        <Input name="name" type="text" value={name ?? ""} onChange={(event) => setName(event.target.value)} focus placeholder="Streepkes van september / kamp 2024"/>
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
                                        <th></th>
                                        <th>Naam</th>
                                        {Object.keys(PriceType).map((key) => <th key={key}>{PriceType[key as keyof typeof PriceType]}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaders && leaders.map(leader => (
                                        streepjesData[leader.id] ? (
                                        <tr key={leader.id}>
                                            <td>
                                                <span className="remove-leader" onClick={() => handleRemoveLeader(leader.id)}>&times;</span>
                                            </td>
                                            <td className="leader-label">{leader.name}</td>
                                            {Object.keys(PriceType).map((key) => {
                                                const priceType = PriceType[key as keyof typeof PriceType];

                                                if (priceType === PriceType.Andere) {
                                                    return (
                                                        <td key={priceType}>
                                                            <InputNumber
                                                                mode="currency"
                                                                currency="EUR"
                                                                locale="nl-BE"
                                                                name={`${leader.name}-${priceType}`}
                                                                onValueChange={(event) => handleChange(leader.id, priceType, event.value ?? null)}
                                                                value={streepjesData[leader.id]?.[priceType] ?? 0}
                                                                className="streepkes-input"
                                                            />
                                                        </td>
                                                    );
                                                }

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
                                            <td className="total">{`€
                                                ${Object.keys(streepjesData[leader.id] || {}).reduce((sum, priceType) => {
                                                    const amount = streepjesData[leader.id]?.[priceType as PriceType] || 0;

                                                    if (priceType === PriceType.Andere) {
                                                        return sum + amount;
                                                    }

                                                    return sum + (PRICES[priceType as PriceType] ?? 0) * amount;
                                                }, 0).toFixed(2)}`}
                                            </td>
                                        </tr>
                                    ) : null
                                    ))}
                                </tbody>
                            </table>
                            <Button text="Opslaan" onClick={handleSubmit} darken uppercase pending={submitPending} />
                        </Form>
                    </FetchedDataLayout>
                </>
            }
        </Popup>
    );
};

export default StreepkesPopup;
