import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilter from "../components/SearchFilter";
import Property from "../components/Propety";
import { baseUrl, fetchApi } from "../utils/fetchApi";

import noresult from "../asset/noresult.svg";

const Search = ({ properties }) => {
  const [searchFilter, setSearchFilters] = useState(false);
  const router = useRouter();
  return (
    <Box>
      <Flex
        onClick={() => setSearchFilters(!searchFilter)}
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
      >
        <Text>Search Property By Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {/* {searchFilter && <SearchFilter />} */}
      {searchFilter ? <SearchFilter /> : null}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDir="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noresult} alt="Waiting to search for houses here!"/>
          <Text fontSize="xl" marginTop="3">
            Waiting to search!
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const rentFrequency = query.rentFrequency || "yearly";
  const minPrice = query.minPrice || "0";
  const maxPrice = query.maxPrice || "1000000";
  const roomsMin = query.roomsMin || "0";
  const bathsMin = query.bathsMin || "0";
  const sort = query.sort || "price-desc";
  const areaMax = query.areaMax || "35000";
  const locationExternalIDs = query.locationExternalIDs || "5002";
  const categoryExternalID = query.categoryExternalID || "4";

  const data = await fetchApi(
    `${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`
  );

  return {
    props: {
      properties: data?.hits,
    },
  };
}
