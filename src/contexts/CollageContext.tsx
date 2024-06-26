import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { getCollageTypes, getCollages } from "../services/mediaService";
import Collage from "../types/Collage";
import useFetch from "../hooks/useFetch";
import CollageType from "../types/CollageType";

const CollageContext = createContext<any>(null);

export const CollageProvider = ({
	isAdmin = false,
	children,
}: {
	isAdmin?: boolean;
	children: React.ReactNode;
}) => {
	const [collages, setCollages] = useState<Collage[] | null>(null);
	const [searchValue, setSearchValue] = useState("");
	const [sortedBy, setSortedBy] = useState("recent");
	const [groupBy, setGroupBy] = useState("none");
	const [globalError, setGlobalError] = useState<string | null>(null);

	const fetchCollages = useCallback(() => getCollages(isAdmin), [isAdmin]);
	const {
		pending,
		error,
		data: fetchedCollages,
	} = useFetch<Collage[]>(fetchCollages);

	const {
		pending: collageTypesPending,
		error: collageTypesError,
		data: collageTypes,
	} = useFetch<CollageType[]>(getCollageTypes);

	const filterCollages = useCallback(
		(collages: Collage[]): Collage[] => {
			let filteredCollages: Collage[] = collages.filter((collage) =>
				collage.name
					.toLowerCase()
					.trim()
					.includes(searchValue.toLowerCase().trim())
			);

			if (sortedBy === "recent") {
				filteredCollages = filteredCollages.sort(
					(a: Collage, b: Collage) => b.date.getTime() - a.date.getTime()
				);
			} else if (sortedBy === "oldest") {
				filteredCollages = filteredCollages.sort(
					(a, b) => a.date.getTime() - b.date.getTime()
				);
			} else if (sortedBy === "name") {
				filteredCollages = filteredCollages.sort((a, b) =>
					a.name.localeCompare(b.name)
				);
			}

			if (groupBy === "date") {
				let groupedByDate: { [key: string]: Collage[] } = {};

				filteredCollages.forEach((collage) => {
					const dateKey = collage.date.toISOString().split("T")[0];
					if (!groupedByDate[dateKey]) {
						groupedByDate[dateKey] = [];
					}
					groupedByDate[dateKey].push(collage);
				});

				filteredCollages = Object.values(groupedByDate).flatMap(
					(collages) => collages
				);
			} else if (groupBy === "type") {
				let groupedByDate: { [key: string]: Collage[] } = {};

				filteredCollages.forEach((collage) => {
					// collage.types is an array of CollageType objects
					collage.types.forEach((type) => {
						if (!groupedByDate[type.name]) {
							groupedByDate[type.name] = [];
						}
						groupedByDate[type.name].push(collage);
					});
				});

				filteredCollages = Object.values(groupedByDate).flatMap(
					(collages) => collages
				);
			}

			return filteredCollages;
		},
		[searchValue, sortedBy, groupBy]
	);

	useEffect(() => {
		if (error) {
			setGlobalError(error);
		}
		if (fetchedCollages && fetchedCollages.length > 0) {
			const filteredCollages = filterCollages(fetchedCollages);
			setCollages(filteredCollages);
		}
	}, [fetchedCollages, error, filterCollages]);

	useEffect(() => {
		const handler = setTimeout(() => {
			if (fetchedCollages && fetchedCollages.length > 0) {
				const filtered = filterCollages(fetchedCollages);
				setCollages(filtered);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [searchValue, sortedBy, groupBy]);

	return (
		<CollageContext.Provider
			value={{
				fetchedCollages,
				collages,
				pending,
				error,
				setSearchValue,
				searchValue,
				sortedBy,
				setSortedBy,
				groupBy,
				setGroupBy,
				collageTypes,
			}}
		>
			{children}
		</CollageContext.Provider>
	);
};

export const useCollageContext = () => useContext(CollageContext);
