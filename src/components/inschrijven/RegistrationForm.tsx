import {useState, useEffect, useRef} from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import Registration from "../../types/Registration";
import { sendInschrijving } from "../../services/registrationService";
import ConfirmPopup from "./popups/ConfirmPopup";
import LoadingSpinner from "../loading/LoadingSpinner";

const RegistrationForm = () => {
    const { values, errorStates, handleValueChange, isPending } = useRegistrationContext();
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
        values.notEmpty() &&
        <>
            <div className="inschrijvenForm__wrapper" ref={scrollRefToTop}>
                {isPending ? <LoadingSpinner text={"Bezig met het controleren van de inschrijving"}/> : <>
                    <p>Vul hier de rest van de gegevens in</p>
                    {errorStates.groupError && <p className="error" style={{paddingTop: "1rem"}}>{errorStates.groupError}</p>}
                    <form className="inschrijvenForm form">
                        <div className="form-group">
                            <Label text="Voornaam lid:" errorMessage={errorStates.firstNameError} required>
                                <Input type="text" name="firstName" value={values?.firstName} onChange={handleValueChange} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam lid:" errorMessage={errorStates.lastNameError} required>
                                <Input type="text" name="lastName" value={values.lastName} onChange={handleValueChange} placeholder="Achternaam" />
                            </Label>
                        </div>
                        <div className="form-group">
                            <div className="form-group__half">
                                <Label text="Geboortedatum:" errorMessage={errorStates.birthdateError} required>
                                    <Input type="date" name="birthdate" value={values.birthdate} onChange={handleValueChange} placeholder="Geboortedatum" />
                                </Label>
                                <Label text="Geslacht:" errorMessage={errorStates.genderError} customClassName={"geslacht-label"} required>
                                    <select className="input" name="gender" value={values.gender} onChange={handleValueChange}>
                                        <option value="M">M</option>
                                        <option value="X">X</option>
                                    </select>
                                </Label>
                            </div>
                            <Label text="Geboorteplaats:" errorMessage={errorStates.birthplaceError} required>
                                <Input type="text" name="birthplace" value={values.birthplace} onChange={handleValueChange} placeholder="Geboorteplaats" />
                            </Label>
                        </div>
                        <div className="break">
                            <p>Vul hier de gegevens van de eerste verblijfplaats in</p>
                        </div>
                        <div className="form-group">
                            <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.parentFirstNameError} required>
                                <Input type="text" name="parentFirstName" value={values.parentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.parentLastNameError} required>
                                <Input type="text" name="parentLastName" value={values.parentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                            </Label>
                        </div>
                        <Label text="Straat + huisnummer:" errorMessage={errorStates.addressError} required>
                            <Input type="text" name="address" value={values.address} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                        </Label>
                        <div className="form-group">
                            <Label text="Postcode:" errorMessage={errorStates.postalCodeError} required>
                                <Input type="text" name="postalCode" value={values.postalCode} onChange={handleValueChange} placeholder="Postcode" />
                            </Label>
                            <Label text="Gemeente:" errorMessage={errorStates.townError} required>
                                <Input type="text" name="town" value={values.town} onChange={handleValueChange} placeholder="Gemeente" />
                            </Label>
                        </div>
                        <div className="form-group">
                            <Label text="Gsm-nummer:" errorMessage={errorStates.phoneNumberError} required>
                                <Input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                            </Label>
                            <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telephoneNumber}>
                                <Input type="text" name="telephoneNumber" value={values.telephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                            </Label>
                        </div>
                        <div className="form-group">
                            <Label text="Email:" errorMessage={errorStates.emailError} required>
                                <Input type="text" name="email" value={values.email} onChange={handleValueChange} placeholder="Email" />
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
                                        <Input type="text" name="secondParentFirstName" value={values.secondParentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                                    </Label>
                                    <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.secondParentLastNameError}>
                                        <Input type="text" name="secondParentLastName" value={values.secondParentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                                    </Label>
                                </div>
                                <Label text="Straat + huisnummer:" errorMessage={errorStates.secondAddressError}>
                                    <Input type="text" name="secondAddress" value={values.secondAddress} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                                </Label>
                                <div className="form-group">
                                    <Label text="Postcode:" errorMessage={errorStates.secondPostalCodeError}>
                                        <Input type="text" name="secondPostalCode" value={values.secondPostalCode} onChange={handleValueChange} placeholder="Postcode" />
                                    </Label>
                                    <Label text="Gemeente:" errorMessage={errorStates.secondTownError}>
                                        <Input type="text" name="secondTown" value={values.secondTown} onChange={handleValueChange} placeholder="Gemeente" />
                                    </Label>
                                </div>
                                <div className="form-group">
                                    <Label text="Gsm-nummer:" errorMessage={errorStates.secondPhoneNumberError}>
                                        <Input type="text" name="secondPhoneNumber" value={values.secondPhoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                                    </Label>
                                    <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.secondTelephoneNumberError}>
                                        <Input type="text" name="secondTelephoneNumber" value={values.secondTelephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                                    </Label>
                                </div>
                                <div className="form-group">
                                    <Label text="Email:" errorMessage={errorStates.secondEmailError}>
                                        <Input type="text" name="secondEmail" value={values.secondEmail} onChange={handleValueChange} placeholder="Email" />
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