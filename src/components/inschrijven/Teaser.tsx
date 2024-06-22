import { useState, useEffect, useCallback } from "react";
import Group from "../../types/Group";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import useFetch from "../../hooks/useFetch";
import { getGroups } from "../../services/groupService";
import Registration from "../../types/Registration";
import ChooseTakPopup from "./popups/ChooseTakPopup";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";

/**
 * De teaser is een component om de gebruiker een simpel startform te geven voor hun inschrijving.
 * Hier kunnen ze hun naam en studiejaar invullen, het studiejaar wordt dan gemapt naar een tak.
 */
const Teaser = () => {
	const [name, setName] = useState<string>("");
	const [selectedYear, setSelectedYear] = useState<string>("");

	const [tak, setTak] = useState<Group | null>(null);
	const [isPopupActive, setIsPopupActive] = useState(false);
	const { pending, data: groups, error } = useFetch<Group[]>(getGroups);
	const { inschrijving, setInschrijving, errorStates, updateRegistrationValue } = useRegistrationContext();

	const yearToGroupMap: { [key: string]: Group | string | null } = {
		"1l": groups && groups[0],
		"2l": groups && groups[0],
		"3l": groups && groups[0],
		"4l": groups && groups[1],
		"5l": groups && groups[1],
		"6l": groups && groups[2],
		"1m": groups && groups[2],
		"2m": groups && groups[2],
		"3m": groups && groups[3],
		"4m": groups && groups[3],
		"5m": groups && groups[3],
		"other": "other",
	};

	const handleSelectedYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedYearValue = e.currentTarget.value;
		if(selectedYearValue === "other") {
			setTak(null);
		} else {
			const group = yearToGroupMap[selectedYearValue] as Group;
			if (group) {
				updateTak(group);
			}
		}
		setSelectedYear(selectedYearValue);
	};

	useEffect(() => {
		if (inschrijving || selectedYear === "") return;

		if (selectedYear === "other" && !tak) return;

		const registration = new Registration({});
		registration.groupId = selectedYear === "other" ? tak?.id! : (yearToGroupMap[selectedYear] as Group).id!;

		const [firstName, ...lastNameParts] = name.split(" ");
		registration.firstName = firstName;
		registration.lastName = lastNameParts.join(" ");

		setInschrijving(registration);
	}, [tak, selectedYear, inschrijving, groups, name]);

	const updateTak = (tak: Group) => {
		if (tak) {
			if (inschrijving) {
				updateRegistrationValue("groupId", tak.id);
			}
			setTak(tak);
		}
	};

	return (
		<div className="teaser__wrapper">
			<form className="teaserForm form">
				<Label text="Vul hier de naam van uw kind in:">
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
						disabled={inschrijving !== null}
					/>
				</Label>
				<Label text="In welk studiejaar zit uw kind?" errorMessage={errorStates.groupError}>
					<select
						className="input"
						value={selectedYear}
						onChange={handleSelectedYearChange}
						name="tak"
					>
						<option value="" disabled>
							Selecteer een optie
						</option>
						<option value="1l">1ste leerjaar</option>
						<option value="2l">2de leerjaar</option>
						<option value="3l">3de leerjaar</option>
						<option value="4l">4de leerjaar</option>
						<option value="5l">5de leerjaar</option>
						<option value="6l">6de leerjaar</option>
						<option value="1m">1ste middelbaar</option>
						<option value="2m">2de middelbaar</option>
						<option value="3m">3de middelbaar</option>
						<option value="4m">4de middelbaar</option>
						<option value="5m">5de middelbaar</option>
						<option value="other">Ander</option>
					</select>
				</Label>
			</form>
			<div className="takTeaser__container">
				{selectedYear &&
					<div className="takTeaser__wrapper">
						{(selectedYear === 'other' && !tak) ?
							<p className="cursive" onClick={() => setIsPopupActive(true)}>Klik hier om de leeftijdsgroep te kiezen</p>
						:
							<FetchedDataLayout isPending={pending} error={error}>
								<img src={`assets/takken/${tak && tak.imageFileName}`} alt={`${tak && tak.name} KSA Oosterzele tak`} className="tak-img" />
								<div>
									Uw kind hoort bij de tak
									<p className="assignedTak">{tak && tak.name}</p>
								</div>
								<p className="wrongTak cursive" onClick={() => setIsPopupActive(true)}>Niet juist? Klik hier</p>
							</FetchedDataLayout>
						}
					</div>
				}
				{isPopupActive && <ChooseTakPopup onClose={setIsPopupActive} setTak={(tak) => updateTak(tak)} />}
			</div>
		</div>
	);
};

export default Teaser;