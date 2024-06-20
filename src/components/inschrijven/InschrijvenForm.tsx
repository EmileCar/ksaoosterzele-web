import {useState, useEffect, useRef} from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";

const InschrijvenForm = () => {
    const scrollRef = useRef(null);
    const scrollRefTop = useRef(null);
    const [tweedeVerblijfplaatsActive, setTweedeVerblijfplaatsActive] = useState(false);
    const [tweedeVerblijfplaatsValue, setTweedeVerblijfplaatsValue] = useState("");
    const { inschrijving, setPopupActive, updateInschrijvingValue, errorStates, isPending } = useRegistrationContext();

    useEffect(() => {
        setTweedeVerblijfplaatsActive(tweedeVerblijfplaatsValue === "ja");
        if (scrollRef.current) {
            //scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [tweedeVerblijfplaatsValue]);

    const handleClickContinueButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPopupActive(true);
    }

    useEffect(() => {
        if(errorStates){
            setTimeout(() => {
                if (scrollRefTop.current) {
                    //const topOffset = scrollRefTop.current.getBoundingClientRect().top;
                    //window.scrollBy({ top: topOffset - 85, behavior: 'smooth' });
                }
            }, 200);
        }
    } , [errorStates]);

    useEffect(() => {
        console.log(inschrijving);
    } , [inschrijving]);

    return (
        inschrijving && <>{isPending ? <p>Verzenden...</p> :
            <div className="inschrijvenForm__wrapper" ref={scrollRefTop}>
                <p>Vul hier de rest van de gegevens in</p>
                {/* {errorStates && <p className="error">{errorStates.general}</p>}
                <form className="inschrijvenForm form">
                    <div className="form-group">
                        <Label text="Voornaam lid:" errorMessage={errorStates.voornaamError}>
                            <Input type="text" name="voornaam" value={inschrijving.voornaam} onChange={(e) => updateInschrijvingValue("voornaam", e.currentTarget.value)} placeholder="Voornaam" />
                        </Label>
                        <Label text="Achternaam lid:" errorMessage={errorStates.achternaamError}>
                            <Input type="text" name="achternaam" value={inschrijving.achternaam} onChange={(e) => updateInschrijvingValue("achternaam", e.currentTarget.value)} placeholder="Achternaam" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <div className="form-group__half">
                            <Label text="Geboortedatum:" errorMessage={errorStates.geboortedatumError}>
                                <Input type="date" name="geboortedatum" value={inschrijving.geboortedatum} onChange={(e) => updateInschrijvingValue("geboortedatum", e.currentTarget.value)} placeholder="Geboortedatum" />
                            </Label>
                            <Label text="Geslacht:" errorMessage={errorStates.geslachtError} customClassName={"geslacht-label"}>
                                <select className="input" name="geslacht" value={inschrijving.geslacht} onChange={(e) => updateInschrijvingValue("geslacht", e.currentTarget.value)}>
                                    <option value="M">M</option>
                                    <option value="X">X</option>
                                </select>
                            </Label>
                        </div>
                        <Label text="Geboorteplaats:" errorMessage={errorStates.geboorteplaatsError}>
                            <Input type="text" name="geboorteplaats" value={inschrijving.geboorteplaats} onChange={(e) => updateInschrijvingValue("geboorteplaats", e.currentTarget.value)} placeholder="Geboorteplaats" />
                        </Label>
                    </div>
                    <div className="break">
                        <p>Vul hier de gegevens van de eerste verblijfplaats in</p>
                    </div>
                    <div className="form-group">
                        <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.voornaamOuderError}>
                            <Input type="text" name="Voornaam ouder/voogd" value={inschrijving.voornaamOuder} onChange={(e) => updateInschrijvingValue("voornaamOuder", e.currentTarget.value)} placeholder="Voornaam" />
                        </Label>
                        <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.achternaamOuderError}>
                            <Input type="text" name="Achternaam ouder/voogd" value={inschrijving.achternaamOuder} onChange={(e) => updateInschrijvingValue("achternaamOuder", e.currentTarget.value)} placeholder="Achternaam" />
                        </Label>
                    </div>
                    <Label text="Straat + huisnummer:" errorMessage={errorStates.straatEnHuisnummerError}>
                        <Input type="text" name="straatEnHuisnummer" value={inschrijving.straatEnHuisnummer} onChange={(e) => updateInschrijvingValue("straatEnHuisnummer", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                    </Label>
                    <div className="form-group">
                        <Label text="Postcode:" errorMessage={errorStates.postcodeError}>
                            <Input type="text" name="postcode" value={inschrijving.postcode} onChange={(e) => updateInschrijvingValue("postcode", e.currentTarget.value)} placeholder="Postcode" />
                        </Label>
                        <Label text="Gemeente:" errorMessage={errorStates.gemeenteError}>
                            <Input type="text" name="gemeente" value={inschrijving.gemeente} onChange={(e) => updateInschrijvingValue("gemeente", e.currentTarget.value)} placeholder="Gemeente" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label text="Gsm-nummer:" errorMessage={errorStates.gsmNummerError}>
                            <Input type="text" name="gsmNummer" value={inschrijving.gsmNummer} onChange={(e) => updateInschrijvingValue("gsmNummer", e.currentTarget.value)} placeholder="Gsm-nummer" />
                        </Label>
                        <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telefoonnummerError}>
                            <Input type="text" name="telefoonnummer" value={inschrijving.telefoonnummer} onChange={(e) => updateInschrijvingValue("telefoonnummer", e.currentTarget.value)} placeholder="Telefoonnummer" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label text="Email:" errorMessage={errorStates.emailError}>
                            <Input type="text" name="email" value={inschrijving.email} onChange={(e) => updateInschrijvingValue("email", e.currentTarget.value)} placeholder="Email" />
                        </Label>
                    </div>
                    <div className="break">
                        <label>
                            <p>Is er sprake van een eventuele tweede verblijfplaats?</p>
                            <div className="buttons">
                                <span className={`button inherit-font ${tweedeVerblijfplaatsValue === "ja" ? "active" : "button-inverted"}`} onClick={() => setTweedeVerblijfplaatsValue("ja")}>
                                    Ja
                                </span>
                                <span className={`button inherit-font ${tweedeVerblijfplaatsValue === "nee" ? "active" : "button-inverted"}`} onClick={() => setTweedeVerblijfplaatsValue("nee")}>
                                    Nee
                                </span>
                            </div>
                        </label>
                    </div>
                    {tweedeVerblijfplaatsActive && (
                        <>
                            <p>Vul hier de gegevens van de tweede verblijfplaats in</p>
                            <div className="form-group">
                                <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.tweedeVoornaamOuderError}>
                                    <Input type="text" name="Voornaam tweede ouder/voogd" value={inschrijving.tweedeVoornaamOuder} onChange={(e) => updateInschrijvingValue("tweedeVoornaamOuder", e.currentTarget.value)} placeholder="Voornaam" />
                                </Label>
                                <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.tweedeAchternaamOuderError}>
                                    <Input type="text" name="Achternaam tweede ouder/voogd" value={inschrijving.tweedeAchternaamOuder} onChange={(e) => updateInschrijvingValue("tweedeAchternaamOuder", e.currentTarget.value)} placeholder="Achternaam" />
                                </Label>
                            </div>
                            <Label text="Straat + huisnummer:" errorMessage={errorStates.tweedeStraatEnHuisnummerError}>
                                <Input type="text" name="tweedeStraatEnHuisnummer" value={inschrijving.tweedeStraatEnHuisnummer} onChange={(e) => updateInschrijvingValue("tweedeStraatEnHuisnummer", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                            </Label>
                            <div className="form-group">
                                <Label text="Postcode:" errorMessage={errorStates.tweedePostcodeError}>
                                    <Input type="text" name="tweedePostcode" value={inschrijving.tweedePostcode} onChange={(e) => updateInschrijvingValue("tweedePostcode", e.currentTarget.value)} placeholder="Postcode" />
                                </Label>
                                <Label text="Gemeente:" errorMessage={errorStates.tweedeGemeenteError}>
                                    <Input type="text" name="tweedeGemeente" value={inschrijving.tweedeGemeente} onChange={(e) => updateInschrijvingValue("tweedeGemeente", e.currentTarget.value)} placeholder="Gemeente" />
                                </Label>
                            </div>
                            <div className="form-group">
                                <Label text="Gsm-nummer:" errorMessage={errorStates.tweedeGsmNummerError}>
                                    <Input type="text" name="tweedeGsmNummer" value={inschrijving.tweedeGsmNummer} onChange={(e) => updateInschrijvingValue("tweedeGsmNummer", e.currentTarget.value)} placeholder="Gsm-nummer" />
                                </Label>
                                <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.tweedeTelefoonnummerError}>
                                    <Input type="text" name="tweedeTelefoonnummer" value={inschrijving.tweedeTelefoonnummer} onChange={(e) => updateInschrijvingValue("tweedeTelefoonnummer", e.currentTarget.value)} placeholder="Telefoonnummer" />
                                </Label>
                            </div>
                            <div className="form-group">
                                <Label text="Email:" errorMessage={errorStates.tweedeEmailError}>
                                    <Input type="text" name="tweedeEmail" value={inschrijving.tweedeEmail} onChange={(e) => updateInschrijvingValue("tweedeEmail", e.currentTarget.value)} placeholder="Email" />
                                </Label>
                            </div>
                        </>
                    )}
                    {(tweedeVerblijfplaatsValue !== "") && (
                        <div ref={scrollRef} className="break">
                            <p>Als alle gegevens in orde zijn, kun je verdergaan naar het bevestigingscherm met verdere info</p>
                            <button onClick={(e) => handleClickContinueButton(e)} className="button inherit-font submit-button">Ga verder</button>
                        </div>
                    )}
                </form> */}
            </div>
        }</>
    );
}

export default InschrijvenForm;