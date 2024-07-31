
import React from "react";
import { Flex, Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  fetchCharacters,
  fetchCharacterEpisodes,
  Character,
} from "@/services/characterService";
import Navigation from "@/components/Navigation";
import Banner from "@/components/Banner";
import List from "@/components/List";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import LocationFilter from "@/components/LocationFilter";

interface HomeProps {
  searchParams: { status?: string; location?: string; page?: number };
}

const Home = async ({ searchParams }: HomeProps) => {
  const { status, location, page = 1 } = searchParams;

  let characters: Character[] = [];
  let totalPages = 1;
  let count = 1;

  try {
    const data = await fetchCharacters({ searchParams });

    characters = await Promise.all(data.results.map(fetchCharacterEpisodes));
    totalPages = data.info.pages;

    count = data.info.count;
  } catch (error) {
    console.error("Error fetching characters:", error);
  }

  return (
    <Layout>
      <Header className="bg-white items-center flex flex-col justify-center h-auto pt-5">
        <Navigation />
        <Banner />
      </Header>
      <Content className="bg-[#272B33] !h-full py-10 md:px-24 px-5">
        <Flex justify="space-between" className="gap-3">
          <StatusFilter currentStatus={searchParams.status ?? ""} />
          <LocationFilter currentLocation={location ?? ""} />
        </Flex>
        <List characters={characters} />
        <Pagination currentPage={page} totalPages={totalPages} />
      </Content>
      <Footer className="bg-gray-800 py-20">
        <Flex gap={20} justify="center" wrap align="center">
          <p className="text-lg text-gray-500">Characters: {count}</p>
          <p className="text-lg text-gray-500">Locations: {126}</p>
          <p className="text-lg text-gray-500">Episodes: {51}</p>
          <p className="text-lg text-gray-500 w-full text-center">
            Server Status : Active
          </p>
        </Flex>
        <p className="text-white text-center py-10">❮❯ by Axel Fuhrmann 2024</p>
      </Footer>
    </Layout>
  );
};

export default Home;
