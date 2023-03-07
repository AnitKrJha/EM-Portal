import {
    Button, Flex
} from "@chakra-ui/react";
import Link from "next/link";

const NavBar = () => {
  return (
    <Flex className="h-24 bg-white items-center px-4 justify-between border-b">
      <Link href='/' className="font-bold text-3xl text-transparent bg-gradient-to-r from-red-400 to-blue-700 bg-clip-text ">
        Event
        Approval
      </Link>
      <Button>
      <Link href='/' >
       Back To Home
      </Link>
        </Button>  
      
    </Flex>
  );
};

export default NavBar;
