import { useState } from "react";
import './../styles/globals.css'
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { AppProps } from "next/app";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <ChakraProvider>

      <Component {...pageProps} />
      </ChakraProvider>
    </SessionContextProvider>
  );
}
export default MyApp;
