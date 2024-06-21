import {useState, useEffect, useRef} from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import Registration from "../../types/Registration";

const InschrijvenForm = () => {
    const { inschrijving, errorStates, updateRegistrationValue } = useRegistrationContext();
    const [isPending, setIsPending] = useState(false);
    const [tweedeVerblijfplaatsValue, setTweedeVerblijfplaatsValue] = useState("");
    const [tweedeVerblijfplaatsActive, setTweedeVerblijfplaatsActive] = useState(false);

    return (
        inschrijving && <>{isPending ? <p>Verzenden...</p> :
            <div className="inschrijvenForm__wrapper">
                <p>Vul hier de rest van de gegevens in</p>
                {errorStates && <p className="error">{errorStates.general}</p>}
                <form className="inschrijvenForm form">
                    <div className="form-group">
                        <Label text="Voornaam lid:" errorMessage={errorStates.firstNameError}>
                            <Input type="text" name="voornaam" value={inschrijving?.firstName} onChange={(e) => updateRegistrationValue("voornaam", e.currentTarget.value)} placeholder="Voornaam" />
                        </Label>
                        <Label text="Achternaam lid:" errorMessage={errorStates.lastNameError}>
                            <Input type="text" name="achternaam" value={inschrijving.lastName} onChange={(e) => updateRegistrationValue("achternaam", e.currentTarget.value)} placeholder="Achternaam" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <div className="form-group__half">
                            <Label text="Geboortedatum:" errorMessage={errorStates.geboortedatumError}>
                                {/* <Input type="date" name="geboortedatum" value={inschrijving.birthdate.toString()} onChange={(e) => inschrijving.updateRegistrationValue("geboortedatum", e.currentTarget.value)} placeholder="Geboortedatum" /> */}
                            </Label>
                            <Label text="Geslacht:" errorMessage={errorStates.geslachtError} customClassName={"geslacht-label"}>
                                <select className="input" name="geslacht" value={inschrijving.gender} onChange={(e) => updateRegistrationValue("geslacht", e.currentTarget.value)}>
                                    <option value="M">M</option>
                                    <option value="X">X</option>
                                </select>
                            </Label>
                        </div>
                        <Label text="Geboorteplaats:" errorMessage={errorStates.geboorteplaatsError}>
                            <Input type="text" name="geboorteplaats" value={inschrijving.birthplace} onChange={(e) => updateRegistrationValue("geboorteplaats", e.currentTarget.value)} placeholder="Geboorteplaats" />
                        </Label>
                    </div>
                    <div className="break">
                        <p>Vul hier de gegevens van de eerste verblijfplaats in</p>
                    </div>
                    <div className="form-group">
                        <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.voornaamOuderError}>
                            <Input type="text" name="Voornaam ouder/voogd" value={inschrijving.parentFirstName} onChange={(e) => updateRegistrationValue("voornaamOuder", e.currentTarget.value)} placeholder="Voornaam" />
                        </Label>
                        <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.achternaamOuderError}>
                            <Input type="text" name="Achternaam ouder/voogd" value={inschrijving.parentLastName} onChange={(e) => updateRegistrationValue("achternaamOuder", e.currentTarget.value)} placeholder="Achternaam" />
                        </Label>
                    </div>
                    <Label text="Straat + huisnummer:" errorMessage={errorStates.straatEnHuisnummerError}>
                        <Input type="text" name="straatEnHuisnummer" value={inschrijving.address} onChange={(e) => updateRegistrationValue("straatEnHuisnummer", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                    </Label>
                    <div className="form-group">
                        <Label text="Postcode:" errorMessage={errorStates.postcodeError}>
                            <Input type="text" name="postcode" value={inschrijving.postalCode} onChange={(e) => updateRegistrationValue("postcode", e.currentTarget.value)} placeholder="Postcode" />
                        </Label>
                        <Label text="Gemeente:" errorMessage={errorStates.gemeenteError}>
                            <Input type="text" name="gemeente" value={inschrijving.town} onChange={(e) => updateRegistrationValue("gemeente", e.currentTarget.value)} placeholder="Gemeente" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label text="Gsm-nummer:" errorMessage={errorStates.phoneNumber}>
                            <Input type="text" name="gsmNummer" value={inschrijving.phoneNumber} onChange={(e) => updateRegistrationValue("gsmNummer", e.currentTarget.value)} placeholder="Gsm-nummer" />
                        </Label>
                        <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telephoneNumber}>
                            <Input type="text" name="telefoonnummer" value={inschrijving.telephoneNumber} onChange={(e) => updateRegistrationValue("telefoonnummer", e.currentTarget.value)} placeholder="Telefoonnummer" />
                        </Label>
                    </div>
                    <div className="form-group">
                        <Label text="Email:" errorMessage={errorStates.emailError}>
                            <Input type="text" name="email" value={inschrijving.email} onChange={(e) => updateRegistrationValue("email", e.currentTarget.value)} placeholder="Email" />
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
                                    <Input type="text" name="Voornaam tweede ouder/voogd" value={inschrijving.secondParentFirstName} onChange={(e) => updateRegistrationValue("tweedeVoornaamOuder", e.currentTarget.value)} placeholder="Voornaam" />
                                </Label>
                                <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.tweedeAchternaamOuderError}>
                                    <Input type="text" name="Achternaam tweede ouder/voogd" value={inschrijving.secondParentLastName} onChange={(e) => updateRegistrationValue("tweedeAchternaamOuder", e.currentTarget.value)} placeholder="Achternaam" />
                                </Label>
                            </div>
                            <Label text="Straat + huisnummer:" errorMessage={errorStates.tweedeStraatEnHuisnummerError}>
                                <Input type="text" name="tweedeStraatEnHuisnummer" value={inschrijving.secondAddress} onChange={(e) => updateRegistrationValue("tweedeStraatEnHuisnummer", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                            </Label>
                            <div className="form-group">
                                <Label text="Postcode:" errorMessage={errorStates.tweedePostcodeError}>
                                    <Input type="text" name="tweedePostcode" value={inschrijving.secondPostalCode} onChange={(e) => updateRegistrationValue("tweedePostcode", e.currentTarget.value)} placeholder="Postcode" />
                                </Label>
                                <Label text="Gemeente:" errorMessage={errorStates.tweedeGemeenteError}>
                                    <Input type="text" name="tweedeGemeente" value={inschrijving.secondTown} onChange={(e) => updateRegistrationValue("tweedeGemeente", e.currentTarget.value)} placeholder="Gemeente" />
                                </Label>
                            </div>
                            <div className="form-group">
                                <Label text="Gsm-nummer:" errorMessage={errorStates.tweedeGsmNummerError}>
                                    <Input type="text" name="tweedeGsmNummer" value={inschrijving.secondPhoneNumber} onChange={(e) => updateRegistrationValue("tweedeGsmNummer", e.currentTarget.value)} placeholder="Gsm-nummer" />
                                </Label>
                                <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.tweedeTelefoonnummerError}>
                                    <Input type="text" name="tweedeTelefoonnummer" value={inschrijving.secondTelephoneNumber} onChange={(e) => updateRegistrationValue("tweedeTelefoonnummer", e.currentTarget.value)} placeholder="Telefoonnummer" />
                                </Label>
                            </div>
                            <div className="form-group">
                                <Label text="Email:" errorMessage={errorStates.tweedeEmailError}>
                                    <Input type="text" name="tweedeEmail" value={inschrijving.secondEmail} onChange={(e) => updateRegistrationValue("tweedeEmail", e.currentTarget.value)} placeholder="Email" />
                                </Label>
                            </div>
                        </>
                    )}
                    {/* {(tweedeVerblijfplaatsValue !== "") && (
                        <div ref={scrollRef} className="break">
                            <p>Als alle gegevens in orde zijn, kun je verdergaan naar het bevestigingscherm met verdere info</p>
                            <button onClick={(e) => handleClickContinueButton(e)} className="button inherit-font submit-button">Ga verder</button>
                        </div>
                    )} */}
                </form>
            </div>
        }</>
    );
}

export default InschrijvenForm;