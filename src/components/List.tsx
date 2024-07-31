import { Character } from "@/services/characterService";
import React from "react";
import ListItem from "./ListItem";

interface IList {
  characters: Character[];
}

const List: React.FC<IList> = ({ characters }) => {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {characters.map((character, key) => (
        <ListItem character={character} key={key} />
      ))}
    </div>
  );
};

export default List;
