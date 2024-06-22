import {useState, useEffect, useRef} from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import Registration from "../../types/Registration";
import { sendInschrijving } from "../../services/registrationService";
import ConfirmPopup from "./popups/ConfirmPopup";
import LoadingSpinner from "../loading/LoadingSpinner";

const RegistrationForm = () => {
    const { inschrijving, errorStates, updateRegistrationValue, isPending } = useRegistrationContext();
    const [tweedeVerblijfplaatsActive, setTweedeVerblijfplaatsActive] = useState<boolean | null>(null);
    const [showContinueButton, setShowContinueButton] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scrollRefToTop = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(tweedeVerblijfplaatsActive === null) return;
        setShowContinueButton(true);
        if (tweedeVerblijfplaatsActive === false && scrollRef.current) {
            setTimeout(() => {
                if(scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    } , [tweedeVerblijfplaatsActive]);

    const handleClickContinueButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowPopup(true);
    };

    useEffect(() => {
        if(isPending){
            setTimeout(() => {
                if (scrollRefToTop.current) {
                    const topOffset = scrollRefToTop.current.getBoundingClientRect().top;
                    window.scrollBy({ top: topOffset - 85, behavior: 'smooth' });
                }
            }, 1200);
        }
    } , [isPending]);

    return (
        inschrijving &&
        <>
            <div className="inschrijvenForm__wrapper" ref={scrollRefToTop}>
                {isPending ? <LoadingSpinner text={"Bezig met het controleren van de inschrijving"}/> : <>
                    <p>Vul hier de rest van de gegevens in</p>
                    {errorStates.groupError && <p className="error" style={{paddingTop: "1rem"}}>{errorStates.groupError}</p>}
                    <form className="inschrijvenForm form">
                        <div className="form-group">
                            <Label text="Voornaam lid:" errorMessage={errorStates.firstNameError}>
                                <Input type="text" name="voornaam" value={inschrijving?.firstName} onChange={(e) => updateRegistrationValue("firstName", e.currentTarget.value)} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam lid:" errorMessage={errorStates.lastNameError}>
                                <Input type="text" name="achternaam" value={inschrijving.lastName} onChange={(e) => updateRegistrationValue("lastName", e.currentTarget.value)} placeholder="Achternaam" />
                            </Label>
                        </div>
                        <div className="form-group">
                            <div className="form-group__half">
                                <Label text="Geboortedatum:" errorMessage={errorStates.birthdateError}>
                                    <Input type="date" name="geboortedatum" value={inschrijving.birthdate} onChange={(e) => updateRegistrationValue("birthdate", e.currentTarget.value)} placeholder="Geboortedatum" />
                                </Label>
                                <Label text="Geslacht:" errorMessage={errorStates.genderError} customClassName={"geslacht-label"}>
                                    <select className="input" name="geslacht" value={inschrijving.gender} onChange={(e) => updateRegistrationValue("gender", e.currentTarget.value)}>
                                        <option value="M">M</option>
                                        <option value="X">X</option>
                                    </select>
                                </Label>
                            </div>
                            <Label text="Geboorteplaats:" errorMessage={errorStates.birthplaceError}>
                                <Input type="text" name="geboorteplaats" value={inschrijving.birthplace} onChange={(e) => updateRegistrationValue("birthplace", e.currentTarget.value)} placeholder="Geboorteplaats" />
                            </Label>
                        </div>
                        <div className="break">
                            <p>Vul hier de gegevens van de eerste verblijfplaats in</p>
                        </div>
                        <div className="form-group">
                            <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.parentFirstNameError}>
                                <Input type="text" name="Voornaam ouder/voogd" value={inschrijving.parentFirstName} onChange={(e) => updateRegistrationValue("parentFirstName", e.currentTarget.value)} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.parentLastNameError}>
                                <Input type="text" name="Achternaam ouder/voogd" value={inschrijving.parentLastName} onChange={(e) => updateRegistrationValue("parentLastName", e.currentTarget.value)} placeholder="Achternaam" />
                            </Label>
                        </div>
                        <Label text="Straat + huisnummer:" errorMessage={errorStates.addressError}>
                            <Input type="text" name="straatEnHuisnummer" value={inschrijving.address} onChange={(e) => updateRegistrationValue("address", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                        </Label>
                        <div className="form-group">
                            <Label text="Postcode:" errorMessage={errorStates.postalCodeError}>
                                <Input type="text" name="postcode" value={inschrijving.postalCode} onChange={(e) => updateRegistrationValue("postalCode", e.currentTarget.value)} placeholder="Postcode" />
                            </Label>
                            <Label text="Gemeente:" errorMessage={errorStates.townError}>
                                <Input type="text" name="gemeente" value={inschrijving.town} onChange={(e) => updateRegistrationValue("town", e.currentTarget.value)} placeholder="Gemeente" />
                            </Label>
                        </div>
                        <div className="form-group">
                            <Label text="Gsm-nummer:" errorMessage={errorStates.phoneNumberError}>
                                <Input type="text" name="gsmNummer" value={inschrijving.phoneNumber} onChange={(e) => updateRegistrationValue("phoneNumber", e.currentTarget.value)} placeholder="Gsm-nummer" />
                            </Label>
                            <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telephoneNumber}>
                                <Input type="text" name="telefoonnummer" value={inschrijving.telephoneNumber} onChange={(e) => updateRegistrationValue("telephoneNumber", e.currentTarget.value)} placeholder="Telefoonnummer" />
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
                                    <span className={`button inherit-font ${tweedeVerblijfplaatsActive === true ? "active" : "button-inverted"}`} onClick={() => setTweedeVerblijfplaatsActive(true)}>
                                        Ja
                                    </span>
                                    <span className={`button inherit-font ${tweedeVerblijfplaatsActive === false ? "active" : "button-inverted"}`} onClick={() => setTweedeVerblijfplaatsActive(false)}>
                                        Nee
                                    </span>
                                </div>
                            </label>
                        </div>
                        {tweedeVerblijfplaatsActive && (
                            <>
                                <p>Vul hier de gegevens van de tweede verblijfplaats in</p>
                                <div className="form-group">
                                    <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.secondParentFirstNameError}>
                                        <Input type="text" name="Voornaam tweede ouder/voogd" value={inschrijving.secondParentFirstName} onChange={(e) => updateRegistrationValue("tweedeVoornaamOuder", e.currentTarget.value)} placeholder="Voornaam" />
                                    </Label>
                                    <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.secondParentLastNameError}>
                                        <Input type="text" name="Achternaam tweede ouder/voogd" value={inschrijving.secondParentLastName} onChange={(e) => updateRegistrationValue("tweedeAchternaamOuder", e.currentTarget.value)} placeholder="Achternaam" />
                                    </Label>
                                </div>
                                <Label text="Straat + huisnummer:" errorMessage={errorStates.secondAddressError}>
                                    <Input type="text" name="tweedeStraatEnHuisnummer" value={inschrijving.secondAddress} onChange={(e) => updateRegistrationValue("tweedeStraatEnHuisnummer", e.currentTarget.value)} placeholder="Straat + huisnummer" />
                                </Label>
                                <div className="form-group">
                                    <Label text="Postcode:" errorMessage={errorStates.secondPostalCodeError}>
                                        <Input type="text" name="tweedePostcode" value={inschrijving.secondPostalCode} onChange={(e) => updateRegistrationValue("tweedePostcode", e.currentTarget.value)} placeholder="Postcode" />
                                    </Label>
                                    <Label text="Gemeente:" errorMessage={errorStates.secondTownError}>
                                        <Input type="text" name="tweedeGemeente" value={inschrijving.secondTown} onChange={(e) => updateRegistrationValue("tweedeGemeente", e.currentTarget.value)} placeholder="Gemeente" />
                                    </Label>
                                </div>
                                <div className="form-group">
                                    <Label text="Gsm-nummer:" errorMessage={errorStates.secondPhoneNumberError}>
                                        <Input type="text" name="tweedeGsmNummer" value={inschrijving.secondPhoneNumber} onChange={(e) => updateRegistrationValue("tweedeGsmNummer", e.currentTarget.value)} placeholder="Gsm-nummer" />
                                    </Label>
                                    <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.secondTelephoneNumberError}>
                                        <Input type="text" name="tweedeTelefoonnummer" value={inschrijving.secondTelephoneNumber} onChange={(e) => updateRegistrationValue("tweedeTelefoonnummer", e.currentTarget.value)} placeholder="Telefoonnummer" />
                                    </Label>
                                </div>
                                <div className="form-group">
                                    <Label text="Email:" errorMessage={errorStates.secondEmailError}>
                                        <Input type="text" name="tweedeEmail" value={inschrijving.secondEmail} onChange={(e) => updateRegistrationValue("tweedeEmail", e.currentTarget.value)} placeholder="Email" />
                                    </Label>
                                </div>
                            </>
                        )}
                        {showContinueButton && (
                            <div className="break" ref={scrollRef}>
                                <p>Als alle gegevens in orde zijn, kun je verdergaan naar het bevestigingscherm met verdere info</p>
                                <button onClick={(e) => handleClickContinueButton(e)} className="button inherit-font submit-button">Ga verder</button>
                            </div>
                        )}
                    </form>
                    {showPopup && <ConfirmPopup onClose={() => setShowPopup(false)} />}
                </>}
            </div>
        </>
    );
}

export default RegistrationForm;