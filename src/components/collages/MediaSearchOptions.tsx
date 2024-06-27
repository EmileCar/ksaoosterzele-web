import React, { useState } from "react";
import Label from "../form/Label";
import Input from "../form/Input";
import { useCollageContext } from "../../contexts/CollageContext";
import { Dropdown } from 'primereact/dropdown';
import CollageType from "../../types/CollageType";
import Form from "../form/Form";

const MediaSearchOptions = () => {
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const { searchValue, setSearchValue, sortedBy, setSortedBy, collageTypes, groupBy, setGroupBy } = useCollageContext();

    const sortOptions = [
        { label: 'Recentste eerst', value: 'recent' },
        { label: 'Oudste eerst', value: 'oldest' },
        { label: 'Naam', value: 'name' }
    ];

    return (
        <div className="media__search-options">
            <button className="button button-admin inherit-font" onClick={() => setShowSearchOptions(!showSearchOptions)}>
                {showSearchOptions ? (
                    <>
                        <span className="pi pi-angle-double-up"></span> Verberg zoekfilters
                    </>
                ) : (
                    <>
                        <span className="pi pi-angle-double-down"></span> Toon zoekfilters
                    </>
                )}
            </button>
            <Form>
            <form className={`form filter-media-form ${showSearchOptions ? "show" : ""}`}>
                <Label text="Zoeken">
                    <Input type="search" name={"search"} placeholder="Zoeken..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                </Label>
                <Label text="Sorteer op">
                    <select className="input" value={sortedBy} onChange={(e) => setSortedBy(e.target.value)}>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </Label>
                <Label text="Groepeer op">
                    <select className="input" value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
                        <option value="none">Geen</option>
                        {collageTypes && collageTypes.map((type: CollageType) => (
                            <option key={type.id} value={type.name}>{type.name}</option>
                        ))}
                    </select>
                </Label>
            </form>
            </Form>
        </div>
    );
}

export default MediaSearchOptions;