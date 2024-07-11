import { useEffect, useState, useRef } from "react";
import Popup from "../../popup/Popup";
import Button from "../../button/Button";

const ConfirmPopup = ({submit} : {submit: (allowMedia: boolean | null) => void}) => {
    const [allowMedia, setAllowMedia] = useState<boolean | null>(null);
    const [showConfirm, setShowConfirm] = useState<boolean | null>(null);
    const [confirmPrivacy, setConfirmPrivacy] = useState(false);
    const [showFinal, setShowFinal] = useState(false);
    const [confirmFinal, setConfirmFinal] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollRef2 = useRef<HTMLDivElement>(null);
    const scrollRefFinal = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(allowMedia !== null) {
            setShowConfirm(true);
            setTimeout(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [allowMedia]);

    useEffect(() => {
        if(confirmPrivacy || confirmPrivacy) {
            setShowFinal(true);
            setTimeout(() => {
                if (scrollRef2.current) {
                    scrollRef2.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [confirmPrivacy]);

    useEffect(() => {
        if(confirmFinal) {
            setTimeout(() => {
                if (scrollRefFinal.current) {
                    scrollRefFinal.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [confirmFinal]);

    return (
        <Popup title="Bevestiging inschrijving">
            <div className="confirm__container">
                <div>
                    <p>Doorheen het jaar worden er foto's en filmpjes gemaakt van de activiteiten om die op de website en sociale media van KSA Oosterzele te plaatsen.</p>
                    <p>Geeft u toestemming dat er beeldmateriaal van uw kind gemaakt mag worden voor deze publicatie?</p>
                </div>
                <div className="buttons">
                    <Button text="Ja" onClick={() => setAllowMedia(true)} customClassName={`inschrijving-button ${allowMedia ? "active" : "button-inverted"}`} round/>
                    <Button text="Nee" onClick={() => setAllowMedia(false)} customClassName={`inschrijving-button ${allowMedia === false ? "active" : "button-inverted"}`} round/>
                </div>
            </div>
            {showConfirm &&
            <div className="confirm__container">
                <p>
                    De ingevulde persoonsgegevens worden bewaard en verwerkt door KSA Reik je hand Oosterzele.
                </p>
                <p>
                    De gegevens gebruiken we om u te contacteren en op de hoogte te houden van onze werking en activiteiten.
                </p>
                <p>
                    Bovendien geven we de gegevens door aan KSA Nationaal vzw via het digitaal ledenbestand (Digit) voor de aansluiting bij KSA Nationaal vzw, voor het afsluiten van de nodige verzekeringen en het versturen van de leden- en leidingstijdschriften. 
                    Meer informatie over ons beleid rond gegevensverwerking en uw rechten omtrent uw gegevens vindt u in onze privacyverklaring op <a target="_blank" href="https://www.ksa.be/privacyverklaring">www.ksa.be/privacyverklaring</a>. 
                </p>
                <p className="margin-top">
                    Begrijpt u deze privacyverklaring en gaat u ermee akkoord?
                </p>
                <div className="buttons" ref={scrollRef}>
                    <Button text="Ja" onClick={() => setConfirmPrivacy(true)} customClassName={`inschrijving-button ${confirmPrivacy ? "active" : "button-inverted"}`} round/>
                </div>
            </div>}
            {showFinal &&
            <div className="confirm__container">
                <p><strong>
                    De verstuurder verklaart dat de ingevulde gegevens volledig en correct zijn, en geeft de uitdrukkelijke toestemming met de verwerking ervan. 
                </strong></p>
                <p>De inschrijving wordt pas volledig voltooid wanneer het lidgeld (50 euro) gestort is op de KSA-Rekening BE22390023172547</p>
                <div className="buttons"  ref={scrollRef2}>
                    <Button text="Ja" onClick={() => setConfirmFinal(true)} customClassName={`inschrijving-button ${confirmFinal ? "active" : "button-inverted"}`} round/>
                </div>
            </div>}
            {confirmFinal &&
            <div className="takken__submit-container" ref={scrollRefFinal}>
                <Button text="Verstuur inschrijving" onClick={() => submit(allowMedia)} submit uppercase darken round/>
            </div>}
        </Popup>
    )
};

export default ConfirmPopup;