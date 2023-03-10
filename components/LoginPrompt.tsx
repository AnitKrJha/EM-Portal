import { Button, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type Props = {};

const LoginPrompt = (props: Props) => {
  return (
    <Flex
      minH={"100vh"}
      minW="100vw"
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex flexDir={"column"}>
        <Heading>Login First</Heading>
        <Link href={"/login"}>
          <Button>Login</Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginPrompt;
