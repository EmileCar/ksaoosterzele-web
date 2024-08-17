import { useEffect, useRef, useState } from "react";
import "./Takken.css";
import { getGroups } from "../../services/groupService";
import Group from "../../types/Group";
import useFetch from "../../hooks/useFetch";
import FetchedDataLayout from "../../layouts/FetchedDataLayout";

const Takken = ({ setTak }: { setTak?: (tak: Group) => void }) => {
  const { pending, data: groups, error } = useFetch<Group[]>(getGroups);
  const [selectedTak, setSelectedTak] = useState<Group | null>(null);
  const takInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedTak && takInfoRef.current) {
      takInfoRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTak]);

  return (
    <div className="takken__container">
      <FetchedDataLayout isPending={pending} error={error}>
        <div>
          <div className="takken-list">
            {groups &&
              groups.map((group) => (
                <div
                  key={group.id}
                  className="takken-list_item"
                  onClick={() => {
                    setSelectedTak(group);
                    if (setTak) setTak(group);
                  }}
                >
                  <img
                    src={`assets/takken/${group.imageFileName}`}
                    alt={group.name}
                    loading="lazy"
                  />
                  <h3>{group.name}</h3>
                </div>
              ))}
          </div>
          <div ref={takInfoRef} />
        </div>
        <div className={`tak__info ${selectedTak ? "active" : ""}`}>
          {selectedTak && (
            <>
              <h4 className="tak__info-tile">{selectedTak.name}</h4>
              <p className="tak__info-ages">{selectedTak.ageRange}</p>
              <p>{selectedTak.description}</p>
            </>
          )}
        </div>
      </FetchedDataLayout>
    </div>
  );
};

export default Takken;
