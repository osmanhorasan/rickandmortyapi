import { Character } from "@/services/characterService";
import { Flex } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IListItem {
  character: Character;
}

const ListItem: React.FC<IListItem> = ({ character }) => {
  return (
    <Flex className="bg-[#3C3E44]  rounded-md gap-3 overflow-hidden">
      <Image
        src={character.image}
        alt={character.name}
        width={229}
        height={220}
        className=" max-w-[229px] max-h-[220px] w-full h-full"
      />
      <Flex vertical className="gap-3 py-2">
        <p className="text-2xl text-white">{character.name}</p>
        <p className="text-base  text-white">
          <span className="text-base">{character.status}</span>
          <span> - </span>
          <span className="text-base">{character.species}</span>
        </p>
        <p className="flex flex-col">
          <span className="text-base text-gray-400">Last know location:</span>
          <Link className="text-lg text-white" href={character.location.url}>
            {character.location.name}
          </Link>
        </p>
        {character.episodes?.length ? (
          <p className="flex flex-col">
            <span className="text-base text-gray-400">First seen in :</span>
            <Link
              className="text-lg text-white"
              href={character.episodes[0].url}
            >
              {character.episodes[0].name}
            </Link>
          </p>
        ) : (
          <></>
        )}
      </Flex>
    </Flex>
  );
};

export default ListItem;
