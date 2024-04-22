"use client";

import React, { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { CustomUserType } from "../types/user";
import { SessionProvider } from "next-auth/react";

interface ClientProps {
  data: { user: CustomUserType };
  children: React.ReactNode;
}

const Client = ({ data, children }: ClientProps) => {
  const { setInformation } = useUser();
  useEffect(() => {
    if (data.user?.email) {
      setInformation(data.user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.user]);

  return <SessionProvider>{children}</SessionProvider>;
};

export default Client;
