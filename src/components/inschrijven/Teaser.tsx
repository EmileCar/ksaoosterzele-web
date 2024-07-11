import { useState, useEffect, useCallback } from "react";
import Group from "../../types/Group";
import Label from "../form/Label";
import Input from "../form/Input";
import { useRegistrationContext } from "../../contexts/RegistrationContext";
import useFetch from "../../hooks/useFetch";
import { getGroups } from "../../services/groupService";
import ChooseTakPopup from "./popups/ChooseTakPopup";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";
import Form from "../form/Form";
import { usePopupContext } from "../../contexts/PopupContext";

/**
 * De teaser is een component om de gebruiker een simpel startform te geven voor hun inschrijving.
 * Hier kunnen ze hun naam en studiejaar invullen, het studiejaar wordt dan gemapt naar een tak.
 */
const Teaser = () => {
	const [name, setName] = useState<string>("");
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [tak, setTak] = useState<Group | null>(null);
	const { pending, data: groups, error } = useFetch<Group[]>(getGroups);
	const { values, changeValue, errorStates } = useRegistrationContext();
	const { registerPopup } = usePopupContext();

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
		if (!values.notEmpty() || selectedYear === "") return;

		if (selectedYear === "other" && !tak) return;

		const [firstName, ...lastNameParts] = name.split(" ");

		changeValue("groupId", (selectedYear === "other" ? tak?.id! : (yearToGroupMap[selectedYear] as Group).id!).toString());
		changeValue("firstName", firstName);
		changeValue("lastName", lastNameParts.join(" "));
		changeValue("gender", "M");
	}, [tak, selectedYear, name]);

	const updateTak = (tak: Group) => {
		if (tak) {
			if (values) {
				changeValue("groupId", tak.id!.toString());
			}
			setTak(tak);
		}
	};

	const openChooseTakPopup = () => {
		registerPopup(<ChooseTakPopup setTak={(tak) => updateTak(tak)} />);
	}

	return (
		<div className="teaser__wrapper">
			<Form customClassName="teaserForm">
				<Label text="Vul hier de naam van uw kind in:">
					<Input
						type="text"
						name="name"
						value={
							values.notEmpty()
								? `${values.firstName} ${values.lastName}`
								: name
						}
						onChange={(e) => setName(e.currentTarget.value)}
						placeholder="Voornaam Achternaam"
						disabled={values.notEmpty()}
					/>
				</Label>
				<Label text="In welk studiejaar zit uw kind?" errorMessage={errorStates.groupError}>
					<select
						className="input inherit-font"
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
			</Form>
			<div className="takTeaser__container">
				{selectedYear &&
					<div className="takTeaser__wrapper">
						{(selectedYear === 'other' && !tak) ?
							<p className="cursive" onClick={openChooseTakPopup}>Klik hier om de leeftijdsgroep te kiezen</p>
						:
							<FetchedDataLayout isPending={pending} error={error}>
								<img src={`assets/takken/${tak && tak.imageFileName}`} alt={`${tak && tak.name} KSA Oosterzele tak`} className="tak-img" />
								<div>
									Uw kind hoort bij de tak
									<p className="assignedTak">{tak && tak.name}</p>
								</div>
								<p className="wrongTak cursive" onClick={openChooseTakPopup}>Niet juist? Klik hier</p>
							</FetchedDataLayout>
						}
					</div>
				}
			</div>
		</div>
	);
};

export default Teaser;