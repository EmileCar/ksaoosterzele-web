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
                setTak(group);
              }}
            >
              <img src={`assets/takken/${group.imageFileName}`} alt={group.name} loading="lazy" />
              <span>Jongknapen</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Takken;
