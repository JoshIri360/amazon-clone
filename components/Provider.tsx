import { SessionProvider } from "next-auth/react";
import React from "react";

type ProviderProps = {
  session?: any;
  children: React.ReactNode;
};

const Provider = ({ session, children }: ProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
