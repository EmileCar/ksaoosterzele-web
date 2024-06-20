import { useState, useEffect, useCallback } from "react";
import Group from "../../types/Group";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import useFetch from "../../hooks/useFetch";
import { getGroups } from "../../services/groupService";
import Registration from "../../types/Registration";
import ChooseTakPopup from "./popups/ChooseTakPopup";

const Teaser = () => {
	const [name, setName] = useState<string>("");
	const [tak, setTak] = useState<Group | null>(null);
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [errorStates, setErrorStates] = useState({
		nameError: "",
		takError: "",
	});
	const [isPopupActive, setIsPopupActive] = useState(false);
	const { pending, data: groups, error } = useFetch<Group[]>(getGroups);
	const { inschrijving, setInschrijving, updateInschrijvingValue } = useRegistrationContext();

	const yearToGroupMap: { [key: string]: Group | string | null} = {
		"1ste leerjaar": groups && groups[0],
		"2de leerjaar": groups && groups[0],
		"3de leerjaar": groups && groups[0],
		"4de leerjaar": groups && groups[1],
		"5de leerjaar": groups && groups[1],
		"6de leerjaar": groups && groups[2],
		"1ste middelbaar": groups && groups[2],
		"2de middelbaar": groups && groups[2],
		"3de middelbaar": groups && groups[3],
		"4de middelbaar": groups && groups[3],
		"5de middelbaar": groups && groups[3],
		Ander: "Ander",
	};

	const handleTakChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedYear = e.currentTarget.value;
		const group = yearToGroupMap[selectedYear];
		if (group instanceof Group) {
			setTak(group);
		}
		setSelectedYear(selectedYear);
	};

    const validateTeaserForm = useCallback(() => {
        const temporaryInschrijvingObject = new Registration({});
        temporaryInschrijvingObject.firstName = name.split(" ")[0];
        temporaryInschrijvingObject.lastName = name.split(" ").slice(1).join(" ");
        temporaryInschrijvingObject.group = tak!;
        const errors = temporaryInschrijvingObject.validateTeaser();
        if (errors.length === 0) {
            setInschrijving(temporaryInschrijvingObject);
        } else {
            throw errors;
        }
    }, [name, tak, setInschrijving]);

	useEffect(() => {
		if (selectedYear !== "" && !inschrijving) {
		  try{
			validateTeaserForm();
			setErrorStates({ nameError: "", takError: "" });
		  } catch (errors: any) {
			console.log(errors)
			//errors.some((error: ErrorResponse) => error. === "voornaam") ? setErrorStates({ nameError: errors.find(error => error.field === "voornaam").message, takError: "" }) : setErrorStates({ nameError: "", takError: "" });
			//errors.some((error: ErrorResponse) => error.field === "tak") ? setErrorStates({ nameError: "", takError: errors.find(error => error.field === "tak").message }) : setErrorStates({ nameError: "", takError: "" });
		  }
		}
	  }, [selectedYear, inschrijving, validateTeaserForm]);

	return (
		<div className="teaser__wrapper">
			<form className="teaserForm form">
				<Label
					text="Vul hier de naam van uw kind in:"
					errorMessage={errorStates.nameError}
				>
					<Input
						type="text"
						name="name"
						value={
							inschrijving
								? `${inschrijving.firstName} ${inschrijving.lastName}`
								: name
						}
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder="Voornaam Achternaam"
						disabled={inschrijving}
					/>
				</Label>
				<Label
					text="In welk studiejaar zit uw kind?"
					errorMessage={errorStates.takError}
				>
					<select
						className="input"
						value={selectedYear}
						onChange={handleTakChange}
						name="tak"
					>
						<option value="" disabled>
							Selecteer een optie
						</option>
						<option value="1ste leerjaar">1ste leerjaar</option>
						<option value="2de leerjaar">2de leerjaar</option>
						<option value="3de leerjaar">3de leerjaar</option>
						<option value="4de leerjaar">4de leerjaar</option>
						<option value="5de leerjaar">5de leerjaar</option>
						<option value="6de leerjaar">6de leerjaar</option>
						<option value="1ste middelbaar">1ste middelbaar</option>
						<option value="2de middelbaar">2de middelbaar</option>
						<option value="3de middelbaar">3de middelbaar</option>
						<option value="4de middelbaar">4de middelbaar</option>
						<option value="5de middelbaar">5de middelbaar</option>
						<option value="Ander">Ander</option>
					</select>
				</Label>
			</form>
			<div className="takTeaser__container">
				{tak && (
					<div className="takTeaser__wrapper">
						{selectedYear === 'Ander' ? (
							<p className="cursive" onClick={() => setIsPopupActive(true)}>Klik hier om de leeftijdsgroep te kiezen</p>
						) : (
							<>
								<img src={`assets/takken/${tak.imageFileName}`} alt={`${tak.name} KSA Oosterzele tak`} className="tak-img" />
								<div>
									Uw kind hoort bij de tak
									<p className="assignedTak">{tak.name}</p>
								</div>
								<p className="wrongTak cursive" onClick={() => setIsPopupActive(true)}>Niet juist? Klik hier</p>
							</>
						)}
					</div>
				)}
				{isPopupActive && <ChooseTakPopup onClose={setIsPopupActive} setTak={(tak) => updateInschrijvingValue("tak", tak)}/>}
			</div>
		</div>
	);
};

export default Teaser;
