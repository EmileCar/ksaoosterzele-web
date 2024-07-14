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
import Button from "../components/button/Button";
import { formatDate } from "../utils/datetimeUtil";

const CollageContext = createContext<any>(null);

export const CollageProvider = ({
	isAdmin = false,
	children,
}: {
	isAdmin?: boolean;
	children: React.ReactNode;
}) => {
	const [collages, setCollages] = useState<Collage[] | null>(null);
	const [groupedCollages, setGroupedCollages] = useState<{ [key: string]: Collage[] }>({});
	const [searchValue, setSearchValue] = useState("");
	const [sortedBy, setSortedBy] = useState("recent");
	const [groupBy, setGroupBy] = useState("none");
	const [globalError, setGlobalError] = useState<string | null>(null);
    const [showSearchOptions, setShowSearchOptions] = useState(false);

	const fetchCollages = useCallback(() => getCollages(isAdmin), [isAdmin]);
	const {
		pending,
		error,
		data: fetchedCollages,
		refetch,
	} = useFetch<Collage[]>(fetchCollages);

	const {
		pending: collageTypesPending,
		error: collageTypesError,
		data: collageTypes,
	} = useFetch<CollageType[]>(getCollageTypes);

	const filterAndGroupCollages = useCallback(
		(collages: Collage[]): { [key: string]: Collage[] } => {
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
			} else if (sortedBy === "name_desc") {
				filteredCollages = filteredCollages.sort((a, b) =>
					b.name.localeCompare(a.name)
				);
			}

			let grouped: { [key: string]: Collage[] } = {};

			if (groupBy === "date") {
				filteredCollages.forEach((collage) => {
					const dateKey = formatDate(collage.date);
					if (!grouped[dateKey]) {
						grouped[dateKey] = [];
					}
					grouped[dateKey].push(collage);
				});
			} else if (groupBy === "type") {
				filteredCollages.forEach((collage: Collage) => {
					if (collage.types.length === 0) {
						if (!grouped["zonder type"]) {
							grouped["zonder type"] = [];
						}
						grouped["zonder type"].push(collage);
					} else {
						collage.types.forEach((type: CollageType) => {
							if (!grouped[type.name]) {
								grouped[type.name] = [];
							}
							grouped[type.name].push(collage);
						});
					}
				});
			} else {
				grouped = { "": filteredCollages };
			}

			return grouped;
		},
		[searchValue, sortedBy, groupBy]
	);


    useEffect(() => {
        if (error) {
            setGlobalError(error);
        }
        if (fetchedCollages && fetchedCollages.length > 0) {
            const grouped = filterAndGroupCollages(fetchedCollages);
            setGroupedCollages(grouped);
        } else {
			setGroupedCollages({});
		}
    }, [fetchedCollages, error, filterAndGroupCollages]);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (fetchedCollages && fetchedCollages.length > 0) {
                const grouped = filterAndGroupCollages(fetchedCollages);
                setGroupedCollages(grouped);
            }
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchValue, sortedBy, groupBy]);

	const ToggleMediaSearchButton = () => {
		return (
			fetchedCollages && fetchedCollages.length > 0 && (
				<Button
					text=" Zoekopties"
					onClick={() => setShowSearchOptions(!showSearchOptions)}
					icon={showSearchOptions ? "pi pi-angle-double-up" : "pi pi-angle-double-down"}
					hover
				/>
			)
		);
	}

	return (
		<CollageContext.Provider
			value={{
				fetchedCollages,
				collages,
				groupedCollages,
				pending,
				error,
				setSearchValue,
				searchValue,
				sortedBy,
				setSortedBy,
				groupBy,
				setGroupBy,
				collageTypes,
				showSearchOptions,
				setShowSearchOptions,
				refetch,
				isAdmin,
				ToggleMediaSearchButton,
			}}
		>
			{children}
		</CollageContext.Provider>
	);
};

export const useCollageContext = () => useContext(CollageContext);
