import React, { useCallback, useState } from "react";
import LeeuwkesTak from "../../assets/img/takken/leeuwkes.jpg";
import JongKnapenTak from "../../assets/img/takken/jongknapen.jpg";
import Knapen from "../../assets/img/takken/knapen.jpg";
import JongHernieuwers from "../../assets/img/takken/jonghernieuwers.jpg";
import "./Takken.css";
import { getGroups } from "../../services/groupService";
import Group from "../../types/Group";
import useFetch from "../../hooks/useFetch";

const Takken = ({ setTak }: { setTak?: any }) => {
  const { pending, data: groups, error } = useFetch<Group[]>(getGroups);
  const [selectedTak, setSelectedTak] = useState<Group | null>(null);

  return (
    <div className="takken__container">
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
      <div className={`tak__info ${selectedTak ? "active" : ""}`}>
        {selectedTak && (
          <>
            <p className="tak__info-tile">{selectedTak.name}</p>
            <p className="tak__info-ages">{selectedTak.ageRange}</p>
            <p>{selectedTak.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Takken;
