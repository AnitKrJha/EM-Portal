import NavBar from "@/components/NavBar";
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle, Box,
    Button,
    Container,
    Flex,
    Heading, Image, List,
    ListItem,
    SimpleGrid,
    Stack,
    StackDivider, Text, VStack
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdAppRegistration } from "react-icons/md";

type Props = {};

const IndividualEvent = (props: Props) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [regCount, setRegCount] = useState<any>("0");
  const [currentEventData, setCurrentEventData] = useState<any>(null);
  const [isError, setIsError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { event } = router.query;

  const getAllEventsAndReload = async () => {
    const { data, error } = await supabase.from("socevent").select("*");

    console.log({ data, error });

    sessionStorage.setItem("allEvents", JSON.stringify(data));
    window.location.reload();
  };

  const getRegistrations = async (event: any) => {
    if (event) {
      const { data, error } = await supabase
        .from("event_registerations")
        .select("*")
        .eq("e_id", event);
      console.log({ data, error });
      sessionStorage.setItem(event, JSON.stringify(data?.length));
      setRegCount(data?.length);
    }
  };

  const changeStatusToTrue = async () => {
    setIsError(false);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("socevent")
      .update({ approved: true })
      .eq("event_id", event);

    if (error) {
      setIsError(true);
    }
    setIsLoading(false);
    getAllEventsAndReload();
  };

  const changeStatusToFalse = async () => {
    setIsError(false);
    setIsLoading(true);
    const { data, error } = await supabase
      .from("socevent")
      .update({ approved: false })
      .eq("event_id", event);

    if (error) {
      setIsError(true);
    }
    setIsLoading(false);
    getAllEventsAndReload();
  };


  const getCurrentEvent = () => {
    let data = JSON.parse(sessionStorage.getItem("allEvents") || "[]");
    setCurrentEventData(data.filter((e: any) => e.event_id === event).at(0));
  };

  useEffect(() => {
    if (!sessionStorage.getItem(typeof event==='string'? event:'')) {
      getRegistrations(event);
    } else {
      setRegCount(sessionStorage.getItem(typeof event==='string'? event:''));
    }

    getCurrentEvent();
  }, []);

  return (
    <>
    <NavBar/>
      {!currentEventData && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Nothing Is Visible?
          </AlertTitle>
          <AlertDescription maxWidth="sm">
            <Button
              onClick={getCurrentEvent}
              variant="none"
              className="bg-red-500 text-white hover:opacity-75"
            >
              Click This
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {currentEventData && (
        <Container maxW={"4xl"}>
          <SimpleGrid
            columns={{ base: 1 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={currentEventData.poster}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {currentEventData.event_name}
                </Heading>
                <Text
                  fontWeight={300}
                  fontSize={"2xl"}
                  className="flex items-center gap-3"
                >
                  <span>
                    <MdAppRegistration />
                  </span>{" "}
                  {regCount} registrations
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {currentEventData.tagline}
                  </Text>
                  <Text fontSize={"lg"}>{currentEventData.desc}</Text>
                </VStack>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Rules
                  </Text>

                  <SimpleGrid columns={{ base: 1 }} spacing={10}>
                    <List spacing={2}>
                      {currentEventData.rules.map((e: any, i: any) => (
                        <ListItem key={i}>{e}</ListItem>
                      ))}
                    </List>
                  </SimpleGrid>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Extra Information
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Instagram:
                      </Text>{" "}
                      {currentEventData.instagram}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Team Size:
                      </Text>{" "}
                      {currentEventData.team_size}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Venue:
                      </Text>{" "}
                      {currentEventData.venue}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Date:
                      </Text>{" "}
                      {currentEventData.date}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Time:
                      </Text>{" "}
                      {currentEventData.time}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Prize Pool:
                      </Text>{" "}
                      {currentEventData.prize_pool}
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              <Button
                rounded={"none"}
                isLoading={isLoading}
                w={"full"}
                mt={8}
                size={"lg"}
                py={"7"}
                bg={currentEventData.approved ? "green.500" : "red.500"}
                textTransform={"uppercase"}
                _hover={{
                  transform: "translateY(2px)",
                  boxShadow: "lg",
                }}
                onClick={
                  currentEventData.approved
                    ? changeStatusToFalse
                    : changeStatusToTrue
                }
              >
                {currentEventData.approved
                  ? "Reject This Event"
                  : "Approve This Event"}
              </Button>
            </Stack>
            {isError && (
              <Text className="text-white text-center w-full bg-red-500 font-bold">
                {" "}
                There Has been an Error
              </Text>
            )}
          </SimpleGrid>
        </Container>
      )}
    </>
  );
};

export default IndividualEvent;
