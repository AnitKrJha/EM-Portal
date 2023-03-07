import EventCard from "@/components/EventCard/EventCard";
import { useEffect, useState } from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Inter } from "next/font/google";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const supabase = useSupabaseClient();

  const [allEvents, setAllEvents] = useState<any>([]);

  const getAllEvents = async () => {
    const { data, error } = await supabase.from("socevent").select("*");

    console.log({ data, error });

    sessionStorage.setItem("allEvents", JSON.stringify(data));
    setAllEvents(data);
  };

  useEffect(() => {
    const allEventData = JSON.parse(
      sessionStorage.getItem("allEvents") || '{"empty":true}'
    );
    console.log({ allEventData });

    if (allEventData.empty === true) {
      getAllEvents();
    } else {
      setAllEvents(allEventData);
    }
  }, []);

  return (
    <>
      {/* <pre className="text-red-500">{JSON.stringify(allEvents, null, 4)}</pre> */}
      <NavBar/>
      <Heading textAlign={"center"} py='20px'>All Events</Heading>
      <SimpleGrid
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
