import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "@/components/NavBar";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Login() {
  const [email, setEmail] = useState("");
    const supabase=useSupabaseClient()
    const [loading,setLoading]=useState(false)
    const [alert,setALert]=useState(false);
  return (
    <>
      <NavBar />
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to approve or disapprove Events✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack
              spacing={4}
              as="form"
              onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)
                setALert(false)
                const { data, error } = await supabase.auth.signInWithOtp({
                  email: email,
                  options: {
                    emailRedirectTo: "https://locahost:3000",
                  },
                });
                setLoading(false)
                setALert(true)
              }}
            >
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </FormControl>

              <Stack spacing={10}>
                <Button
                    isLoading={loading}
                  bg={"blue.400"}
                  color={"white"}
                  type="submit"
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
                {alert && <Flex w={'full'} bg={'green.500'} textColor='white' justifyContent={'center'} borderRadius={'3px'} minH={'15px'}>Email Sent to your email</Flex>}
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
