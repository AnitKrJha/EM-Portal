import EventCard from "@/components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";
import LoginPrompt from "@/components/LoginPrompt";
import NavBar from "@/components/NavBar";
import GetnewEvents from "@/components/GetnewEvents";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const user = useUser();
  const session=useSession()
  const supabase = useSupabaseClient();

  const [allEvents, setAllEvents] = useState<any>([]);
  const [isLoading,setIsLoading]=useState(false)

  const getAllEvents = async () => {
    setIsLoading(true)
    const { data, error } = await supabase.from("socevent").select("*");

    console.log({ data, error });

    sessionStorage.setItem("allEvents", JSON.stringify(data));
    setAllEvents(data);
    setIsLoading(false)
  };

  useEffect(() => {
    console.log(session);
    
    if (true) {
      const allEventData = JSON.parse(
        sessionStorage.getItem("allEvents") || '{"empty":true}'
      );
      console.log({ allEventData });

      if (allEventData.empty === true) {
        getAllEvents();
      } else {
        setAllEvents(allEventData);
      }
    }
  }, []);

  if (!session) {
    return (
      <>
        {/* <pre className="text-red-500">{JSON.stringify(allEvents, null, 4)}</pre> */}
        <NavBar />
        <LoginPrompt />
      </>
    );
  } else
    return (
      <>
        {/* <pre className="text-red-500">{JSON.stringify(allEvents, null, 4)}</pre> */}
        <NavBar />
        <GetnewEvents getEvent={getAllEvents} isLoading={isLoading}/>
        <Heading textAlign={"center"} py="20px">
          All Events
        </Heading>
        <SimpleGrid
          _loading={{opacity:0.5}}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          spacing={3}
        >
          {allEvents.map((event: any, idx: any) => (
            <EventCard
              id={event.event_id}
              name={event.event_name}
              approved={event.approved}
              key={idx}
              poster={event.poster}
              desc={event.desc}
            />
          ))}
        </SimpleGrid>
      </>
    );
}
