import Image from "next/image";
import Link from "next/link";

//chakra ui imports
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

//custom imports
import defaultimage from "../asset/property-placeholder.jpg";

//react icon imports
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";
const Property = ({
  property: {
    src,
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
  },
}) => {
  return (
      
    <Link href={`/property/${externalID}`} passHref>
        
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
      >
          {/* {console.log(rentFrequency)} */}
        <Box>
          <Image
            src={coverPhoto ? coverPhoto.url : defaultimage}
            width={500}
            height={300}
            alt="house image"
          />
        </Box>
        <Box w='full'>
        <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
            <Text fontWeight='bold' fontSize='lg'>AED {price}{rentFrequency && `/${rentFrequency}`}</Text>
          </Flex>
          <Box>
            <Avatar width="30%" size='sm' src={agency?.logo?.url}></Avatar>
          </Box>
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {rooms}
          <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
        <Text fontSize='lg'>
          {title.length > 30 ? title.substring(0, 30) + '...' : title}
        </Text>
      </Box>
      </Flex>
    </Link>
  );
};
export default Property;
