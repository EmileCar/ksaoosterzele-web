import {useState, useEffect, useRef} from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import ConfirmPopup from "./popups/ConfirmPopup";
import LoadingSpinner from "../loading/LoadingSpinner";
import Button from "../button/Button";
import Form from "../form/Form";
import Group from "../form/Group";
import { usePopupContext } from "../../contexts/PopupContext";

const RegistrationForm = () => {
    const { values, errorStates, handleValueChange, isPending, submitValues, changeValue } = useRegistrationContext();
    const { registerPopup, closePopup } = usePopupContext();
    const [tweedeVerblijfplaatsActive, setTweedeVerblijfplaatsActive] = useState<boolean | null>(null);
    const [showContinueButton, setShowContinueButton] = useState(false);
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

    const submitValuesHandler = () => {
        submitValues();
        closePopup();
    }

    const openConfirmPopup = () => {
        registerPopup(<ConfirmPopup changeValue={changeValue} submit={submitValuesHandler} />);
    };

    return (
        values.notEmpty() &&
        <>
            <div className="inschrijvenForm__wrapper" ref={scrollRefToTop}>
                {isPending ? <LoadingSpinner text={"Bezig met het controleren van de inschrijving"}/> : <>
                    <p>Vul hier de rest van de gegevens in</p>
                    {errorStates.groupError && <p className="error" style={{paddingTop: "1rem"}}>{errorStates.groupError}</p>}
                    {errorStates.error && <p className="error" style={{paddingTop: "1rem"}}>Er is een probleem opgetreden: {errorStates.error}</p>}
                    <Form customClassName="inschrijvenForm">
                        <Group>
                            <Label text="Voornaam lid:" errorMessage={errorStates.firstNameError} required>
                                <Input type="text" name="firstName" value={values?.firstName} onChange={handleValueChange} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam lid:" errorMessage={errorStates.lastNameError} required>
                                <Input type="text" name="lastName" value={values.lastName} onChange={handleValueChange} placeholder="Achternaam" />
                            </Label>
                        </Group>
                        <Group>
                            <div className="form-group__half">
                                <Label text="Geboortedatum:" errorMessage={errorStates.birthdateError} required>
                                    <Input type="date" name="birthdate" value={values.birthdate} onChange={handleValueChange} placeholder="Geboortedatum" />
                                </Label>
                                <Label text="Geslacht:" errorMessage={errorStates.genderError} customClassName={"geslacht-label"} required>
                                    <select className="input inherit-font" name="gender" value={values.gender} onChange={handleValueChange}>
                                        <option value="M" selected>M</option>
                                        <option value="X">X</option>
                                    </select>
                                </Label>
                            </div>
                            <Label text="Geboorteplaats:" errorMessage={errorStates.birthplaceError}>
                                <Input type="text" name="birthplace" value={values.birthplace} onChange={handleValueChange} placeholder="Geboorteplaats" />
                            </Label>
                        </Group>
                        <div className="break">
                            <p>Vul hier de gegevens van de eerste verblijfplaats in</p>
                        </div>
                        <Group>
                            <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.parentFirstNameError} required>
                                <Input type="text" name="parentFirstName" value={values.parentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                            </Label>
                            <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.parentLastNameError} required>
                                <Input type="text" name="parentLastName" value={values.parentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                            </Label>
                        </Group>
                        <Label text="Straat + huisnummer:" errorMessage={errorStates.addressError} required>
                            <Input type="text" name="address" value={values.address} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                        </Label>
                        <Group>
                            <Label text="Postcode:" errorMessage={errorStates.postalCodeError} required>
                                <Input type="text" name="postalCode" value={values.postalCode} onChange={handleValueChange} placeholder="Postcode" />
                            </Label>
                            <Label text="Gemeente:" errorMessage={errorStates.townError} required>
                                <Input type="text" name="town" value={values.town} onChange={handleValueChange} placeholder="Gemeente" />
                            </Label>
                        </Group>
                        <Group>
                            <Label text="Gsm-nummer:" errorMessage={errorStates.phoneNumberError} required>
                                <Input type="text" name="phoneNumber" value={values.phoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                            </Label>
                            <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.telephoneNumber}>
                                <Input type="text" name="telephoneNumber" value={values.telephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                            </Label>
                        </Group>
                        <Group>
                            <Label text="Email:" errorMessage={errorStates.emailError} required>
                                <Input type="text" name="email" value={values.email} onChange={handleValueChange} placeholder="Email" />
                            </Label>
                        </Group>
                        <div className="break">
                            <div>
                                <p>Is er sprake van een eventuele tweede verblijfplaats?</p>
                                <div className="buttons">
                                    <Button text="Ja" onClick={() => setTweedeVerblijfplaatsActive(true)} customClassName={`inschrijving-button ${tweedeVerblijfplaatsActive === true ? "active" : "button-inverted"}`} hover round />
                                    <Button text="Nee" onClick={() => setTweedeVerblijfplaatsActive(false)} customClassName={`inschrijving-button ${tweedeVerblijfplaatsActive === false ? "active" : "button-inverted"}`} hover round/>
                                </div>
                            </div>
                        </div>
                        {tweedeVerblijfplaatsActive && (
                            <>
                                <p>Vul hier de gegevens van de tweede verblijfplaats in</p>
                                <Group>
                                    <Label text="Voornaam ouder/voogd:" errorMessage={errorStates.secondParentFirstNameError}>
                                        <Input type="text" name="secondParentFirstName" value={values.secondParentFirstName} onChange={handleValueChange} placeholder="Voornaam" />
                                    </Label>
                                    <Label text="Achternaam ouder/voogd:" errorMessage={errorStates.secondParentLastNameError}>
                                        <Input type="text" name="secondParentLastName" value={values.secondParentLastName} onChange={handleValueChange} placeholder="Achternaam" />
                                    </Label>
                                </Group>
                                <Label text="Straat + huisnummer:" errorMessage={errorStates.secondAddressError}>
                                    <Input type="text" name="secondAddress" value={values.secondAddress} onChange={handleValueChange} placeholder="Straat + huisnummer" />
                                </Label>
                                <Group>
                                    <Label text="Postcode:" errorMessage={errorStates.secondPostalCodeError}>
                                        <Input type="text" name="secondPostalCode" value={values.secondPostalCode} onChange={handleValueChange} placeholder="Postcode" />
                                    </Label>
                                    <Label text="Gemeente:" errorMessage={errorStates.secondTownError}>
                                        <Input type="text" name="secondTown" value={values.secondTown} onChange={handleValueChange} placeholder="Gemeente" />
                                    </Label>
                                </Group>
                                <Group>
                                    <Label text="Gsm-nummer:" errorMessage={errorStates.secondPhoneNumberError}>
                                        <Input type="text" name="secondPhoneNumber" value={values.secondPhoneNumber} onChange={handleValueChange} placeholder="Gsm-nummer" />
                                    </Label>
                                    <Label text="Telefoonnummer/Gsm 2:" errorMessage={errorStates.secondTelephoneNumberError}>
                                        <Input type="text" name="secondTelephoneNumber" value={values.secondTelephoneNumber} onChange={handleValueChange} placeholder="Telefoonnummer" />
                                    </Label>
                                </Group>
                                <Group>
                                    <Label text="Email:" errorMessage={errorStates.secondEmailError}>
                                        <Input type="text" name="secondEmail" value={values.secondEmail} onChange={handleValueChange} placeholder="Email" />
                                    </Label>
                                </Group>
                            </>
                        )}
                        {showContinueButton && (
                            <div className="break" ref={scrollRef}>
                                <p>Als alle gegevens in orde zijn, kun je verdergaan naar het bevestigingscherm met verdere info</p>
                                <Button text="Ga verder" onClick={openConfirmPopup} round darken uppercase submit/>
                            </div>
                        )}
                    </Form>
                </>}
            </div>
        </>
    );
}

export default RegistrationForm;