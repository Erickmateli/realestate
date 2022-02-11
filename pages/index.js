import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

//custom imports
import Property from "../components/Propety"; 

//chakra imports
import { Flex, Box, Text, Button } from "@chakra-ui/react";

//utils imports from API

import { baseUrl, fetchApi } from "../utils/fetchApi";

const Banner = ({
  purpose,
  imageUrl,
  title1,
  title2,
  desc1,
  desc2,
  linkName,
  ButtonText,
}) => {
  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
      <Image src={imageUrl} width={500} height={300} alt="banner image" />
      <Box p="5">
        <Text color="gray.500" fontSize="sm" fontWeight="medium">
          {purpose}
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          {title1}
          <br />
          {title2}
        </Text>
        <Text
          fontSize="lg"
          paddingTop="3"
          paddingBottom="3"
          fontWeight="medium"
          color="gray.500"
        >
          {desc1} <br />
          {desc2}
        </Text>
        <Button fontSize="xl">
          <Link href={linkName}>{ButtonText}</Link>
        </Button>
      </Box>
    </Flex>
  );
};

const Home = ({ properytForSale, propertyForRent }) => (

  <Box>
  <Banner
    purpose="RENT A HOME"
    title1="Rental Homes for"
    title2="Everyone"
    desc1="Explore Apartments, Villas,Homes"
    desc2="and more"
    ButtonText="Explore Renting"
    linkName="/Search?purpose=for-rent"
    imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
  />
  <Flex flexWrap="wrap" >
    {/** Fetch the rentals properties and map over them **/}

    {propertyForRent.map((property) => <Property property={property} key={property.id} />)}

  </Flex>
  <Banner
    purpose="BUY A HOME"
    title1=" Find, Buy and Own Your"
    title2="Dream Home"
    desc1=" Explore from Apartments, land, builder floors,"
    desc2=" villas and more"
    ButtonText="Explore Buying"
    linkName="/Search?purpose=for-sale"
    imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
  />
   <Flex flexWrap="wrap"> 
    {/** Fetch the buy properties and map over them **/}
    {properytForSale.map((property)=> <Property property={property} key={property.id}/>)}
  </Flex>
</Box>

)

export default Home;

export async function getStaticProps(){
  const properytForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);
  return {
    props:{
      properytForSale : properytForSale?.hits,
      propertyForRent : propertyForRent?.hits
    }
  }
}
