import "./GroupedList.css";

interface GroupedListProps {
    groupedItems: { [key: string]: any[] };
    renderItem: (item: any) => React.ReactNode;
    emptyMessage?: string;
}

const GroupedList: React.FC<GroupedListProps> = ({ groupedItems, renderItem, emptyMessage }) => {
    return (
        <div className="grouped-list">
            {groupedItems && Object.keys(groupedItems).map((key) => (
                <div key={key} className="grouped-list__group">
                    <h3>{key}</h3>
                    <div className="grouped-list__group--items">
                        {groupedItems[key].length === 0 ? (
                            <p>{emptyMessage || "Geen gegevens"}</p>
                        ) : (
                            groupedItems[key].map((item: any) => renderItem(item))
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupedList;