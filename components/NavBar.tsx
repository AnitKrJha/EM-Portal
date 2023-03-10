import { Button, Flex } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";

const NavBar = () => {
  const user = useUser();
  const supabase = useSupabaseClient();
  return (
    <Flex className="h-24 bg-white items-center px-4 justify-between border-b">
      <Link
        href="/"
        className="font-bold text-3xl text-transparent bg-gradient-to-r from-red-400 to-blue-700 bg-clip-text "
      >
        Event Approval
      </Link>
      {user ? (
        <Button
          onClick={async (e) => {
            sessionStorage.clear()
            const { error } = await supabase.auth.signOut();
          }}
        >
          Logout
        </Button>
      ):<Link href={'/login'}><Button>Login</Button></Link>}
    </Flex>
  );
};

export default NavBar;
