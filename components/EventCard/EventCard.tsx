import {
  Card,
  CardBody,
  Stack,
  Heading,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {
    poster:string,
    desc:string,
    name:string,
    approved:boolean,
    id:string

};

const EventCard = (props: Props) => {

    const {poster,desc,approved,name,id}=props
  return (
    <Card maxW="sm">
      <CardBody >
        <Image
        
          src={poster}
          borderRadius="lg"
          
        />
        <Stack mt="6" spacing="3">
          <Heading size="md" >{name}</Heading>
          <Text noOfLines={3}>
           {desc}
          </Text>
          
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button   className={`${approved?'bg-green-500':'bg-red-500'}  text-white pointer-events-none`} variant='none' >
            {approved?'Approved':'Rejected'}
          </Button>
          <Link href={`/${id}`}>
            <Button variant="ghost" colorScheme="blue">
              View Details
            </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
